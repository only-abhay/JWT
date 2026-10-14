"use client";

import Link from "next/link";
import { useState } from "react";
import AuthFeedback from "./AuthFeedback.jsx";
import AuthPageShell from "./AuthPageShell.jsx";
import {
  getAuthErrorMessage,
  verifyOtp,
} from "../../services/authService.js";

export default function OtpVerificationForm({ email }) {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const result = await verifyOtp(email, otp);
      setMessage(result.message);
      setIsVerified(true);
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell className="max-w-[448px] px-8 py-8 sm:px-10" variant="register">
      <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600">
        <svg
          aria-hidden="true"
          className="size-8"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
          <path
            d="m4.5 6 7.5 6L19.5 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      </div>

      <h1 className="text-center text-[28px] leading-9 font-bold text-gray-800">
        Check your email
      </h1>

      {isVerified ? (
        <div className="mt-5 text-center">
          <p
            className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
            role="status"
          >
            {message}
          </p>
          <Link
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            href="/login"
          >
            Continue to login
          </Link>
        </div>
      ) : email ? (
        <>
          <p className="mt-3 text-center text-sm leading-6 text-gray-600">
            We sent a one-time verification code to
          </p>
          <p className="mt-1 break-all text-center text-base font-semibold text-gray-900">
            {email}
          </p>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="mb-2 block text-center text-sm font-medium text-gray-700"
                htmlFor="otp"
              >
                Enter your 6-digit code
              </label>
              <input
                autoComplete="one-time-code"
                className="h-14 w-full rounded-lg border border-gray-300 px-4 text-center text-2xl font-semibold tracking-[0.65em] text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                id="otp"
                inputMode="numeric"
                maxLength={6}
                name="otp"
                onChange={(event) => {
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                pattern="[0-9]{6}"
                placeholder="••••••"
                required
                type="text"
                value={otp}
              />
            </div>
            <AuthFeedback error={error} />
            <button
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-600 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Verifying..." : "Verify email"}
            </button>
          </form>
          <p className="mt-5 text-center text-xs leading-5 text-gray-500">
            The code expires in 10 minutes. If you don&apos;t see the email, check
            your spam or junk folder.
          </p>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-5 mt-5 text-sm text-red-600" role="alert">
            An email address is required to verify your account.
          </p>
          <Link className="font-semibold text-green-600" href="/register">
            Return to registration
          </Link>
        </div>
      )}

      {!isVerified && (
        <p className="mt-6 border-t border-gray-100 pt-5 text-center text-sm text-gray-500">
          Already verified?{" "}
          <Link
            className="font-semibold text-green-600"
            href="/login"
          >
            Login here
          </Link>
        </p>
      )}
    </AuthPageShell>
  );
}
