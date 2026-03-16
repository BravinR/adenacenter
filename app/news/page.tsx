import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Resources",
  description:
    "Stay up to date with occupational health news, workplace safety tips, and regulatory updates from Adena OSH Center.",
};

const ARTICLES = [
  {
    slug: "understanding-doshs-fitness-certificates",
    title: "Understanding DOSHS Fitness Certificates: What Employers Need to Know",
    excerpt:
      "DOSHS fitness certificates are a legal requirement for employees in hazardous industries. We break down who needs them, the process, and how Adena Center can help your organisation stay compliant.",
    date: "2025-10-14",
    category: "Compliance",
    image: "https://picsum.photos/seed/news1/800/500",
    readTime: "5 min read",
  },
  {
    slug: "mental-health-workplace-kenya",
    title: "Mental Health in the Kenyan Workplace: Breaking the Silence",
    excerpt:
      "Workplace mental health is increasingly recognised as a key driver of productivity and retention. Learn how our counselling and EAP programs are helping Coast-region employers support their teams.",
    date: "2025-09-22",
    category: "Wellness",
    image: "https://picsum.photos/seed/news2/800/500",
    readTime: "6 min read",
  },
  {
    slug: "pre-employment-medical-guide",
    title: "A Complete Guide to Pre-Employment Medical Screening in Kenya",
    excerpt:
      "What tests are included, what conditions are assessed, and what the results mean for hiring decisions — a plain-language guide for HR professionals.",
    date: "2025-08-30",
    category: "Services",
    image: "https://picsum.photos/seed/news3/800/500",
    readTime: "7 min read",
  },
  {
    slug: "heat-stress-coastal-workers",
    title: "Heat Stress Among Coastal Workers: Risks, Recognition, and Prevention",
    excerpt:
      "Working on the Kenyan coast presents unique heat-related health challenges. This article outlines the clinical indicators of heat stress and practical controls employers can implement.",
    date: "2025-07-10",
    category: "Safety",
    image: "https://picsum.photos/seed/news4/800/500",
    readTime: "5 min read",
  },
  {
    slug: "noise-induced-hearing-loss-prevention",
    title: "Noise-Induced Hearing Loss: Prevention Starts with Audiometry",
    excerpt:
      "Occupational hearing loss is largely preventable. Discover how periodic audiometric surveillance can detect early deterioration and what control measures are most effective.",
    date: "2025-06-05",
    category: "Services",
    image: "https://picsum.photos/seed/news5/800/500",
    readTime: "4 min read",
  },
  {
    slug: "workplace-nutrition-productivity",
    title: "How Workplace Nutrition Programs Boost Productivity and Cut Sick Days",
    excerpt:
      "Nutrition is one of the most under-utilised levers in occupational health. We share data from corporate nutrition initiatives and practical steps for getting started.",
    date: "2025-05-18",
    category: "Wellness",
    image: "https://picsum.photos/seed/news6/800/500",
    readTime: "5 min read",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Compliance: "bg-blue-100 text-blue-700",
  Wellness:   "bg-emerald-100 text-emerald-700",
  Services:   "bg-indigo-100 text-indigo-700",
  Safety:     "bg-amber-100 text-amber-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function NewsPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              News & <span className="text-blue-600">Resources</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Occupational health insights, workplace safety guidance, and regulatory updates from the Adena OSH Center team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <Link
            href={`/news/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-8 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[16/9] md:aspect-auto min-h-[220px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category]}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-slate-400">{featured.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(featured.date)}
                </div>
                <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article grid */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category]}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDate(article.date)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-xs group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to protect your team?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Book an occupational health assessment today and keep your workforce healthy and compliant.
          </p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-md"
          >
            Book an Appointment
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
