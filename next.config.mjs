/** @type {import('next').NextConfig} */
const authApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://jwt-backend-h1xe.onrender.com"
    : (process.env.AUTH_API_URL || "http://localhost:5000").replace(/\/$/, "");

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
