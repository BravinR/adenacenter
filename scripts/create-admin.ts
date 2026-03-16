/**
 * Run once to seed the first admin user:
 *   npx tsx scripts/create-admin.ts
 *
 * Override defaults with env vars:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npm run create-admin
 */
import "dotenv/config";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { db } from "../db";
import { user } from "../db/schema";
import { sendAdminWelcomeEmail } from "../lib/email";

const EMAIL = process.env.ADMIN_EMAIL ?? "admin@adenaoshcentre.com";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123!";
const NAME = "Admin";

async function main() {
  try {
    const { user: created } = await auth.api.createUser({
      body: { name: NAME, email: EMAIL, password: PASSWORD, role: "admin" },
    });

    // Flag account so admin must change password on first login
    await db
      .update(user)
      .set({ mustChangePassword: true })
      .where(eq(user.id, created.id));

    console.log(`Admin created: ${created.email} (id: ${created.id})`);

    // Send welcome email with temporary credentials
    await sendAdminWelcomeEmail({ name: NAME, email: EMAIL, temporaryPassword: PASSWORD });
    console.log(`Welcome email sent to ${EMAIL}`);
    console.log("Admin will be prompted to change their password on first login.");

    process.exit(0);
  } catch (error: unknown) {
    console.error("Failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
