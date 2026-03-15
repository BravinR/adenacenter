import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AdminNav from "@/components/AdminNav";

export const metadata = {
  title: "Admin Dashboard | Adena OSH Center",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/admin/login");
  }

  if (session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <AdminNav user={session.user} />
      <main className="container mx-auto px-4 md:px-6 max-w-7xl py-10">
        {children}
      </main>
    </div>
  );
}
