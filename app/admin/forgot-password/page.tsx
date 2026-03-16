"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/admin/reset-password",
    });

    setIsLoading(false);

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10">

          <div className="flex flex-col items-center mb-10">
            <Logo className="h-10 w-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-900">
              {submitted ? "Check your email" : "Forgot password?"}
            </h1>
            <p className="text-slate-500 text-sm mt-2 text-center">
              {submitted
                ? `We sent a reset link to ${email}`
                : "Enter your email and we'll send you a reset link."}
            </p>
          </div>

          {submitted ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <p className="text-sm text-slate-500 text-center">
                  The link expires in <strong>1 hour</strong>. Check your spam folder if you don't see it.
                </p>
              </div>
              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@adenaoshcentre.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition hover:border-slate-300"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending…
                  </>
                ) : "Send reset link"}
              </button>

              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
