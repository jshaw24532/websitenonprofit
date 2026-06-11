# Municipal Blockchain & Infrastructure Consortium Website

A professional nonprofit donation website for **On 3rd Affordable Food Outreach Service Truck**, featuring the **Municipal Blockchain & Infrastructure Consortium** — a national civic infrastructure initiative.

## Features

- **Homepage** with full consortium positioning (hero, vision, why it matters, workforce pipeline, leadership, university partnerships, CTA)
- **Government & Infrastructure** main navigation section with 10 sub-pages:
  - Executive Overview
  - Founding Partners
  - University & Workforce Pipeline
  - Strategic Advisors
  - Municipal Infrastructure Programs
  - Civic Technology Research Labs
  - Sponsorship & Enterprise Partnerships
  - Government Relations & Public Policy
  - Internship & Fellowship Programs
  - Contact the Consortium
- **Donation System** — traditional credit/debit card donations with tier selection
- **Cryptocurrency Donations** — BTC, ETH, USDC, SOL wallet addresses with copy functionality
- **Additional Pages** — About, Mission, Programs, Impact, Contact, Volunteer

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm start
```

## Configuration

Edit `src/lib/config.ts` to update:
- Organization name and contact information
- Crypto wallet addresses
- Donation tiers
- Navigation structure

## Payment Integration

The donation forms are UI-ready for integration with:
- **Stripe** — for credit/debit card processing
- **The Giving Block** — for automated crypto donation processing
- **Coinbase Commerce** — alternative crypto payment gateway
- **BTCPay Server** — self-hosted crypto payment processor

## Design

Professional institutional design with:
- Navy and gold color palette
- Playfair Display + DM Sans typography
- Responsive mobile-first layout
- Accessible focus states and reduced motion support
