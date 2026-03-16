"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlError = searchParams.get("error");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (urlError === "INVALID_TOKEN") {
      setError("This reset link is invalid or has expired. Please request a new one.");
    } else if (!token) {
      setError("Missing reset token. Please request a new link.");
    }
  }, [token, urlError]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing reset token. Please request a new link.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    const { error } = await authClient.resetPassword({ newPassword, token });

    setIsLoading(false);

    if (error) {
      setError(error.message ?? "Failed to reset password. The link may have expired.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/login"), 3000);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-4 space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Password reset!</h2>
          <p className="text-sm text-slate-500 mt-1">Redirecting you to sign in…</p>
        </div>
      </div>
    );
  }

  // Invalid / missing token — show error state, not the form
  if (urlError || !token) {
    return (
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Link invalid or expired</h2>
          <p className="text-sm text-slate-500 mt-2">
            This password reset link has expired or already been used. Reset links are valid for 1 hour.
          </p>
        </div>
        <Link
          href="/admin/forgot-password"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-semibold transition-colors text-center text-sm"
        >
          Request a new link
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center justify-center gap-2 w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          New password
        </label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
            disabled={!token}
            className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowNew(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Confirm new password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Repeat new password"
          required
          disabled={!token}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
        />
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !token}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Resetting…
          </>
        ) : "Reset password"}
      </button>

      <Link
        href="/admin/login"
        className="flex items-center justify-center gap-2 w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sign in
      </Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10">
          <div className="flex flex-col items-center mb-10">
            <Logo className="h-10 w-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-900">Set new password</h1>
            <p className="text-slate-500 text-sm mt-2 text-center">
              Choose a strong password for your admin account.
            </p>
          </div>
          {/* useSearchParams requires Suspense */}
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-400 text-sm">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
