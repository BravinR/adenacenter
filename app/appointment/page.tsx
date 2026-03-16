"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone, Mail, MapPin, Clock,
  CheckCircle, ChevronRight, CalendarDays, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SERVICES = [
  "Pre-employment Medical Screening",
  "Periodic Occupational Health Surveillance",
  "Wellness Program",
  "DOSHS Fitness Certificate",
  "Specialist Consultation",
  "Counselling / Mental Health",
  "Nutrition Services",
  "Feedback Session / Workshop",
  "Other",
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step1 = { fullName: string; phone: string; email: string; company: string };
type Step2 = { service: string; date: string; time: string; notes: string };
type Errors<T> = Partial<Record<keyof T, string>>;

const EMPTY_STEP1: Step1 = { fullName: "", phone: "", email: "", company: "" };
const EMPTY_STEP2: Step2 = { service: "", date: "", time: "", notes: "" };

// ---------------------------------------------------------------------------
// Funnel helper — fire-and-forget, never blocks the user
// ---------------------------------------------------------------------------

async function trackFunnel(sessionId: string, step: number, event: "viewed" | "completed") {
  try {
    await fetch("/api/funnel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, step, event }),
    });
  } catch {
    // silently ignore — analytics must never break the booking flow
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AppointmentPage() {
  const sessionId = useRef<string>("");
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [step1, setStep1] = useState<Step1>(EMPTY_STEP1);
  const [step2, setStep2] = useState<Step2>(EMPTY_STEP2);
  const [step1Errors, setStep1Errors] = useState<Errors<Step1>>({});
  const [step2Errors, setStep2Errors] = useState<Errors<Step2>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Generate session ID and track step 1 view once on mount
  useEffect(() => {
    sessionId.current = crypto.randomUUID();
    trackFunnel(sessionId.current, 1, "viewed");
  }, []);

  // Track step 2 view when user advances
  useEffect(() => {
    if (currentStep === 2) {
      trackFunnel(sessionId.current, 2, "viewed");
    }
  }, [currentStep]);

  // -------------------------------------------------------------------------
  // Step 1 — validation & navigation
  // -------------------------------------------------------------------------

  function validateStep1(): boolean {
    const errors: Errors<Step1> = {};
    if (!step1.fullName.trim()) errors.fullName = "Full name is required.";
    if (!step1.phone.trim()) errors.phone = "Phone number is required.";
    if (step1.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) {
      errors.email = "Enter a valid email address.";
    }
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleStep1Continue() {
    if (!validateStep1()) return;
    trackFunnel(sessionId.current, 1, "completed");
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // -------------------------------------------------------------------------
  // Step 2 — validation & submit
  // -------------------------------------------------------------------------

  function validateStep2(): boolean {
    const errors: Errors<Step2> = {};
    if (!step2.service) errors.service = "Please select a service.";
    if (!step2.date) errors.date = "Please select a preferred date.";
    if (!step2.time) errors.time = "Please select a preferred time.";
    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: step1.fullName,
          email: step1.email,
          phone: step1.phone,
          company: step1.company,
          service: step2.service,
          preferredDate: step2.date,
          preferredTime: step2.time,
          notes: step2.notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      trackFunnel(sessionId.current, 2, "completed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setStep1(EMPTY_STEP1);
    setStep2(EMPTY_STEP2);
    setStep1Errors({});
    setStep2Errors({});
    setApiError(null);
    setSubmitted(false);
    setCurrentStep(1);
    sessionId.current = crypto.randomUUID();
    trackFunnel(sessionId.current, 1, "viewed");
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Page Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800 font-medium">Make Appointment</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarDays className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Make an Appointment</h1>
              <p className="text-slate-500 mt-1">
                {submitted
                  ? "Your request has been submitted."
                  : "Fill in your details and we will confirm your booking within 24 hours."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2">
              {submitted ? (
                <SuccessMessage
                  fullName={step1.fullName}
                  phone={step1.phone}
                  email={step1.email}
                  service={step2.service}
                  date={step2.date}
                  time={step2.time}
                  onReset={handleReset}
                />
              ) : (
                <>
                  {/* Step indicator */}
                  {!submitted && <StepIndicator current={currentStep} />}

                  {currentStep === 1 && (
                    <Step1Form
                      data={step1}
                      errors={step1Errors}
                      onChange={(field, value) => {
                        setStep1(prev => ({ ...prev, [field]: value }));
                        if (step1Errors[field]) setStep1Errors(prev => ({ ...prev, [field]: undefined }));
                      }}
                      onContinue={handleStep1Continue}
                    />
                  )}

                  {currentStep === 2 && (
                    <Step2Form
                      data={step2}
                      errors={step2Errors}
                      today={today}
                      isLoading={isLoading}
                      apiError={apiError}
                      onChange={(field, value) => {
                        setStep2(prev => ({ ...prev, [field]: value }));
                        if (step2Errors[field]) setStep2Errors(prev => ({ ...prev, [field]: undefined }));
                      }}
                      onBack={() => {
                        setCurrentStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      onSubmit={handleSubmit}
                    />
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <ContactCard />
              <HoursCard />
              <NextStepsCard />
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step Indicator
// ---------------------------------------------------------------------------

function StepIndicator({ current }: { current: 1 | 2 }) {
  const steps = ["Personal Information", "Appointment Details"];
  return (
    <div className="flex items-center mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div className={[
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
                isDone ? "bg-emerald-500 text-white" :
                isActive ? "bg-blue-600 text-white" :
                "bg-slate-200 text-slate-500",
              ].join(" ")}>
                {isDone ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </div>
              <span className={[
                "text-sm font-medium hidden sm:block",
                isActive ? "text-slate-900" : "text-slate-400",
              ].join(" ")}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={[
                "flex-1 h-0.5 mx-4",
                isDone ? "bg-emerald-400" : "bg-slate-200",
              ].join(" ")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Personal Information
// ---------------------------------------------------------------------------

function Step1Form({
  data, errors, onChange, onContinue,
}: {
  data: Step1;
  errors: Errors<Step1>;
  onChange: (field: keyof Step1, value: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Personal Information</h2>
      <p className="text-sm text-slate-500 mb-8">Tell us who you are so we can reach you.</p>

      <div className="space-y-6">
        <Field label="Full Name" required error={errors.fullName}>
          <input
            type="text"
            value={data.fullName}
            onChange={e => onChange("fullName", e.target.value)}
            placeholder="Jane Doe"
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          <input
            type="tel"
            value={data.phone}
            onChange={e => onChange("phone", e.target.value)}
            placeholder="+254 700 000 000"
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <Field label="Email Address" hint="Optional" error={errors.email}>
          <input
            type="email"
            value={data.email}
            onChange={e => onChange("email", e.target.value)}
            placeholder="jane@example.com"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Company / Organisation" hint="Optional — for corporate bookings">
          <input
            type="text"
            value={data.company}
            onChange={e => onChange("company", e.target.value)}
            placeholder="ABC Ltd."
            className={inputClass(false)}
          />
        </Field>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Appointment Details
// ---------------------------------------------------------------------------

function Step2Form({
  data, errors, today, isLoading, apiError, onChange, onBack, onSubmit,
}: {
  data: Step2;
  errors: Errors<Step2>;
  today: string;
  isLoading: boolean;
  apiError: string | null;
  onChange: (field: keyof Step2, value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Appointment Details</h2>
      <p className="text-sm text-slate-500 mb-8">Tell us what you need and when works for you.</p>

      <div className="space-y-6">
        <Field label="Service Required" required error={errors.service}>
          <select
            value={data.service}
            onChange={e => onChange("service", e.target.value)}
            className={inputClass(!!errors.service)}
          >
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Preferred Date" required error={errors.date}>
            <input
              type="date"
              value={data.date}
              onChange={e => onChange("date", e.target.value)}
              min={today}
              className={inputClass(!!errors.date)}
            />
          </Field>

          <Field label="Preferred Time" required error={errors.time}>
            <select
              value={data.time}
              onChange={e => onChange("time", e.target.value)}
              className={inputClass(!!errors.time)}
            >
              <option value="">Select a time…</option>
              {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Additional Notes" hint="Optional">
          <textarea
            value={data.notes}
            onChange={e => onChange("notes", e.target.value)}
            rows={4}
            placeholder="Any specific requirements, medical history, or questions for our team…"
            className={`${inputClass(false)} resize-none`}
          />
        </Field>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        By submitting you agree to our{" "}
        <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        Information is handled per the Kenya Data Protection Act.
      </p>

      {apiError && (
        <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
          {apiError}
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Request Appointment
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Success
// ---------------------------------------------------------------------------

function SuccessMessage({
  fullName, phone, email, service, date, time, onReset,
}: {
  fullName: string; phone: string; email: string;
  service: string; date: string; time: string;
  onReset: () => void;
}) {
  const formattedDate = (() => {
    try {
      return new Date(date).toLocaleDateString("en-KE", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });
    } catch {
      return date;
    }
  })();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Appointment Requested!</h2>
      <p className="text-slate-600 max-w-md mb-2">
        Thank you, <span className="font-semibold">{fullName}</span>. We have received your request for a{" "}
        <span className="font-semibold">{service}</span> on{" "}
        <span className="font-semibold">{formattedDate}</span> at{" "}
        <span className="font-semibold">{time}</span>.
      </p>
      <p className="text-slate-500 text-sm mb-8">
        Our team will contact you at <span className="font-medium">{phone}</span>
        {email && <> or <span className="font-medium">{email}</span></>} within 24 hours to confirm.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-full font-medium transition-colors">
          Back to Home
        </Link>
        <button
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar cards
// ---------------------------------------------------------------------------

function ContactCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Us Directly</h3>
      <ul className="space-y-5">
        {[
          { icon: Phone, label: "Phone", content: <a href="tel:+254708775657" className="text-slate-800 font-semibold hover:text-blue-600 transition-colors">0708775657</a> },
          { icon: Mail, label: "Email", content: <a href="mailto:info@adenaoshcentre.com" className="text-slate-800 font-semibold hover:text-blue-600 transition-colors break-all">info@adenaoshcentre.com</a> },
          { icon: MapPin, label: "Location", content: <p className="text-slate-800 font-semibold">Acacia Centre, Nyerere Avenue, Mombasa</p> },
        ].map(({ icon: Icon, label, content }) => (
          <li key={label} className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
              {content}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HoursCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-900">Opening Hours</h3>
      </div>
      <ul className="space-y-3 text-sm">
        {[
          { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM", closed: false },
          { day: "Saturday", hours: "9:00 AM – 1:00 PM", closed: false },
          { day: "Sunday", hours: "Closed", closed: true },
        ].map(({ day, hours, closed }) => (
          <li key={day} className="flex justify-between border-b last:border-0 border-slate-100 pb-3 last:pb-0">
            <span className="text-slate-600">{day}</span>
            <span className={closed ? "font-semibold text-rose-500" : "font-semibold text-slate-900"}>{hours}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NextStepsCard() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
      <h3 className="text-sm font-bold text-blue-900 mb-3">What happens next?</h3>
      <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
        <li>We receive your request</li>
        <li>Our team confirms availability within 24 hours</li>
        <li>You receive confirmation via phone or email</li>
        <li>Attend your appointment at our Mombasa clinic</li>
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

function inputClass(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition",
    hasError
      ? "border-rose-400 bg-rose-50"
      : "border-slate-200 bg-white hover:border-slate-300",
  ].join(" ");
}

function Field({
  label, required, hint, error, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
        {hint && <span className="text-slate-400 font-normal ml-2 text-xs">{hint}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
