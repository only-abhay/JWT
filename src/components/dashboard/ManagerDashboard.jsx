"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAuthErrorMessage,
  getCurrentUser,
  logoutUser,
} from "../../services/authService.js";

const dashboard = {
  label: "Manager",
  title: "Manager Dashboard",
  welcome: "Manage your team efficiently.",
  hero: "bg-gradient-to-r from-purple-600 to-blue-600",
  stats: [
    { label: "Team Members", value: "10", icon: "👥", color: "border-blue-500" },
    { label: "Active Projects", value: "8", icon: "📊", color: "border-green-500" },
    { label: "Pending Approvals", value: "4", icon: "⏳", color: "border-yellow-500" },
  ],
  activities: [
    ["Approved project proposal from Team A", "text-green-500"],
    ["Reviewed performance reports", "text-blue-500"],
    ["Scheduled team meeting for next week", "text-yellow-500"],
    ["Assigned new tasks to team members", "text-purple-500"],
  ],
  notice: "You can manage team members, approve requests, and oversee projects.",
  noticeTitle: "Manager Access Level:",
  noticeStyle: "border-blue-400 bg-blue-50 text-blue-700",
  roleBadge: "bg-purple-100 text-purple-700",
};

function formatRole(role) {
  return role === "customer" || role === "user" ? "User" : role;
}

function InfoItem({ label, value }) {
  return (
    <div className="flex min-h-12 items-center gap-4 border-b border-gray-200 py-3 last:border-b-0">
      <span className="w-20 shrink-0 text-sm text-gray-600">{label}</span>
      <span className="min-w-0 break-all text-sm text-gray-900">{value || "—"}</span>
    </div>
  );
}

function RoleBadge({ account }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${dashboard.roleBadge}`}>
      {formatRole(account.role)}
    </span>
  );
}

function InformationCard({ account }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-md sm:p-6">
      <h2 className="mb-3 text-lg font-bold text-gray-800">Manager Information</h2>
      <div className="divide-y divide-gray-200 text-sm text-gray-700">
        <InfoItem label="Name" value={account.name} />
        <InfoItem label="Email" value={account.email} />
        <InfoItem label="Role" value={<RoleBadge account={account} />} />
      </div>
    </section>
  );
}

function StatCard({ stat }) {
  return (
    <div className={`flex min-h-24 items-center justify-between rounded-xl border-l-4 ${stat.color} bg-white px-5 py-4 text-gray-800 shadow-md sm:px-6`}>
      <div>
        <p className="text-sm text-gray-600">{stat.label}</p>
        <p className={`mt-1 text-2xl leading-7 font-bold ${stat.positive ? "text-green-600" : ""}`}>
          {stat.value}
        </p>
      </div>
      <span className="ml-3 text-3xl" aria-hidden="true">{stat.icon}</span>
    </div>
  );
}

function ActivityCard() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-md sm:p-6">
      <h2 className="mb-3 text-lg font-bold">📝 Recent Activities</h2>
      <ul className="space-y-3">
        {dashboard.activities.map(([activity, color]) => (
          <li className="flex gap-3 text-sm leading-6" key={activity}>
            <span className={`mt-2 size-2 shrink-0 rounded-full ${color}`} aria-hidden="true" />
            {activity}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ManagerDashboard() {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadAccount() {
      try {
        const currentUser = await getCurrentUser();
        const normalizedRole = currentUser.role === "user" ? "customer" : currentUser.role;

        if (normalizedRole !== "manager") {
          router.replace(`/${normalizedRole}`);
          return;
        }

        if (isActive) {
          setAccount(currentUser);
        }
      } catch (loadError) {
        if (isActive) {
          setError(getAuthErrorMessage(loadError));
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadAccount();

    return () => {
      isActive = false;
    };
  }, [router]);

  async function handleLogout() {
    setError("");
    setIsLoggingOut(true);

    try {
      await logoutUser();
      router.replace("/login");
    } catch (logoutError) {
      setError(getAuthErrorMessage(logoutError));
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-100 px-5 font-sans">
        <p className="text-sm text-gray-600">Loading your dashboard...</p>
      </main>
    );
  }

  if (!account) {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-100 px-5 font-sans">
        <section className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
          <h1 className="text-lg font-bold text-gray-900">Unable to load dashboard</h1>
          <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
          <Link className="mt-5 inline-flex rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700" href="/login">
            Return to login
          </Link>
        </section>
      </main>
    );
  }

  const displayName = account.name || account.email;

  return (
    <div className="min-h-screen bg-gray-100 font-[Arial,Helvetica,sans-serif] text-gray-800 antialiased">
      <header className="bg-blue-700 text-white shadow-sm">
        <nav className="mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Dashboard navigation">
          <Link className="shrink-0 text-lg font-bold" href="/">JWT Auth</Link>
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden truncate text-sm sm:inline">Welcome, {displayName} ({dashboard.label})</span>
            <button className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60" disabled={isLoggingOut} onClick={handleLogout} type="button">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <section className={`rounded-xl p-6 shadow-md sm:p-8 ${dashboard.hero} text-white`}>
          <h1 className="text-2xl leading-8 font-bold sm:text-3xl">{dashboard.title}</h1>
          <p className="mt-2 text-base leading-6">Welcome, {displayName}! {dashboard.welcome}</p>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" aria-label="Dashboard statistics">
          {dashboard.stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <ActivityCard />
          <InformationCard account={account} />
        </div>

        <aside className={`mt-6 rounded-r-lg border-l-4 px-4 py-4 text-sm leading-6 ${dashboard.noticeStyle}`}>
          <span className="mr-2 text-lg" aria-hidden="true">ℹ️</span>
          <strong>{dashboard.noticeTitle}</strong> {dashboard.notice}
        </aside>

        {error && (
          <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>
        )}

      </main>
    </div>
  );
}
