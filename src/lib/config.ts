export const siteConfig = {
  name: "On 3rd Affordable Food Outreach Service Truck",
  shortName: "On 3rd Outreach",
  consortiumName: "Municipal Blockchain & Infrastructure Consortium",
  consortiumShort: "MBIC",
  /** Primary hook for city officials, grant funders, and homepage hero */
  valueProposition:
    "We save governments up to 25% on infrastructure projects at zero out-of-pocket cost.",
  tagline:
    "Municipal infrastructure savings at zero out-of-pocket cost—powered by blockchain transparency.",
  description:
    "On 3rd Outreach saves governments up to 25% on infrastructure projects at zero out-of-pocket cost. A 501(c)(3) nonprofit combining municipal blockchain modernization with mobile community food outreach.",
  missionStory:
    "Our affordable food outreach trucks are the heart of why we exist—delivering meals, dignity, and hope to underserved communities, sustained by the infrastructure savings we create for cities.",
  logoSubtitle: "Municipal Infrastructure Savings",
  email: "info@on3rdoutreach.org",
  consortiumEmail: "info@on3rdoutreach.org",
  phone: "(872) 710-0657",
  address: "11057 South Fairfield Ave., Chicago, Illinois 60655",
};

/** Public 501(c)(3) / tax-exempt details shown on the site */
export const nonprofit = {
  legalName: "On 3rd Affordable Food Outreach Service Truck",
  status: "501(c)(3)" as const,
  isTaxExempt: true,
  ein: "99-4957292",
  taxDeductibleNote:
    "Donations are tax-deductible to the extent allowed by U.S. law.",
  irsVerifyUrl:
    "https://apps.irs.gov/app/eos/details/?ein=994957292&country=US&deductibility=all",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Mission", href: "/mission" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
];

export const governmentNav = {
  label: "Government & Infrastructure",
  href: "/government",
  items: [
    {
      label: "Executive Overview",
      href: "/government/executive-overview",
      description: "National civic infrastructure initiative overview",
    },
    {
      label: "Founding Partners",
      href: "/government/founding-partners",
      description: "Early strategic partnership opportunities",
    },
    {
      label: "University & Workforce Pipeline",
      href: "/government/university-workforce",
      description: "Talent development and deployment readiness",
    },
    {
      label: "Strategic Advisors",
      href: "/government/strategic-advisors",
      description: "Multidisciplinary leadership network",
    },
    {
      label: "Municipal Infrastructure Programs",
      href: "/government/municipal-programs",
      description: "Real-world civic deployment initiatives",
    },
    {
      label: "Savings Calculator",
      href: "/government/savings-calculator",
      description: "Instant infrastructure savings estimates for cities",
    },
    {
      label: "Civic Technology Research Labs",
      href: "/government/research-labs",
      description: "Innovation and research collaborations",
    },
    {
      label: "Sponsorship & Enterprise Partnerships",
      href: "/government/sponsorship",
      description: "Corporate and enterprise engagement",
    },
    {
      label: "Government Relations & Public Policy",
      href: "/government/public-policy",
      description: "Policy frameworks and government alignment",
    },
    {
      label: "Internship & Fellowship Programs",
      href: "/government/internships",
      description: "Student and professional development",
    },
    {
      label: "Contact the Consortium",
      href: "/government/contact",
      description: "Engage with consortium leadership",
    },
  ],
};

export const footerNav = {
  organization: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/mission" },
    { label: "Programs", href: "/programs" },
    { label: "Impact", href: "/impact" },
  ],
  consortium: governmentNav.items,
  support: [
    { label: "Find a Cause", href: "/donate" },
    { label: "Donate — On 3rd Outreach", href: "/donate/on-3rd-outreach" },
    { label: "Donate — MBIC", href: "/donate/municipal-blockchain-consortium" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Contact", href: "/contact" },
  ],
};

export const cryptoWallets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    network: "Bitcoin Mainnet",
    color: "#F7931A",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "Ethereum Mainnet",
    color: "#627EEA",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "Ethereum (ERC-20)",
    color: "#2775CA",
  },
  {
    name: "Solana",
    symbol: "SOL",
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    network: "Solana Mainnet",
    color: "#9945FF",
  },
];

export const donationTiers = [
  {
    name: "Community Supporter",
    amount: 25,
    description: "Supports one community meal delivery",
  },
  {
    name: "Outreach Partner",
    amount: 100,
    description: "Funds a day of mobile food outreach operations",
  },
  {
    name: "Infrastructure Ally",
    amount: 500,
    description: "Supports civic technology research initiatives",
  },
  {
    name: "Founding Supporter",
    amount: 2500,
    description: "Strategic support for consortium development",
  },
];
