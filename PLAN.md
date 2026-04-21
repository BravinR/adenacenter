# Adena OSH Center — Site Plan

## Current State
Single-page app (``) with anchor-link navigation. All sections (Hero, About, Services, News, Contact/Footer) live on one page. Nav links (`#services`, `#about`, `#news`, `#contact`) and both "Make Appointment" CTAs point to `#contact` (the footer).

---

## Pages to Build

#### `/services` — Our Services
**File:** `app/services/page.tsx`
**Why:** The current "Why Choose Us" section is a feature list, not a services catalog. A dedicated page allows deeper descriptions, pricing tiers (corporate vs individual), and CTAs per service.
**Contents:**
- Hero banner
- Service cards with expanded descriptions:
  - Pre-employment Medical Screening
  - Periodic Occupational Health Surveillance
  - Wellness Programs
  - DOSHS Fitness Certificates & Official Reports
  - Clinical Consultations (specialist panel)
  - Counselling & Mental Health
  - Nutrition Services
  - Feedback Sessions & Workshops
- Each card links to `/appointment` with service pre-selected
- Update nav "Our Services" link from `#services` → `/services`

---

#### `/about` — About Us
**File:** `app/about/page.tsx`
**Why:** The current about section is 2 short paragraphs. A full page can build trust with corporate clients.
**Contents:**
- Mission & vision statements
- Story / founding history
- DOSHS recognition details & certifications
- Team section (doctors, specialists, staff)
- Stats (number of clients served, years in operation, etc.)
- Update nav "About Us" link from `#about` → `/about`

---

#### `/contact` — Contact Us
**File:** `app/contact/page.tsx`
**Why:** Contact info is buried in the footer. A dedicated page improves discoverability.
**Contents:**
- Contact form (name, email, message)
- Address: Acacia Centre, Nyerere Avenue, Mombasa
- Phone: +254 708 775 657
- Email: info@adenaoshcentre.com
- Opening hours
- Embedded Google Map (Acacia Centre, Mombasa)
- Update nav "Contact Us" link from `#contact` → `/contact`

---

### Priority 2 — Content & Blog

#### `/news` — News & Blog Listing
**File:** `app/news/page.tsx`
**Why:** The homepage shows 3 hardcoded articles. "Read More" links go nowhere (`href="#"`). This needs a real listing page.
**Contents:**
- Grid of article cards (date, image, title, excerpt)
- Pagination or infinite scroll
- Update homepage "Read More" links to `/news/[slug]`

#### `/news/[slug]` — Individual Article
**File:** `app/news/[slug]/page.tsx`
**Why:** Each news article needs its own URL for sharing and SEO.
**Contents:**
- Full article content (body, images)
- Author / date
- Related articles
- CTA to book appointment

---

### Priority 3 — Legal & Trust

#### `/privacy-policy` — Privacy Policy
**File:** `app/privacy-policy/page.tsx`
**Why:** Footer link exists but goes to `#`. Required for GDPR/Kenya Data Protection Act compliance (especially since the site handles medical data).

#### `/terms-of-service` — Terms of Service
**File:** `app/terms-of-service/page.tsx`
**Why:** Footer link exists but goes to `#`.

---

## Navigation Updates (after pages are built)

| Current link | → | Target |
|---|---|---|
| `href="#services"` | → | `href="/services"` |
| `href="#about"` | → | `href="/about"` |
| `href="#news"` | → | `href="/news"` |
| `href="#contact"` | → | `href="/contact"` |
| `href="#contact"` (Make Appointment CTAs) | → | `href="/appointment"` |
| `href="#"` (Privacy Policy) | → | `href="/privacy-policy"` |
| `href="#"` (Terms of Service) | → | `href="/terms-of-service"` |
| `href="#"` (Read More on news cards) | → | `href="/news/[slug]"` |

---

## Shared Components to Extract

Once multiple pages exist, pull these out of `page.tsx`:
- `components/Navbar.tsx` — top bar + header + mobile menu
- `components/Footer.tsx` — footer with contact, hours, socials, quick links
- `components/AppointmentCTA.tsx` — reusable "Book Appointment" banner/button block

---

## Implementation Order

1. `/appointment` — highest user value, referenced by existing CTAs
2. Shared `Navbar` + `Footer` components — needed before building other pages
3. `/services` — second most linked page
4. `/contact` — replaces footer-as-contact pattern
5. `/about` — trust-building for corporate clients
6. `/news` + `/news/[slug]` — content/SEO value
7. `/privacy-policy` + `/terms-of-service` — compliance
