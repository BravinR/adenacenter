# Adena OSH Center

Website for **Adena Occupational Health and Safety Center** — a DOSHS recognized medical specialist center based in Mombasa, Kenya.

Built with Next.js 15, Tailwind CSS, Drizzle ORM, and PostgreSQL (Neon).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via [Neon](https://neon.tech) |
| ORM | Drizzle ORM |
| Runtime | Node.js 22 |
| Deployment | Docker (standalone output) |

---

## Getting Started

### Prerequisites

- Node.js 22+
- A PostgreSQL database (Neon recommended)

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

### 3. Run database migrations

```bash
npm run db:migrate
```

### 4. Start the dev server

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
# Build and start (reads DATABASE_URL and APP_URL from .env)
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
docker build \
  --build-arg DATABASE_URL="your-connection-string" \
  -t adenacenter-web .
```

> **Note:** Migrations are not run inside the container. Run `npm run db:migrate` before deploying.

---

## Project Structure

```
app/
├── api/
│   ├── appointments/   # POST (create) · GET (list all)
│   ├── funnel/         # POST — drop-off tracking events
│   └── health/         # GET — Docker healthcheck endpoint
├── appointment/        # Multi-step booking form (2 steps)
└── page.tsx            # Home / landing page

components/
├── Navbar.tsx          # Shared top bar + navigation
├── Footer.tsx          # Shared footer
└── Logo.tsx            # SVG logo component

db/
├── schema.ts           # Drizzle table definitions
├── index.ts            # Database client (pg Pool)
└── migrations/         # SQL migration files
```

---

## Funnel Analytics

The appointment flow tracks drop-offs via the `funnel_events` table. Each visitor gets a session UUID on page load.

| Event | Fired when |
|---|---|
| `step=1, event=viewed` | Appointment page loads |
| `step=1, event=completed` | User passes step 1 validation and continues |
| `step=2, event=viewed` | Step 2 renders |
| `step=2, event=completed` | Appointment successfully saved |

Query drop-off rates:

```sql
SELECT
  COUNT(DISTINCT CASE WHEN step=1 AND event='viewed'    THEN session_id END) AS step1_views,
  COUNT(DISTINCT CASE WHEN step=1 AND event='completed' THEN session_id END) AS step1_completions,
  COUNT(DISTINCT CASE WHEN step=2 AND event='completed' THEN session_id END) AS bookings
FROM funnel_events;
```
