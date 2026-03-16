import Link from "next/link";
import {
  ShieldCheck, Activity, FileText, Stethoscope,
  Brain, Apple, Presentation, Users, ChevronRight, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive occupational health & safety services — from pre-employment screening to wellness programs, DOSHS certifications, and mental health support.",
};

const SERVICES = [
  {
    icon: <Stethoscope className="w-7 h-7" />,
    title: "Pre-Employment Medical Screening",
    description:
      "Thorough baseline health assessments to establish fitness for duty before onboarding. Includes physical examination, laboratory tests, audiometry, spirometry, and vision screening. Reports are produced in DOSHS-accepted formats.",
    cta: "Book Screening",
  },
  {
    icon: <Activity className="w-7 h-7" />,
    title: "Periodic Occupational Health Surveillance",
    description:
      "Scheduled monitoring programs for employees exposed to workplace hazards such as dust, chemicals, noise, or ergonomic stress. Identifies early signs of occupational disease and informs management controls.",
    cta: "Schedule Surveillance",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Wellness Programs",
    description:
      "Holistic workplace wellness initiatives covering lifestyle assessments, chronic-disease screening (hypertension, diabetes), biometric checks, and targeted health campaigns tailored to your workforce.",
    cta: "Explore Wellness",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "DOSHS Fitness Certificates & Official Reports",
    description:
      "As a DOSHS-recognized center we issue legally valid fitness certificates and occupational health reports required for regulatory compliance, tenders, and permit renewals across Kenyan industries.",
    cta: "Get Certified",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Clinical Consultations",
    description:
      "Access to an expert specialist panel including occupational medicine physicians, general practitioners, and referral pathways to orthopedic, dermatology, and ENT consultants.",
    cta: "Book Consultation",
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Counselling & Mental Health",
    description:
      "Confidential counselling services for employees dealing with workplace stress, trauma, burnout, or personal challenges. Group resilience workshops and EAP (Employee Assistance Program) support available.",
    cta: "Get Support",
  },
  {
    icon: <Apple className="w-7 h-7" />,
    title: "Nutrition Services",
    description:
      "Registered dietitians provide individual nutritional assessments, dietary counselling, and corporate nutrition education programs that improve energy, productivity, and long-term health outcomes.",
    cta: "Book Nutritionist",
  },
  {
    icon: <Presentation className="w-7 h-7" />,
    title: "Feedback Sessions & Workshops",
    description:
      "Post-surveillance feedback sessions for both employers and employees, plus customised OSH workshops covering first aid, manual handling, ergonomics, and health-risk communication.",
    cta: "Book Workshop",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              DOSHS Recognized Services
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Occupational Health Services <span className="text-blue-600">Built for Your Workforce</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              From pre-employment screening to ongoing wellness programs, our comprehensive suite of services keeps your team healthy, compliant, and productive.
            </p>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors shadow-md"
            >
              Book an Appointment
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Each service is delivered by qualified health professionals and tailored to meet Kenyan regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{s.description}</p>
                </div>
                <Link
                  href={`/appointment?service=${encodeURIComponent(s.title)}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors self-start"
                >
                  {s.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to protect your workforce?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Book an appointment today and let our specialists design an occupational health plan that fits your organisation.
          </p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-md"
          >
            Book Now
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
