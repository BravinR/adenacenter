import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
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

  // Check if admin must change their temporary password
  const [dbUser] = await db.select({ mustChangePassword: user.mustChangePassword })
    .from(user)
    .where(eq(user.id, session.user.id));

  if (dbUser?.mustChangePassword) {
    redirect("/admin/change-password");
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
