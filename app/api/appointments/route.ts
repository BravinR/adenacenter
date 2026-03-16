import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { sendAppointmentNotificationEmail } from "@/lib/email";

const REQUIRED_FIELDS = ["fullName", "phone", "service", "preferredDate", "preferredTime"] as const;

function validateBody(body: Record<string, unknown>): string | null {
  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || String(body[field]).trim() === "") {
      return `Missing required field: ${field}`;
    }
  }
  const email = String(body.email ?? "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address";
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const error = validateBody(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const [appointment] = await db
      .insert(appointments)
      .values({
        fullName: String(body.fullName).trim(),
        email: body.email ? String(body.email).trim().toLowerCase() : null,
        phone: String(body.phone).trim(),
        company: body.company ? String(body.company).trim() : null,
        service: String(body.service).trim(),
        preferredDate: String(body.preferredDate),
        preferredTime: String(body.preferredTime),
        notes: body.notes ? String(body.notes).trim() : null,
        status: "pending",
      })
      .returning();

    // Notify admin — fire-and-forget, never block the response
    sendAppointmentNotificationEmail({
      id: appointment.id,
      fullName: appointment.fullName,
      phone: appointment.phone,
      email: appointment.email ?? null,
      company: appointment.company ?? null,
      service: appointment.service,
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      notes: appointment.notes ?? null,
    }).catch(err => console.error("[email] appointment-notification:", err));

    return NextResponse.json({ success: true, id: appointment.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/appointments]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const all = await db.query.appointments.findMany({
      orderBy: (a, { desc }) => [desc(a.createdAt)],
    });
    return NextResponse.json(all);
  } catch (err) {
    console.error("[GET /api/appointments]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
