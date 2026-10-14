# Nestro frontend

## Run locally

1. Start the backend using the instructions in `../backend/README.md`.
2. Install frontend dependencies with `npm install`.
3. Start Next.js with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

The `/api` route is proxied to `http://localhost:5000` during local development. No frontend environment variable is required for the default local setup. If the backend runs on a different local URL, set `AUTH_API_URL` in `my-app/.env.local`. Production always uses the verified `https://jwt-backend-h1xe.onrender.com` backend, so a stale Vercel `AUTH_API_URL` value cannot redirect API traffic to the wrong service.

## Deploy to Vercel

- Set the Vercel project root directory to `my-app`.
- Redeploy the frontend after deploying this configuration.

Authentication requests use the same-origin `/api` proxy. This lets the browser store the HTTP-only authentication cookie on the frontend domain while Next.js forwards API requests to the backend.

Do not put `CRYPTR_SECRET`, MongoDB credentials, or email-provider credentials in the frontend environment. Keep those only in the backend environment.
