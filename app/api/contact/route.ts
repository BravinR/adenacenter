import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"Adena OSH Center" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body as {
    name: string;
    email: string;
    phone?: string;
    message: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Save to DB
  const [saved] = await db
    .insert(contactMessages)
    .values({ name, email, phone: phone ?? null, message })
    .returning();

  // Fire notification email (non-blocking)
  transporter.sendMail({
    from: FROM,
    to: "info@adenaoshcentre.com",
    replyTo: email,
    subject: `Contact form message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
        <div style="background:#003A8F;padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:#ffffff;margin:0;font-size:22px">New Contact Form Message</h1>
          <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Submitted via adenaoshcentre.com</p>
        </div>
        <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr style="background:#f8fafc">
              <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;width:30%;border-bottom:1px solid #e2e8f0">Name</td>
              <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Email</td>
              <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">
                <a href="mailto:${email}" style="color:#003A8F">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr style="background:#f8fafc">
              <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Phone</td>
              <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${phone}</td>
            </tr>` : ""}
            <tr ${phone ? 'style="background:#f8fafc"' : ""}>
              <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;vertical-align:top">Message</td>
              <td style="padding:10px 14px;font-size:14px;color:#1e293b;white-space:pre-wrap">${message}</td>
            </tr>
          </table>
          <a href="${process.env.BETTER_AUTH_URL}/admin/messages"
             style="display:inline-block;background:#003A8F;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:15px">
            View in dashboard
          </a>
          <p style="margin:16px 0 0;font-size:12px;color:#94a3b8">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      </div>
    `,
  }).catch(err => console.error("[contact] email error:", err));

  return NextResponse.json({ id: saved.id });
}
