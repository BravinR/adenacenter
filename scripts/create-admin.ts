/**
 * Run once to seed the first admin user:
 *   npx tsx scripts/create-admin.ts
 */
import "dotenv/config";
import { auth } from "../lib/auth";

const EMAIL = process.env.ADMIN_EMAIL ?? "admin@adenaoshcenter.com";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123!";
const NAME = "Admin";

async function main() {
  try {
    const { user } = await auth.api.createUser({
      body: {
        name: NAME,
        email: EMAIL,
        password: PASSWORD,
        role: "admin",
      },
    });

    console.log(`Admin created: ${user.email} (id: ${user.id})`);
    console.log("Change the password after first login!");
    process.exit(0);
  } catch (error: any) {
    console.error("Failed:", error?.message || error);
    process.exit(1);
  }
}

main();
