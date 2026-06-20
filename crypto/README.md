# NeonVault Crypto Portfolio Tracker

This folder contains the complete crypto portfolio web app requested for the project.

## Where to find the app

All source code lives under the `crypto/` directory:

- `crypto/app/page.tsx` — dashboard route (`/`)
- `crypto/app/portfolio/page.tsx` — portfolio management route (`/portfolio`)
- `crypto/app/assets/[id]/page.tsx` — coin detail route (`/assets/[id]`)
- `crypto/components/` — reusable UI components
- `crypto/hooks/` — client hooks for polling market data
- `crypto/store/` — Zustand portfolio store with localStorage persistence
- `crypto/lib/api/` — CoinGecko API client
- `crypto/types/` — shared TypeScript types

## How to run locally

From the repository root:

```bash
cd crypto
npm install
npm run dev
```

Then open the local Next.js URL shown in your terminal, usually `http://localhost:3000`.

## Notes

- The existing static site at the repository root was left intact.
- The crypto app has its own `package.json`, so install dependencies from inside `crypto/`.
- If GitHub does not show this folder, make sure you are viewing the branch/PR that contains the latest commit.
