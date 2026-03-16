import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { sendAppointmentConfirmedEmail } from "@/lib/email";

type Status = "pending" | "confirmed" | "cancelled";
const VALID_STATUSES: Status[] = ["pending", "confirmed", "cancelled"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const appointmentId = Number(id);
  if (isNaN(appointmentId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();
  const status = body.status as Status;
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const [updated] = await db
    .update(appointments)
    .set({ status })
    .where(eq(appointments.id, appointmentId))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  // Send confirmation email to patient when confirmed
  if (status === "confirmed" && updated.email) {
    sendAppointmentConfirmedEmail({
      fullName: updated.fullName,
      email: updated.email,
      service: updated.service,
      preferredDate: updated.preferredDate,
      preferredTime: updated.preferredTime,
    }).catch(err => console.error("[email] appointment-confirmed:", err));
  }

  return NextResponse.json(updated);
}
