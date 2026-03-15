import {
  ShieldCheck,
  Users,
  FileText,
  Database,
  Stethoscope,
  Activity,
  Presentation,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>DOSHS Recognized Center</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                Leading The Way To <span className="text-blue-600">Safer Workplaces</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                We are a locally owned and operated medical specialist center recognized by the Ministry of Labour and Social Protection&apos;s Directorate of Safety and Health Services (DOSHS) for our quality occupational safety and health services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/appointment" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium text-lg text-center transition-colors shadow-md flex items-center justify-center">
                  Book an Appointment
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="#services" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-medium text-lg text-center transition-colors shadow-sm">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <Image 
                  src="https://picsum.photos/seed/medical/800/800" 
                  alt="Medical Professionals" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-100 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative z-10">
                <Image 
                  src="https://picsum.photos/seed/clinic/800/600" 
                  alt="Adena Center Facility" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full blur-2xl -z-10" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About Adena Center</h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8" />
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We are a locally owned and operated medical specialist center recognized by the Ministry of Labour and Social Protection&apos;s Directorate of Safety and Health Services (DOSHS).
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our mission is to provide quality occupational safety and health services that promote employee wellbeing, ensure regulatory compliance, and foster safer, more productive workplaces across industries.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-700">
                  <ShieldCheck className="w-6 h-6 text-blue-600 mr-3 shrink-0" />
                  <span className="font-medium">DOSHS Recognized & Certified</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <Stethoscope className="w-6 h-6 text-blue-600 mr-3 shrink-0" />
                  <span className="font-medium">Expert Medical Professionals</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <Users className="w-6 h-6 text-blue-600 mr-3 shrink-0" />
                  <span className="font-medium">Tailored Corporate Solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="services" className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600">
              We provide comprehensive occupational health services tailored to meet your corporate needs, ensuring compliance and promoting employee wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Panel of Consultants</h3>
              <p className="text-slate-600 leading-relaxed">
                We have a diverse panel of consultants in various specialties including physicians, specialist surgeons, occupational health practitioners, nutrition, counselling, lab sciences; to meet client needs on call basis. This ensures that all cases are handled by experts, promoting employee health and productivity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Official Ministry Reports</h3>
              <p className="text-slate-600 leading-relaxed">
                We offer DOSH recognized certificates of fitness, redeployment, summary reports and other documents as needed by the client. All our documentation meets the official Ministry of Labour and Social Protection&apos;s Directorate of Safety and Health Services standards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dedicated Relationship Manager</h3>
              <p className="text-slate-600 leading-relaxed">
                We guarantee that a dedicated account manager will be assigned to each of our corporate clients for personalized support and communications at each step of the way. Your success is our priority.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Data Management</h3>
              <p className="text-slate-600 leading-relaxed">
                All medical records in our care are securely stored and shared* in digital format. We carefully analyze collected data and present it in intelligent reports for HR departments and top-level management. <br/><span className="text-sm italic mt-2 block">*Shared in accordance with national data protection guidelines.</span>
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Clinical Recommendations</h3>
              <p className="text-slate-600 leading-relaxed">
                Our occupational and wellness surveillance reports include detailed clinical recommendations and overall company health evaluations tailored for each corporate client. Our consultants personally advise management on strategies to mitigate occupational hazards, optimize human resource, increase productivity and reduce economic losses.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Targeted Follow-up</h3>
              <p className="text-slate-600 leading-relaxed">
                We conduct regular follow-up with employees diagnosed with medical conditions during screening processes. Our panel of consultants is available on demand basis to ensure continuous care and support for identified cases.
              </p>
            </div>

            {/* Feature 7 - Centered in last row if needed, or just part of grid */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1 lg:col-start-2">
              <div className="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Presentation className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Feedback Sessions & Workshops</h3>
              <p className="text-slate-600 leading-relaxed">
                At the end of each occupational wellness surveillance exercise, our team facilitates a feedback session at our client&apos;s premises, including sessions with senior management to elaborate on results, and wellness workshops with employees to promote health awareness and engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest News & Updates</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600">
              Stay informed with our latest insights on occupational health, safety guidelines, and wellness programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "New DOSHS Guidelines for 2026",
                date: "March 10, 2026",
                image: "https://picsum.photos/seed/guidelines/600/400",
                excerpt: "Learn about the latest updates to occupational safety standards and how they impact your business."
              },
              {
                title: "Importance of Regular Employee Health Screenings",
                date: "February 24, 2026",
                image: "https://picsum.photos/seed/screening/600/400",
                excerpt: "Discover why routine health checks are crucial for maintaining a productive and healthy workforce."
              },
              {
                title: "Mental Health in the Workplace",
                date: "February 15, 2026",
                image: "https://picsum.photos/seed/mentalhealth/600/400",
                excerpt: "Strategies for HR managers to support employee mental wellbeing and reduce burnout."
              }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-video relative">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-sm text-blue-600 font-semibold mb-2">{post.date}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-slate-600 mb-4 flex-1">{post.excerpt}</p>
                  <Link href="#" className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700 transition-colors mt-auto">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
