"use client";

import { useSearchParams } from "next/navigation";
import OtpVerificationForm from "./OtpVerificationForm.jsx";

export default function OtpVerificationRoute() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return <OtpVerificationForm email={email} />;
}
