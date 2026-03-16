import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Transporter
// ---------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true", // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"Adena OSH Center" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`;

// ---------------------------------------------------------------------------
// Send helper
// ---------------------------------------------------------------------------

async function sendMail(to: string, subject: string, html: string) {
  await transporter.sendMail({ from: FROM, to, subject, html });
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

export async function sendAdminWelcomeEmail({
  name,
  email,
  temporaryPassword,
}: {
  name: string;
  email: string;
  temporaryPassword: string;
}) {
  await sendMail(
    email,
    "Welcome to Adena OSH Center — Action Required",
    `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
      <div style="background:#003A8F;padding:32px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px">Adena OSH Center</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Admin Portal Access</p>
      </div>

      <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
        <p style="margin:0 0 16px">Hi <strong>${name}</strong>,</p>
        <p style="margin:0 0 16px">An admin account has been created for you on the Adena OSH Center portal.</p>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:0 0 24px">
          <p style="margin:0 0 8px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em">Your login details</p>
          <p style="margin:0 0 6px"><strong>Email:</strong> ${email}</p>
          <p style="margin:0"><strong>Temporary password:</strong>
            <code style="background:#e2e8f0;padding:2px 8px;border-radius:4px;font-size:15px">${temporaryPassword}</code>
          </p>
        </div>

        <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:16px;margin:0 0 24px">
          <p style="margin:0;font-size:14px;color:#713f12">
            <strong>⚠ Action required:</strong> You will be asked to change your password immediately after your first login.
          </p>
        </div>

        <a href="${process.env.BETTER_AUTH_URL}/admin/login"
           style="display:inline-block;background:#003A8F;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:15px">
          Sign in to the portal
        </a>

        <p style="margin:24px 0 0;font-size:13px;color:#94a3b8">
          If you did not expect this email, please contact <a href="mailto:info@adenaoshcentre.com" style="color:#003A8F">info@adenaoshcentre.com</a>.
        </p>
      </div>
    </div>
    `
  );
}

export async function sendAppointmentNotificationEmail({
  id,
  fullName,
  phone,
  email,
  company,
  service,
  preferredDate,
  preferredTime,
  notes,
}: {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  company: string | null;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
}) {
  const adminEmail = "admin@adenaoshcentre.com";

  await sendMail(
    adminEmail,
    `New Appointment Request — ${fullName}`,
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
      <div style="background:#003A8F;padding:32px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px">New Appointment Request</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Submitted via adenaoshcentre.com</p>
      </div>

      <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr style="background:#f8fafc">
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;width:40%;border-bottom:1px solid #e2e8f0">Ref #</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">#${id}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Name</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${fullName}</td>
          </tr>
          <tr style="background:#f8fafc">
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Phone</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${phone}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Email</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${email ?? "—"}</td>
          </tr>
          ${company ? `
          <tr style="background:#f8fafc">
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Company</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${company}</td>
          </tr>` : ""}
          <tr style="background:#f8fafc">
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Service</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#003A8F;border-bottom:1px solid #e2e8f0">${service}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0">Preferred Date</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0">${preferredDate}</td>
          </tr>
          <tr style="background:#f8fafc">
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;${notes ? "border-bottom:1px solid #e2e8f0" : ""}">Preferred Time</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b;${notes ? "border-bottom:1px solid #e2e8f0" : ""}">${preferredTime}</td>
          </tr>
          ${notes ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;vertical-align:top">Notes</td>
            <td style="padding:10px 14px;font-size:14px;color:#1e293b">${notes}</td>
          </tr>` : ""}
        </table>

        <a href="${process.env.BETTER_AUTH_URL}/admin"
           style="display:inline-block;background:#003A8F;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:15px">
          View in dashboard
        </a>

        <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">
          This is an automated notification from adenaoshcentre.com
        </p>
      </div>
    </div>
    `
  );
}

export async function sendAppointmentConfirmedEmail({
  fullName,
  email,
  service,
  preferredDate,
  preferredTime,
}: {
  fullName: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
}) {
  await sendMail(
    email,
    "Your Adena OSH Center appointment is confirmed",
    `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
      <div style="background:#003A8F;padding:32px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px">Adena OSH Center</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Appointment Confirmation</p>
      </div>

      <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
        <p style="margin:0 0 16px">Hi <strong>${fullName}</strong>,</p>
        <p style="margin:0 0 24px">Great news — your appointment has been confirmed. Here are your details:</p>

        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:20px;margin:0 0 24px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;width:40%">Service</td>
              <td style="padding:6px 0;font-size:14px;font-weight:600;color:#166534">${service}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b">Date</td>
              <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b">${preferredDate}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b">Time</td>
              <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b">${preferredTime}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b">Location</td>
              <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b">Acacia Centre, Nyerere Avenue, Mombasa</td>
            </tr>
          </table>
        </div>

        <p style="margin:0 0 24px;font-size:14px;color:#475569">
          Please arrive 10 minutes before your scheduled time. If you need to reschedule or have any questions, contact us at
          <a href="mailto:info@adenaoshcentre.com" style="color:#003A8F">info@adenaoshcentre.com</a> or call
          <a href="tel:+254708775657" style="color:#003A8F">+254 708 775 657</a>.
        </p>

        <p style="margin:0;font-size:13px;color:#94a3b8">
          We look forward to seeing you. — The Adena OSH Center Team
        </p>
      </div>
    </div>
    `
  );
}

export async function sendPasswordResetEmail({
  name,
  email,
  resetUrl,
}: {
  name: string;
  email: string;
  resetUrl: string;
}) {
  await sendMail(
    email,
    "Reset your Adena OSH Center password",
    `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
      <div style="background:#003A8F;padding:32px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px">Adena OSH Center</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Password Reset Request</p>
      </div>

      <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
        <p style="margin:0 0 16px">Hi <strong>${name}</strong>,</p>
        <p style="margin:0 0 24px">We received a request to reset your admin portal password. Click the button below to choose a new one.</p>

        <a href="${resetUrl}"
           style="display:inline-block;background:#003A8F;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:15px">
          Reset my password
        </a>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0">
          <p style="margin:0;font-size:13px;color:#64748b">
            This link expires in <strong>1 hour</strong>. If you didn't request a password reset, you can safely ignore this email — your password will not change.
          </p>
        </div>

        <p style="margin:0;font-size:13px;color:#94a3b8">
          Having trouble with the button? Copy and paste this URL into your browser:<br/>
          <span style="color:#003A8F;word-break:break-all">${resetUrl}</span>
        </p>
      </div>
    </div>
    `
  );
}

export async function sendPasswordChangedEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  await sendMail(
    email,
    "Your Adena OSH Center password has been changed",
    `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
      <div style="background:#003A8F;padding:32px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px">Adena OSH Center</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Security Notification</p>
      </div>

      <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
        <p style="margin:0 0 16px">Hi <strong>${name}</strong>,</p>
        <p style="margin:0 0 16px">Your admin portal password was successfully changed.</p>

        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px;margin:0 0 24px">
          <p style="margin:0;font-size:14px;color:#166534">
            ✓ Password updated on ${new Date().toLocaleString("en-KE", { dateStyle: "full", timeStyle: "short" })}
          </p>
        </div>

        <p style="margin:0 0 16px;font-size:14px;color:#475569">
          If you did not make this change, please contact your system administrator immediately.
        </p>

        <a href="${process.env.BETTER_AUTH_URL}/admin"
           style="display:inline-block;background:#003A8F;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:15px">
          Go to dashboard
        </a>
      </div>
    </div>
    `
  );
}
