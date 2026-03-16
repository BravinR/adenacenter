import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { sendPasswordChangedEmail } from "@/lib/email";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db
    .update(user)
    .set({ mustChangePassword: false })
    .where(eq(user.id, session.user.id));

  // Send confirmation email — fire-and-forget, don't fail the request if it errors
  sendPasswordChangedEmail({
    name: session.user.name,
    email: session.user.email,
  }).catch(err => console.error("[email] password-changed:", err));

  return NextResponse.json({ ok: true });
}
