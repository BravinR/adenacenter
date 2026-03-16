import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Article data (static for now — replace with DB/CMS later)
// ---------------------------------------------------------------------------

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  body: string; // HTML
};

const ARTICLES: Article[] = [
  {
    slug: "understanding-doshs-fitness-certificates",
    title: "Understanding DOSHS Fitness Certificates: What Employers Need to Know",
    excerpt:
      "DOSHS fitness certificates are a legal requirement for employees in hazardous industries. We break down who needs them, the process, and how Adena Center can help your organisation stay compliant.",
    date: "2025-10-14",
    category: "Compliance",
    image: "https://picsum.photos/seed/news1/1200/600",
    readTime: "5 min read",
    body: `
      <p>The Directorate of Occupational Safety and Health Services (DOSHS) requires that employees working in scheduled occupational hazard environments hold valid fitness certificates issued by a recognised medical center. Failure to comply can result in fines, permit revocations, and — more importantly — preventable harm to workers.</p>
      <h2>Who Needs a DOSHS Fitness Certificate?</h2>
      <p>Any employee whose job exposes them to the following categories of hazard is required to hold a current fitness certificate:</p>
      <ul>
        <li>Noise exposure above 85 dB(A) averaged over an 8-hour shift</li>
        <li>Chemical or dust exposure (including welding fumes, silica, and asbestos)</li>
        <li>Work at heights or in confined spaces</li>
        <li>Driving or operating heavy machinery</li>
        <li>Food handling (catering, processing, manufacturing)</li>
      </ul>
      <h2>What Does the Assessment Include?</h2>
      <p>A DOSHS fitness assessment typically includes:</p>
      <ul>
        <li><strong>Medical history review</strong> — chronic conditions, medication, prior occupational illnesses</li>
        <li><strong>Physical examination</strong> — cardiovascular, musculoskeletal, neurological</li>
        <li><strong>Audiometry</strong> — baseline and periodic hearing tests for noise-exposed workers</li>
        <li><strong>Spirometry</strong> — lung function tests for dust/chemical-exposed workers</li>
        <li><strong>Vision screening</strong> — relevant for drivers and screen-intensive roles</li>
        <li><strong>Laboratory tests</strong> — as required by the nature of the hazard</li>
      </ul>
      <h2>How Adena OSH Center Can Help</h2>
      <p>As a DOSHS-recognised center, we issue valid fitness certificates accepted by all regulatory bodies in Kenya. We offer both individual appointments and on-site corporate health days — minimising downtime for your workforce while ensuring full compliance.</p>
      <p>Contact us to discuss a tailored occupational health surveillance program for your organisation.</p>
    `,
  },
  {
    slug: "mental-health-workplace-kenya",
    title: "Mental Health in the Kenyan Workplace: Breaking the Silence",
    excerpt:
      "Workplace mental health is increasingly recognised as a key driver of productivity and retention. Learn how our counselling and EAP programs are helping Coast-region employers support their teams.",
    date: "2025-09-22",
    category: "Wellness",
    image: "https://picsum.photos/seed/news2/1200/600",
    readTime: "6 min read",
    body: `
      <p>Kenya's Mental Health Policy (2015–2030) identifies the workplace as a critical environment for mental health promotion. Yet for many Kenyan employees, disclosing mental health struggles at work still carries significant stigma.</p>
      <h2>The Business Case for Mental Health Support</h2>
      <p>Research consistently shows that untreated mental health conditions — particularly depression and anxiety — are among the leading causes of absenteeism and presenteeism (being physically present but underperforming). The economic cost to Kenyan businesses is significant.</p>
      <p>Conversely, organisations that invest in Employee Assistance Programs (EAPs) typically report reduced sick leave, lower staff turnover, and measurable gains in productivity within 12 months.</p>
      <h2>What We Offer</h2>
      <p>Our mental health services at Adena OSH Center include:</p>
      <ul>
        <li><strong>Individual counselling</strong> — confidential sessions with registered counsellors</li>
        <li><strong>Stress and resilience workshops</strong> — group sessions for teams under pressure</li>
        <li><strong>Manager awareness training</strong> — equipping line managers to recognise and respond to distress</li>
        <li><strong>Critical incident support</strong> — rapid response after workplace accidents or trauma</li>
      </ul>
      <h2>Starting the Conversation</h2>
      <p>The most powerful thing an employer can do is create a psychologically safe environment where employees feel able to ask for help without fear of consequence. We can support your HR team in drafting a mental health policy and training your managers.</p>
      <p>Get in touch to learn more about our EAP packages for Coast-region businesses.</p>
    `,
  },
  {
    slug: "pre-employment-medical-guide",
    title: "A Complete Guide to Pre-Employment Medical Screening in Kenya",
    excerpt:
      "What tests are included, what conditions are assessed, and what the results mean for hiring decisions — a plain-language guide for HR professionals.",
    date: "2025-08-30",
    category: "Services",
    image: "https://picsum.photos/seed/news3/1200/600",
    readTime: "7 min read",
    body: `
      <p>Pre-employment medical screening is one of the most important — and most misunderstood — steps in the hiring process. Done correctly, it protects both the employee and the employer. Done poorly, it can expose organisations to legal liability.</p>
      <h2>Purpose of Pre-Employment Screening</h2>
      <p>The goal is not to exclude candidates with medical conditions, but to:</p>
      <ul>
        <li>Establish a baseline health record for future comparison</li>
        <li>Identify any fitness-for-duty concerns before role commencement</li>
        <li>Ensure the role's physical or environmental demands do not pose unreasonable risk to the individual</li>
      </ul>
      <h2>Standard Tests Included</h2>
      <p>Our pre-employment assessments typically include:</p>
      <ul>
        <li>Full blood count and metabolic panel</li>
        <li>Urinalysis</li>
        <li>Vision and colour vision screening</li>
        <li>Hearing assessment (audiometry)</li>
        <li>Chest X-ray where applicable</li>
        <li>Blood pressure and cardiovascular risk assessment</li>
        <li>Musculoskeletal examination</li>
      </ul>
      <h2>Legal Considerations</h2>
      <p>Under Kenya's Persons with Disabilities Act and the Employment Act, employers may not use a medical assessment to discriminate against a candidate unless a genuine occupational requirement exists. Our reports are carefully worded to advise on fitness for the specific role — not to make blanket recommendations about employability.</p>
      <h2>Turnaround Time</h2>
      <p>Standard reports are available within 2 business days. Express turnaround (24 hours) is available for corporate clients on our retainer program. Contact us to discuss volume pricing for large cohorts.</p>
    `,
  },
  {
    slug: "heat-stress-coastal-workers",
    title: "Heat Stress Among Coastal Workers: Risks, Recognition, and Prevention",
    excerpt:
      "Working on the Kenyan coast presents unique heat-related health challenges. This article outlines the clinical indicators of heat stress and practical controls employers can implement.",
    date: "2025-07-10",
    category: "Safety",
    image: "https://picsum.photos/seed/news4/1200/600",
    readTime: "5 min read",
    body: `
      <p>With temperatures regularly exceeding 30°C and humidity levels above 80%, the Kenyan coastal environment presents genuine heat stress risks for outdoor and industrial workers. Heat-related illness ranges from minor heat cramps to life-threatening heat stroke — and the transition can be rapid.</p>
      <h2>Who Is Most at Risk?</h2>
      <p>High-risk groups include: port and dockside workers, construction crews, agricultural workers, security personnel in heavy uniforms, and any employees working near heat-generating industrial equipment.</p>
      <h2>Clinical Signs to Watch For</h2>
      <ul>
        <li><strong>Heat cramps</strong> — muscle spasms after heavy work; first sign of salt/fluid depletion</li>
        <li><strong>Heat exhaustion</strong> — heavy sweating, weakness, cold/pale/clammy skin, fast weak pulse, nausea</li>
        <li><strong>Heat stroke</strong> — high body temperature (above 39.5°C), hot/red/dry skin, rapid strong pulse, possible unconsciousness — MEDICAL EMERGENCY</li>
      </ul>
      <h2>Engineering and Administrative Controls</h2>
      <ul>
        <li>Schedule heavy work during early morning or late afternoon hours</li>
        <li>Ensure access to cool drinking water (250ml every 15–20 minutes during heavy exertion)</li>
        <li>Provide shaded rest areas and enforce regular rest breaks</li>
        <li>Implement acclimatisation programs for new workers</li>
        <li>Train supervisors to recognise early warning signs</li>
      </ul>
      <p>Adena OSH Center offers on-site heat stress risk assessments and supervisor training. Contact us to arrange an assessment for your worksite.</p>
    `,
  },
  {
    slug: "noise-induced-hearing-loss-prevention",
    title: "Noise-Induced Hearing Loss: Prevention Starts with Audiometry",
    excerpt:
      "Occupational hearing loss is largely preventable. Discover how periodic audiometric surveillance can detect early deterioration and what control measures are most effective.",
    date: "2025-06-05",
    category: "Services",
    image: "https://picsum.photos/seed/news5/1200/600",
    readTime: "4 min read",
    body: `
      <p>Noise-induced hearing loss (NIHL) is irreversible — but it is almost entirely preventable. The key is early detection through regular audiometric testing combined with effective noise control at source.</p>
      <h2>How NIHL Develops</h2>
      <p>Prolonged exposure to noise above 85 dB(A) gradually damages the hair cells in the cochlea. The loss begins at higher frequencies (4,000 Hz) and is typically not noticed by the worker until significant damage has already occurred — often years after the exposure began.</p>
      <h2>The Role of Audiometric Surveillance</h2>
      <p>Baseline audiometry at pre-employment, followed by annual monitoring, allows us to identify a "standard threshold shift" — an early warning sign — before the employee notices any subjective hearing difficulty. This creates an opportunity to intervene with enhanced hearing protection, noise controls, or role reassignment.</p>
      <h2>Hierarchy of Controls</h2>
      <ol>
        <li><strong>Elimination/substitution</strong> — replace noisy processes or equipment where feasible</li>
        <li><strong>Engineering controls</strong> — enclosures, silencers, vibration damping</li>
        <li><strong>Administrative controls</strong> — job rotation, reduced exposure time</li>
        <li><strong>PPE</strong> — correctly fitted hearing protection as a last resort, not a first response</li>
      </ol>
      <p>We provide audiometric testing for groups of all sizes, including mobile clinic services for remote or industrial sites. Request a quote for your organisation.</p>
    `,
  },
  {
    slug: "workplace-nutrition-productivity",
    title: "How Workplace Nutrition Programs Boost Productivity and Cut Sick Days",
    excerpt:
      "Nutrition is one of the most under-utilised levers in occupational health. We share data from corporate nutrition initiatives and practical steps for getting started.",
    date: "2025-05-18",
    category: "Wellness",
    image: "https://picsum.photos/seed/news6/1200/600",
    readTime: "5 min read",
    body: `
      <p>Poor nutrition is associated with a 20% reduction in cognitive performance, increased rates of obesity-related chronic disease, and higher absenteeism. Yet nutrition is rarely included in corporate health strategies — a missed opportunity for most Kenyan businesses.</p>
      <h2>What the Evidence Shows</h2>
      <p>A 2023 review of workplace nutrition interventions in sub-Saharan Africa found that structured programs combining individual dietary counselling with group education reduced sick leave by an average of 1.5 days per employee per year — a measurable return on investment for most employers.</p>
      <h2>Components of an Effective Program</h2>
      <ul>
        <li><strong>Nutritional risk screening</strong> — identify employees at high risk of diet-related disease</li>
        <li><strong>Individual dietary assessments</strong> — personalised plans from a registered dietitian</li>
        <li><strong>Group education sessions</strong> — practical workshops on reading food labels, meal planning, hydration, and managing chronic conditions through diet</li>
        <li><strong>Canteen/cafeteria audits</strong> — working with catering suppliers to improve the nutritional quality of on-site food</li>
      </ul>
      <h2>Getting Started</h2>
      <p>Our registered dietitian offers individual consultations at our Acacia Centre clinic and on-site group sessions for corporate clients. Programs can be tailored to the specific health challenges of your workforce — whether that's managing hypertension and diabetes risk, supporting physically demanding roles, or addressing fatigue and energy management.</p>
      <p>Contact us to discuss a nutrition program for your organisation.</p>
    `,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Compliance: "bg-blue-100 text-blue-700",
  Wellness:   "bg-emerald-100 text-emerald-700",
  Services:   "bg-indigo-100 text-indigo-700",
  Safety:     "bg-amber-100 text-amber-700",
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero image */}
      <div className="relative h-64 md:h-96 w-full bg-slate-200">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Article */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">

          {/* Back link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? "bg-slate-100 text-slate-600"}`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-400">
              <CalendarDays className="w-4 h-4" />
              {formatDate(article.date)}
            </span>
            <span className="text-sm text-slate-400">{article.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug mb-8">
            {article.title}
          </h1>

          {/* Body */}
          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-li:text-slate-700 prose-li:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* CTA */}
          <div className="mt-14 bg-blue-600 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Need occupational health services?</h2>
            <p className="text-blue-100 mb-6">
              Book an appointment at Adena OSH Center — DOSHS-recognised, based in Mombasa.
            </p>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 px-8 py-3.5 rounded-full font-semibold transition-colors"
            >
              Book an Appointment
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">More Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/news/${a.slug}`}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative aspect-[16/9]">
                    <Image src={a.image} alt={a.title} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full self-start mb-3 ${CATEGORY_COLORS[a.category] ?? "bg-slate-100 text-slate-600"}`}>
                      {a.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors flex-1">
                      {a.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-slate-400">{formatDate(a.date)}</span>
                      <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
