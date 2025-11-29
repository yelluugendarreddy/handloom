# Handloom — React demo

This is a small React (Vite) project scaffold for a Handloom store demo.

Pages included:
- Login (linked to Signup)
- Signup (linked to Login)
- Home
- About
- Products
- Basket
- Contact

Local state:
- Simple auth stored in localStorage (demo only)
- Basket stored in React state

Getting started (Windows PowerShell):

```powershell
# 1) Install dependencies
npm install

# 2) Start dev server
npm run dev
```

Open the dev server URL that Vite prints (usually http://localhost:5173).

Notes:
- This is a front-end demo only (no real backend). Sign up/login are demo-only and store a simple user in localStorage.
- Feel free to extend with a backend or replace localStorage with real auth.

### UPI payment method (added)

This project now includes a simple UPI payment flow:


Configuration:


QR code included
----------------

This repo already includes a QR image at `public/images/qr.jpeg` (also copied as `qr.JPEG`). The payment page (`/payment`) will show this QR code so mobile users can scan it directly to pay.

Dashboard redesign
------------------

The Home page has been redesigned to act as a modern store dashboard:

- A colorful hero with quick search and quick action buttons
-- Clean dashboard with hero, quick actions and featured products (no stats shown)
- Featured products grid for quick discovery

This front-end revamp is responsive and uses new styles in `src/index.css`.



How it enforces paying the correct amount:

- The frontend calculates the cart total and only allows paying that non-editable amount.
- The backend validates that the posted amount equals the sum of the cart items before recording the payment.

Deploying to Vercel (frontend only)
----------------------------------

This project is ready to deploy to Vercel as a static Vite app (frontend-only). The `front/vercel.json` file is included and configures Vercel to run `npm run build` and publish the `dist` directory. Follow one of the options below to deploy.

Option A — Deploy via Vercel web UI (recommended)
1. Go to https://vercel.com and sign in / create an account.
2. Click "New Project" → Import from Git (select this repository).
3. When Vercel asks for the root folder, choose `front` (not the repo root).
4. Set Framework Preset to "Other" (Vite) or let Vercel auto-detect.
5. Build Command: `npm run build` (default)
6. Output Directory: `dist` (auto-read from vercel.json)
7. Environment variables (if your backend runs elsewhere), add a Vercel env var:
	- VITE_API_BASE = http://your-backend-url (e.g. http://localhost:5000 for local testing)
8. Deploy.

Option B — Deploy with Vercel CLI (from `front` folder)
1. Install Vercel CLI if you don't already: `npm i -g vercel`
2. From the `front` folder run:
	```powershell
	vercel --prod
	```
3. Vercel will ask for project and scope (follow prompts). Make sure the deployment root is the `front` folder.

Notes
- The frontend will fetch backend endpoints using the `VITE_API_BASE` environment variable if set. Configure this in Vercel's Project Settings -> Environment Variables if you host the server elsewhere.
- Single page routing is handled by `vercel.json` (fallback to index.html). 
