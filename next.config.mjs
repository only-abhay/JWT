/** @type {import('next').NextConfig} */
const authApiUrl = (
  process.env.AUTH_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://nestro-backend-5ghj.onrender.com"
    : "http://localhost:5000")
).replace(/\/$/, "");

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${authApiUrl}/:path*`,
      },
    ];
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
