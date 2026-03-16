import Link from "next/link";
import { db } from "@/db";
import { appointments, funnelEvents } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { CalendarDays, Clock, CheckCircle, TrendingDown, Users, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getStats() {
  const [
    totalResult,
    byStatus,
    byService,
    recentAppointments,
    funnelStats,
  ] = await Promise.all([
    // Total appointments
    db.select({ count: sql<number>`count(*)::int` }).from(appointments),

    // Appointments grouped by status
    db
      .select({ status: appointments.status, count: sql<number>`count(*)::int` })
      .from(appointments)
      .groupBy(appointments.status),

    // Appointments grouped by service (top 6)
    db
      .select({ service: appointments.service, count: sql<number>`count(*)::int` })
      .from(appointments)
      .groupBy(appointments.service)
      .orderBy(desc(sql`count(*)`))
      .limit(6),

    // 10 most recent appointments
    db
      .select()
      .from(appointments)
      .orderBy(desc(appointments.createdAt))
      .limit(10),

    // Funnel drop-off stats
    db
      .select({ step: funnelEvents.step, event: funnelEvents.event, count: sql<number>`count(distinct session_id)::int` })
      .from(funnelEvents)
      .groupBy(funnelEvents.step, funnelEvents.event),
  ]);

  const total = totalResult[0]?.count ?? 0;

  const statusMap = Object.fromEntries(byStatus.map(r => [r.status, r.count]));

  const funnel = {
    step1Views:       funnelStats.find(r => r.step === 1 && r.event === "viewed")?.count    ?? 0,
    step1Completions: funnelStats.find(r => r.step === 1 && r.event === "completed")?.count ?? 0,
    step2Completions: funnelStats.find(r => r.step === 2 && r.event === "completed")?.count ?? 0,
  };

  return { total, statusMap, byService, recentAppointments, funnel };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AdminPage() {
  const { total, statusMap, byService, recentAppointments, funnel } = await getStats();

  const step1DropOff = funnel.step1Views > 0
    ? Math.round((1 - funnel.step1Completions / funnel.step1Views) * 100)
    : 0;
  const step2DropOff = funnel.step1Completions > 0
    ? Math.round((1 - funnel.step2Completions / funnel.step1Completions) * 100)
    : 0;
  const overallConversion = funnel.step1Views > 0
    ? Math.round((funnel.step2Completions / funnel.step1Views) * 100)
    : 0;

  return (
    <div className="space-y-10">

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1 text-sm">Appointment submissions and booking funnel overview.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<CalendarDays className="w-5 h-5" />}
          label="Total Appointments"
          value={total}
          color="blue"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Pending"
          value={statusMap["pending"] ?? 0}
          color="amber"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Confirmed"
          value={statusMap["confirmed"] ?? 0}
          color="emerald"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Form Visits"
          value={funnel.step1Views}
          color="indigo"
        />
      </div>

      {/* Funnel */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-5">Booking Funnel</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <FunnelCard
            step="Step 1"
            label="Personal Info"
            views={funnel.step1Views}
            completions={funnel.step1Completions}
            dropOff={step1DropOff}
          />
          <FunnelCard
            step="Step 2"
            label="Appointment Details"
            views={funnel.step1Completions}
            completions={funnel.step2Completions}
            dropOff={step2DropOff}
          />
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Overall Conversion</p>
              <p className="text-3xl font-bold text-slate-900">{overallConversion}%</p>
              <p className="text-sm text-slate-500 mt-1">Visits → Booked</p>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${overallConversion}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {funnel.step2Completions} of {funnel.step1Views} visitors booked
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services breakdown + Recent appointments */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* By service */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-5">Appointments by Service</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            {byService.length === 0 ? (
              <p className="text-sm text-slate-400">No appointments yet.</p>
            ) : byService.map(({ service, count }) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={service}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-slate-700 truncate pr-4">{service}</span>
                    <span className="text-sm font-bold text-slate-900 shrink-0">{count}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent appointments */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Recent Appointments</h2>
            <Link href="/admin/appointments" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {recentAppointments.length === 0 ? (
              <p className="text-sm text-slate-400 p-6">No appointments yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Service</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentAppointments.map(appt => (
                    <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-900">{appt.fullName}</p>
                        <p className="text-xs text-slate-400">{appt.phone}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell max-w-[160px]">
                        <span className="truncate block">{appt.service}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                        {appt.preferredDate}
                        <span className="block text-xs text-slate-400">{appt.preferredTime}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={appt.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const colorMap = {
  blue:    { bg: "bg-blue-100",    text: "text-blue-600"    },
  amber:   { bg: "bg-amber-100",   text: "text-amber-600"   },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  indigo:  { bg: "bg-indigo-100",  text: "text-indigo-600"  },
};

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: keyof typeof colorMap;
}) {
  const { bg, text } = colorMap[color];
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className={`w-10 h-10 ${bg} ${text} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function FunnelCard({ step, label, views, completions, dropOff }: {
  step: string;
  label: string;
  views: number;
  completions: number;
  dropOff: number;
}) {
  const pct = views > 0 ? Math.round((completions / views) * 100) : 0;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{step}</p>
          <p className="font-semibold text-slate-900 mt-0.5">{label}</p>
        </div>
        {dropOff > 0 && (
          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 text-xs font-semibold px-2.5 py-1 rounded-full">
            <TrendingDown className="w-3 h-3" />
            {dropOff}% drop
          </div>
        )}
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Entered</span><span className="font-semibold text-slate-800">{views}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Completed</span><span className="font-semibold text-slate-800">{completions}</span>
        </div>
      </div>
      <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-400 mt-1">{pct}% completion</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:   "bg-amber-100 text-amber-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
