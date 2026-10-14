import { Suspense } from "react";
import OtpVerificationRoute from "../../components/auth/OtpVerificationRoute.jsx";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#22c55e_0%,#2563eb_100%)] px-5 py-8">
          <p className="text-sm text-white">Loading verification...</p>
        </main>
      }
    >
      <OtpVerificationRoute />
    </Suspense>
  );
}
