"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import {
  Search, CheckCircle, XCircle, RotateCcw,
  ChevronDown, ChevronUp, Phone, Mail, Building2,
  CalendarDays, Clock, FileText, SlidersHorizontal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Status = "pending" | "confirmed" | "cancelled";

type Appointment = {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  company: string | null;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
  status: Status;
  createdAt: string;
};

const TABS: { label: string; value: Status | "all" }[] = [
  { label: "All",       value: "all"       },
  { label: "Pending",   value: "pending"   },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  async function updateStatus(id: number, status: Status) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated: Appointment = await res.json();
        setAppointments(prev => prev.map(a => a.id === id ? updated : a));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  // Counts for tab badges
  const counts = {
    all:       appointments.length,
    pending:   appointments.filter(a => a.status === "pending").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length,
  };

  // Filter
  const filtered = appointments.filter(a => {
    const matchesTab = tab === "all" || a.status === tab;
    const q = search.toLowerCase();
    const matchesSearch = !q || [a.fullName, a.phone, a.email ?? "", a.company ?? "", a.service]
      .some(v => v.toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-1">{counts.all} total · {counts.pending} pending review</p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 self-start">
          {TABS.map(t => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                tab === t.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              ].join(" ")}
            >
              {t.label}
              <span className={[
                "text-xs px-1.5 py-0.5 rounded-full font-bold",
                tab === t.value ? statusPillClass(t.value) : "bg-slate-200 text-slate-500",
              ].join(" ")}>
                {counts[t.value]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Loading appointments…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
            <SlidersHorizontal className="w-8 h-8 opacity-40" />
            <p className="text-sm">No appointments match your filters.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Patient</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Service</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Date & Time</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(appt => (
                <Fragment key={appt.id}>
                  <tr
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === appt.id ? null : appt.id)}
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{appt.fullName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{appt.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 hidden lg:table-cell max-w-[200px]">
                      <span className="line-clamp-1">{appt.service}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-slate-700 font-medium">{appt.preferredDate}</p>
                      <p className="text-xs text-slate-400">{appt.preferredTime}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={appt.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        <ActionButtons
                          appt={appt}
                          isUpdating={updatingId === appt.id}
                          onUpdate={updateStatus}
                        />
                        <button
                          onClick={e => { e.stopPropagation(); setExpandedId(expandedId === appt.id ? null : appt.id); }}
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {expandedId === appt.id
                            ? <ChevronUp className="w-4 h-4" />
                            : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {expandedId === appt.id && (
                    <tr key={`${appt.id}-detail`} className="bg-slate-50">
                      <td colSpan={5} className="px-5 py-5">
                        <DetailPanel appt={appt} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Action buttons
// ---------------------------------------------------------------------------

function ActionButtons({ appt, isUpdating, onUpdate }: {
  appt: Appointment;
  isUpdating: boolean;
  onUpdate: (id: number, status: Status) => void;
}) {
  const spinner = (
    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );

  if (appt.status === "pending") {
    return (
      <>
        <button
          onClick={() => onUpdate(appt.id, "confirmed")}
          disabled={isUpdating}
          title="Confirm"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
        >
          {isUpdating ? spinner : <CheckCircle className="w-3.5 h-3.5" />}
          Confirm
        </button>
        <button
          onClick={() => onUpdate(appt.id, "cancelled")}
          disabled={isUpdating}
          title="Cancel"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
        >
          {isUpdating ? spinner : <XCircle className="w-3.5 h-3.5" />}
          Cancel
        </button>
      </>
    );
  }

  if (appt.status === "confirmed") {
    return (
      <button
        onClick={() => onUpdate(appt.id, "cancelled")}
        disabled={isUpdating}
        title="Cancel appointment"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
      >
        {isUpdating ? spinner : <XCircle className="w-3.5 h-3.5" />}
        Cancel
      </button>
    );
  }

  if (appt.status === "cancelled") {
    return (
      <button
        onClick={() => onUpdate(appt.id, "pending")}
        disabled={isUpdating}
        title="Restore to pending"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
      >
        {isUpdating ? spinner : <RotateCcw className="w-3.5 h-3.5" />}
        Restore
      </button>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Detail panel
// ---------------------------------------------------------------------------

function DetailPanel({ appt }: { appt: Appointment }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</p>
        <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone" value={appt.phone} href={`tel:${appt.phone}`} />
        <DetailRow icon={<Mail className="w-4 h-4" />} label="Email" value={appt.email ?? "—"} href={appt.email ? `mailto:${appt.email}` : undefined} />
        <DetailRow icon={<Building2 className="w-4 h-4" />} label="Company" value={appt.company ?? "—"} />
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Appointment</p>
        <DetailRow icon={<FileText className="w-4 h-4" />} label="Service" value={appt.service} />
        <DetailRow icon={<CalendarDays className="w-4 h-4" />} label="Date" value={appt.preferredDate} />
        <DetailRow icon={<Clock className="w-4 h-4" />} label="Time" value={appt.preferredTime} />
      </div>
      {appt.notes && (
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Notes</p>
          <p className="text-sm text-slate-600 bg-white rounded-xl border border-slate-200 p-3 leading-relaxed">
            {appt.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon, label, value, href }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-slate-400 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-medium text-blue-600 hover:underline truncate block">
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-slate-800 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

function statusPillClass(status: Status | "all") {
  switch (status) {
    case "pending":   return "bg-amber-100 text-amber-700";
    case "confirmed": return "bg-emerald-100 text-emerald-700";
    case "cancelled": return "bg-rose-100 text-rose-700";
    default:          return "bg-blue-100 text-blue-700";
  }
}

function StatusBadge({ status }: { status: Status }) {
  const labels: Record<Status, string> = { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled" };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusPillClass(status)}`}>
      {labels[status]}
    </span>
  );
}
