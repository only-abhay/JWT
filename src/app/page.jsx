import Link from "next/link";

const features = [
  "Secure JWT token-based authentication",
  "Three role levels: User, Manager, and Admin",
  "Protected routes with role-based authorization",
  "Responsive design with Tailwind CSS",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#3b82f6_0%,#9333ea_100%)] [font-family:Arial,Helvetica,sans-serif] antialiased">
      <header className="h-[66px] bg-[#2563eb]">
        <nav
          className="mx-auto flex h-full w-[calc(100%-3rem)] max-w-[1276px] items-center justify-between max-sm:w-[calc(100%-2rem)]"
          aria-label="Main navigation"
        >
          <Link
            className="text-2xl font-bold text-white max-sm:text-[21px]"
            href="/"
          >
            JWT Auth
          </Link>
          <div className="flex items-center gap-4 max-sm:gap-2">
            <Link
              className="inline-flex min-h-[42px] items-center justify-center rounded-[7px] bg-white px-[18px] text-base font-normal text-[#2563eb] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-gray-100 max-sm:min-h-[38px] max-sm:px-3"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex min-h-[42px] items-center justify-center rounded-[7px] bg-[#20c55a] px-[18px] text-base font-normal text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-green-600 max-sm:min-h-[38px] max-sm:px-3"
              href="/register"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      <main className="px-6 pb-[66px] pt-[132px] text-center max-sm:px-5 max-sm:pb-12 max-sm:pt-[90px]">
        <h1 className="m-0 text-[64px] leading-[1.2] font-bold text-white max-sm:text-[clamp(38px,9vw,54px)]">
          JWT Authentication System
        </h1>
        <p className="mt-4 mb-8 text-[26px] leading-[1.25] text-white max-sm:mt-[14px] max-sm:text-xl">
          Role-Based Access Control with MERN Stack
        </p>

        <section
          className="mx-auto w-full max-w-[814px] rounded-[9px] bg-white px-8 pt-9 pb-[23px] text-left max-sm:p-[28px_22px]"
          aria-labelledby="features-title"
        >
          <h2
            id="features-title"
            className="mt-0 mb-[14px] text-center text-2xl leading-[1.25] font-bold text-gray-800"
          >
            Features
          </h2>
          <ul className="m-0 list-none p-0">
            {features.map((feature) => (
              <li
                className="flex min-h-[38px] items-center gap-[9px] text-base leading-6 max-sm:items-start max-sm:py-[7px]"
                key={feature}
              >
                <span
                  className="shrink-0 text-[19px] text-[#20c55a]"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 flex items-center justify-center gap-4 max-sm:gap-3">
          <Link
            className="inline-flex min-h-[54px] items-center justify-center rounded-[9px] bg-white px-8 text-lg font-semibold text-[#2563eb] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-gray-100 max-sm:px-6"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="inline-flex min-h-[54px] items-center justify-center rounded-[9px] bg-[#20c55a] px-8 text-lg font-semibold text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-green-600 max-sm:px-6"
            href="/register"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
