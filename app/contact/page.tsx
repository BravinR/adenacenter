"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HOURS = [
  { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
  { days: "Saturday", time: "9:00 AM – 1:00 PM" },
  { days: "Sunday & Public Holidays", time: "Closed" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Have a question about our services or want to arrange an on-site health day? Send us a message and we'll get back to you within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Contact Form */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>

              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle className="w-14 h-14 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-900">Message sent!</h3>
                  <p className="text-slate-500 max-w-sm">
                    Thank you for reaching out. We'll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === "error" && (
                    <div className="flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl px-4 py-3 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="jane@companycom"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help…"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-semibold text-base transition-colors disabled:opacity-60 shadow-sm"
                  >
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-8">

              {/* Contact details */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Details</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <p className="text-slate-600 text-sm mt-0.5">Acacia Centre, Nyerere Avenue<br />Mombasa, Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <a href="tel:+254708775657" className="text-blue-600 hover:underline text-sm mt-0.5 block">
                        +254 708 775 657
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <a href="mailto:info@adenaoshcentre.com" className="text-blue-600 hover:underline text-sm mt-0.5 block">
                        info@adenaoshcentre.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Opening Hours</h2>
                </div>
                <div className="space-y-3">
                  {HOURS.map((h) => (
                    <div key={h.days} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-700 font-medium text-sm">{h.days}</span>
                      <span className={`text-sm font-semibold ${h.time === "Closed" ? "text-rose-500" : "text-slate-900"}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 h-64">
                <iframe
                  title="Adena OSH Center location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7!2d39.6683!3d-4.0435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012f3bce81b9b%3A0x7c0d67e9b7e7e7e7!2sAcacia%20Centre%2C%20Nyerere%20Ave%2C%20Mombasa!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
