/**
 * Non-cash donation configuration — modeled after The Giving Block workflow:
 * https://thegivingblock.com/crypto-donations/
 *
 * Crypto, stock, and DAF gifts are configured for immediate liquidation to USD cash
 * upon receipt (24/7), reducing price volatility and simplifying nonprofit accounting.
 */

import { nonprofit } from "./config";

export type DonationMethodId = "cash" | "crypto" | "stock" | "daf";

export const instantConversionPolicy = {
  title: "Immediate Conversion to Cash",
  description:
    "All cryptocurrency, stock, and DAF contributions are automatically converted to U.S. dollars upon receipt. Your organization receives cash—not volatile assets—so funds are available for programs without delay.",
  features: [
    "Automatic liquidation 24/7 — no manual trading required",
    "Donors avoid capital gains tax on appreciated crypto and stock",
    "Automatic tax receipts and compliance documentation",
    "Reduced price volatility risk for the nonprofit",
    "Seamless reporting for finance and audit teams",
  ],
};

export const donationMethods = [
  {
    id: "cash" as const,
    title: "Credit / Debit Card",
    subtitle: "One-time or monthly",
    description:
      "Give instantly with card or bank transfer. Funds deposit directly to our operating account.",
    href: "/donate#cash",
    icon: "credit-card",
  },
  {
    id: "crypto" as const,
    title: "Cryptocurrency",
    subtitle: "BTC, ETH, USDC, SOL & more",
    description:
      "Donate crypto and we convert to cash automatically upon receipt—no volatility exposure.",
    href: "/donate/crypto",
    icon: "bitcoin",
  },
  {
    id: "stock" as const,
    title: "Stock & Mutual Funds",
    subtitle: "Appreciated securities",
    description:
      "Transfer shares through our brokerage workflow. Securities are sold and converted to cash automatically.",
    href: "/donate/stock",
    icon: "trending-up",
  },
  {
    id: "daf" as const,
    title: "DAF Grants",
    subtitle: "Donor-advised funds",
    description:
      "Recommend a grant from your DAF without leaving our giving experience. Grants settle as cash.",
    href: "/donate/daf",
    icon: "landmark",
  },
];

export const stockDonationInfo = {
  brokerageName: "On 3rd Outreach Donor Services",
  dtcNumber: "0226",
  accountNumber: "PLACEHOLDER-ACCOUNT",
  accountName: "On 3rd Affordable Food Outreach Service Truck",
  ein: nonprofit.ein,
  supportedTypes: [
    "Publicly traded stocks",
    "Mutual fund shares",
    "ETFs",
    "Bonds (where eligible)",
  ],
};

export const dafProviders = [
  "Fidelity Charitable",
  "Schwab Charitable",
  "Vanguard Charitable",
  "National Philanthropic Trust",
  "Jewish Communal Fund",
  "Silicon Valley Community Foundation",
  "Other / Not listed",
];

export const givingBlockIntegration = {
  enabled: process.env.NEXT_PUBLIC_GIVING_BLOCK_ENABLED === "true",
  widgetUrl: process.env.NEXT_PUBLIC_GIVING_BLOCK_WIDGET_URL ?? "",
  learnMoreUrl: "https://thegivingblock.com/crypto-donations/",
};
