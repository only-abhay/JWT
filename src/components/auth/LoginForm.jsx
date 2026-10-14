"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthField from "./AuthField.jsx";
import AuthFeedback from "./AuthFeedback.jsx";
import AuthPageShell from "./AuthPageShell.jsx";
import {
  getAuthErrorMessage,
  loginUser,
} from "../../services/authService.js";

function getDashboardRoute(role) {
  const normalizedRole = role === "user" ? "customer" : role;
  return ["admin", "manager", "customer"].includes(normalizedRole)
    ? `/${normalizedRole}`
    : "/customer";
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const result = await loginUser(form);
      if (result.success) {
        const route = getDashboardRoute(result.data?.role);
        router.replace(route);
      }
      setMessage(result.message);
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell variant="login">
      <h1 className="mb-7 text-center text-[28px] leading-9 font-bold text-gray-800">
        Login
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthField
          autoComplete="email"
          id="email"
          label="Email Address"
          name="email"
          onChange={updateField}
          placeholder="Enter your email"
          type="email"
          value={form.email}
        />
        <AuthField
          autoComplete="current-password"
          id="password"
          label="Password"
          name="password"
          onChange={updateField}
          placeholder="Enter your password"
          type="password"
          value={form.password}
        />
        <AuthFeedback error={error} message={message} />
        <button
          className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Please wait..." : "Login"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold text-blue-600" href="/register">
          Register here
        </Link>
      </p>
    </AuthPageShell>
  );
}
