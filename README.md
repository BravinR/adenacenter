# Adena OSH Center

Website for **Adena Occupational Health and Safety Center** — a DOSHS recognized medical specialist center based in Mombasa, Kenya.

Built with Next.js 15, Tailwind CSS, Drizzle ORM, Better Auth, and PostgreSQL (Neon).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 + Typography plugin |
| Database | PostgreSQL via [Neon](https://neon.tech) |
| ORM | Drizzle ORM |
| Auth | Better Auth (email/password + admin plugin) |
| Email | Nodemailer (SMTP) |
| Runtime | Node.js 22 |
| Deployment | Docker (standalone output) |

---

## Pages

### Public

| Route | Description |
|---|---|
| `/` | Homepage — hero, about, services overview, news highlights |
| `/services` | Full services catalog with per-service booking CTAs |
| `/about` | Mission, vision, founding story, team, values |
| `/contact` | Contact form, address, opening hours, map |
| `/appointment` | 2-step booking wizard with funnel drop-off tracking |
| `/news` | Article listing |
| `/news/[slug]` | Individual article with related posts and booking CTA |
| `/privacy-policy` | Privacy policy (Kenya Data Protection Act compliant) |
| `/terms-of-service` | Terms of service |

### Admin Portal (`/admin`)

| Route | Description |
|---|---|
| `/admin/login` | Email/password sign-in |
| `/admin/forgot-password` | Request password reset email |
| `/admin/reset-password` | Set new password via emailed token |
| `/admin/change-password` | Forced first-login password change |
| `/admin` | Dashboard — stats, booking funnel, recent activity |
| `/admin/appointments` | Manage appointments (confirm, cancel, restore, search, filter) |
| `/admin/messages` | Contact form inbox (read/unread, reply, delete) |

---

## Getting Started

### Prerequisites

- Node.js 22+
- A PostgreSQL database (Neon recommended)
- An SMTP server for transactional email

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `APP_URL` | Public URL of the site (e.g. `https://adenaoshcentre.com`) |
| `BETTER_AUTH_SECRET` | Random secret for Better Auth session signing |
| `BETTER_AUTH_URL` | Same as `APP_URL` |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (default `587`) |
| `SMTP_SECURE` | `true` for port 465, `false` otherwise |
| `SMTP_USER` | SMTP username / sender address |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | Display "from" address (optional, falls back to `SMTP_USER`) |

### 3. Run database migrations

```bash
npm run db:migrate
```

### 4. Create the first admin user

```bash
npm run create-admin
```

This prompts for a name, email, and temporary password, inserts the admin, and sends a welcome email with login instructions. The admin is forced to change their password on first login.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Scripts

```bash
npm run db:generate   # Generate migration files from schema changes
npm run db:migrate    # Apply migrations to the database
npm run db:push       # Push schema directly (dev only, skips migrations)
npm run db:studio     # Open Drizzle Studio — visual database browser
```

---

## Docker

### Run with Docker Compose

```bash
# Build and start (reads env from .env)
docker compose up --build

# Run in background
docker compose up --build -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Build the image manually

```bash
docker build -t adenacenter-web .
```

> **Note:** Migrations are not run inside the container. Run `npm run db:migrate` before deploying, or run it as a release step in your CI/CD pipeline.

---

## Project Structure

```
app/
├── api/
│   ├── appointments/         # POST (create) · GET (list all)
│   ├── admin/
│   │   ├── appointments/[id] # PATCH — update status
│   │   ├── messages/         # GET — list contact messages
│   │   ├── messages/[id]     # PATCH (mark read) · DELETE
│   │   └── password-changed/ # POST — clear mustChangePassword flag
│   ├── auth/[...all]/        # Better Auth catch-all handler
│   ├── contact/              # POST — save message + send email
│   ├── funnel/               # POST — drop-off tracking events
│   └── health/               # GET — Docker healthcheck
├── admin/
│   ├── (dashboard)/          # Auth-gated route group
│   │   ├── page.tsx          # Dashboard
│   │   ├── appointments/     # Appointments management
│   │   └── messages/         # Contact message inbox
│   ├── login/
│   ├── forgot-password/
│   ├── reset-password/
│   └── change-password/
├── appointment/              # Multi-step booking form
├── services/
├── about/
├── contact/
├── news/
│   └── [slug]/
├── privacy-policy/
├── terms-of-service/
└── page.tsx                  # Homepage

components/
├── Navbar.tsx                # Public site navigation
├── AdminNav.tsx              # Admin portal header
├── Footer.tsx                # Shared footer
└── Logo.tsx                  # SVG logo component

db/
├── schema.ts                 # Drizzle table definitions
├── index.ts                  # Database client (pg Pool)
└── migrations/               # SQL migration files

lib/
├── auth.ts                   # Better Auth server config
├── auth-client.ts            # Better Auth browser client
└── email.ts                  # Nodemailer transporter + email templates

scripts/
└── create-admin.ts           # Seed first admin user
```

---

## Database Schema

| Table | Purpose |
|---|---|
| `appointments` | Booking requests with status (`pending` / `confirmed` / `cancelled`) |
| `contact_messages` | Contact form submissions with read/unread state |
| `funnel_events` | Per-session step events for drop-off analysis |
| `user` | Admin users (Better Auth) |
| `session` | Active sessions (Better Auth) |
| `account` | OAuth accounts (Better Auth) |
| `verification` | Email verification / password reset tokens (Better Auth) |

---

## Funnel Analytics

The appointment flow tracks drop-offs via the `funnel_events` table. Each visitor gets a session UUID on page load.

| Event | Fired when |
|---|---|
| `step=1, event=viewed` | Appointment page loads |
| `step=1, event=completed` | User passes step 1 validation and continues |
| `step=2, event=viewed` | Step 2 renders |
| `step=2, event=completed` | Appointment successfully saved |

The admin dashboard displays these as funnel cards with completion rates and drop-off percentages.

---

## Email Notifications

| Trigger | Recipient | Template |
|---|---|---|
| New appointment submitted | Admin (`info@adenaoshcentre.com`) | Appointment details + dashboard link |
| Appointment confirmed by admin | Patient (if email provided) | Confirmation with date, time, location |
| Contact form submitted | Admin (`info@adenaoshcentre.com`) | Message details + dashboard link |
| Admin account created | New admin | Temporary password + login link |
| Password reset requested | Admin | Reset link (expires 1 hour) |
| Password successfully changed | Admin | Security confirmation |
