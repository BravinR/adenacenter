import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck, Stethoscope, Heart, Award, Users, Building2, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Adena OSH Center — our mission, vision, founding story, DOSHS recognition, and the specialists behind Kenya's leading occupational health center.",
};

const STATS = [
  { value: "500+", label: "Companies Served" },
  { value: "10,000+", label: "Employees Screened" },
  { value: "5+", label: "Years in Operation" },
  { value: "100%", label: "DOSHS Compliant Reports" },
];

const TEAM = [
  {
    name: "Dr. Adena Mwangi",
    role: "Medical Director & Occupational Physician",
    image: "https://picsum.photos/seed/doc1/400/400",
  },
  {
    name: "Dr. Fatuma Ali",
    role: "General Practitioner",
    image: "https://picsum.photos/seed/doc2/400/400",
  },
  {
    name: "Ms. Grace Otieno",
    role: "Registered Dietitian & Nutritionist",
    image: "https://picsum.photos/seed/doc3/400/400",
  },
  {
    name: "Mr. James Kariuki",
    role: "Occupational Health Nurse",
    image: "https://picsum.photos/seed/doc4/400/400",
  },
];

const VALUES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Integrity",
    description: "We uphold strict ethical standards in every assessment, report, and patient interaction.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Compassion",
    description: "Every employee who walks through our doors is treated with empathy, dignity, and respect.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence",
    description: "Our clinical and administrative processes meet or exceed DOSHS and international OSH standards.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaboration",
    description: "We work closely with HR teams, safety officers, and management to deliver actionable insights.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                <Building2 className="w-4 h-4" />
                Mombasa, Kenya
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                About <span className="text-blue-600">Adena OSH Center</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We are a locally owned and operated medical specialist center recognized by the Ministry of Labour and Social Protection's Directorate of Occupational Safety and Health Services (DOSHS) for our quality occupational safety and health services.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Based at Acacia Centre, Nyerere Avenue, Mombasa, we serve corporates, SMEs, and individuals across the Coast region — helping organisations build healthier, safer, and more compliant workplaces.
              </p>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <Image
                  src="https://picsum.photos/seed/clinic2/800/600"
                  alt="Adena OSH Center facility"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-blue-600">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold mb-2">{s.value}</p>
                <p className="text-blue-100 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-blue-50 rounded-3xl p-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                To provide accessible, high-quality occupational health and safety services that protect employees, support regulatory compliance, and enable organisations to build safer, more productive workplaces.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-3xl p-10">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                To be the most trusted occupational health center in the Coast region — a benchmark for clinical excellence, regulatory compliance, and employee wellbeing across all industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative z-10">
                <Image
                  src="https://picsum.photos/seed/team5/800/600"
                  alt="Our story"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full blur-2xl -z-10" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Story</h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8" />
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                Adena OSH Center was founded with a clear purpose: to fill a critical gap in accessible, professional occupational health services along the Kenyan coast. Our founders — occupational health clinicians with decades of experience — saw firsthand how preventable workplace illness and injury were undermining both employee wellbeing and business productivity.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                From our first clinic day at Acacia Centre, we committed to the same standard of care for every client — whether a small fishing cooperative or a major port operator. That commitment, combined with our DOSHS recognition, quickly earned the trust of hundreds of organisations across the region.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Today, our multidisciplinary team delivers the full spectrum of OSH services — from pre-employment medicals and fitness certificates to mental health programs and post-accident rehabilitation — all under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-slate-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto mb-6" />
            <p className="text-slate-500 max-w-xl mx-auto">
              Our multidisciplinary team brings together physicians, nurses, dietitians, and counsellors — all with specialist OSH training.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 text-center">
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <p className="font-bold text-slate-900">{member.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Work with our team</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Discuss your organisation's occupational health needs with a specialist today.
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
