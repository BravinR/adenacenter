import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return NextResponse.json(messages);
}
