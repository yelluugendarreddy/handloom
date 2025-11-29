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
