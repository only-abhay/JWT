export default function AuthPageShell({ children, className = "", variant }) {
  const background =
    variant === "register"
      ? "bg-[linear-gradient(135deg,#22c55e_0%,#2563eb_100%)]"
      : "bg-[linear-gradient(135deg,#3b82f6_0%,#9333ea_100%)]";

  return (
    <main
      className={`grid min-h-screen place-items-center px-5 py-8 [font-family:Arial,Helvetica,sans-serif] antialiased ${background}`}
    >
      <section
        className={`w-full max-w-[400px] rounded-xl bg-white px-7 pt-7 pb-5 shadow-xl ${className}`}
      >
        {children}
      </section>
    </main>
  );
}
