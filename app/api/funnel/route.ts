import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { funnelEvents } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, step, event } = await req.json();

    if (!sessionId || !step || !event) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (![1, 2].includes(step) || !["viewed", "completed"].includes(event)) {
      return NextResponse.json({ error: "Invalid step or event" }, { status: 400 });
    }

    await db.insert(funnelEvents).values({ sessionId, step, event });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/funnel]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
