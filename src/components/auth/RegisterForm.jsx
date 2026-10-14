"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthField, { labelClassName } from "./AuthField.jsx";
import AuthFeedback from "./AuthFeedback.jsx";
import AuthPageShell from "./AuthPageShell.jsx";
import {
  getAuthErrorMessage,
  registerUser,
} from "../../services/authService.js";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell variant="register">
      <h1 className="mb-6 text-center text-[28px] leading-9 font-bold text-gray-800">
        Register
      </h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthField
          autoComplete="name"
          id="name"
          label="Full Name"
          name="name"
          onChange={updateField}
          placeholder="Enter your name"
          register
          value={form.name}
        />
        <AuthField
          autoComplete="email"
          id="email"
          label="Email Address"
          name="email"
          onChange={updateField}
          placeholder="Enter your email"
          register
          type="email"
          value={form.email}
        />
        <AuthField
          autoComplete="new-password"
          id="password"
          label="Password"
          name="password"
          onChange={updateField}
          placeholder="Enter your password"
          register
          type="password"
          value={form.password}
        />
        <AuthField
          autoComplete="new-password"
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          onChange={updateField}
          placeholder="Confirm your password"
          register
          type="password"
          value={form.confirmPassword}
        />
        <div>
          <label className={labelClassName} htmlFor="role">
            Role
          </label>
          <select
            className="mt-2 h-[38px] w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="role"
            name="role"
            onChange={updateField}
            value={form.role}
          >
            <option value="customer">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <AuthFeedback error={error} />
        <button
          className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-600 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Please wait..." : "Register"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link className="font-semibold text-green-600" href="/login">
          Login here
        </Link>
      </p>
    </AuthPageShell>
  );
}
