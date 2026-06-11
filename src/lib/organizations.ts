import type { DonationMethodId } from "./donations";
import {
  impactCategories,
  type ImpactArea,
} from "./impact-categories";

export type { ImpactArea };
export {
  impactCategories,
  impactAreaOptions,
  allCategoryIds,
  getCategoryById,
  parseCategoryIdsFromQuery,
  categoryIdsToQuery,
  categoryNamesFromIds,
} from "./impact-categories";

export interface Organization {
  slug: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  description: string;
  mission: string;
  ein: string;
  impactAreas: ImpactArea[];
  methods: DonationMethodId[];
  popular?: boolean;
  underserved?: boolean;
  featured?: boolean;
  accentColor: string;
}

const allMethods: DonationMethodId[] = ["cash", "crypto", "stock", "daf"];
const nonCash: DonationMethodId[] = ["crypto", "stock", "daf"];
const cashCryptoDaf: DonationMethodId[] = ["cash", "crypto", "daf"];

export const organizations: Organization[] = [
  {
    slug: "on-3rd-outreach",
    name: "On 3rd Affordable Food Outreach Service Truck",
    shortName: "On 3rd Outreach",
    country: "United States",
    countryCode: "US",
    description:
      "Mobile food outreach delivering nutritious meals and essential resources to underserved communities nationwide.",
    mission:
      "No one should go hungry. Our service trucks bring fresh meals, dignity, and hope directly to neighborhoods in need.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Hunger", "Community Service", "Disaster Response"],
    methods: allMethods,
    popular: true,
    underserved: true,
    featured: true,
    accentColor: "#c9952e",
  },
  {
    slug: "municipal-blockchain-consortium",
    name: "Municipal Blockchain & Infrastructure Consortium",
    shortName: "MBIC",
    country: "United States",
    countryCode: "US",
    description:
      "National civic infrastructure initiative modernizing government transparency through blockchain and workforce development.",
    mission:
      "Building the next generation of civic infrastructure, municipal transparency, and enterprise blockchain leadership.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Technology", "Education & Training", "Higher Education"],
    methods: allMethods,
    popular: true,
    featured: true,
    accentColor: "#1e3a5f",
  },
  {
    slug: "community-meals-program",
    name: "Community Meals & Nutrition Program",
    shortName: "Community Meals",
    country: "United States",
    countryCode: "US",
    description:
      "Direct meal delivery and nutrition support for families facing food insecurity across our service regions.",
    mission:
      "Delivering consistent, nutritious meals to build healthier, more resilient communities.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Hunger", "Community Service", "Health & Medicine"],
    methods: cashCryptoDaf,
    underserved: true,
    featured: true,
    accentColor: "#b8860b",
  },
  {
    slug: "workforce-pipeline-fund",
    name: "University Workforce Pipeline Fund",
    shortName: "Workforce Pipeline",
    country: "United States",
    countryCode: "US",
    description:
      "Internships, fellowships, and training programs developing deployment-ready municipal blockchain professionals.",
    mission:
      "Solving the industry's workforce challenge by connecting top students with hands-on civic technology experience.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Education & Training", "Higher Education", "Technology"],
    methods: ["cash", "stock", "daf"],
    popular: true,
    featured: true,
    accentColor: "#627d98",
  },
  {
    slug: "civic-tech-research-fund",
    name: "Civic Technology Research Fund",
    shortName: "Civic Tech Research",
    country: "United States",
    countryCode: "US",
    description:
      "University partnerships and research labs advancing municipal blockchain deployment and civic innovation.",
    mission:
      "Funding research collaborations that translate blockchain innovation into real-world municipal infrastructure.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Technology", "Education & Training", "Environment"],
    methods: cashCryptoDaf,
    accentColor: "#486581",
  },
  {
    slug: "municipal-transparency-initiative",
    name: "Municipal Transparency Initiative",
    shortName: "Transparency Initiative",
    country: "United States",
    countryCode: "US",
    description:
      "Public infrastructure funding transparency, procurement accountability, and real-time reporting for cities.",
    mission:
      "Modernizing how infrastructure projects are funded, managed, monitored, and publicly reported.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Technology", "Human Rights", "Legal Support"],
    methods: ["cash", "crypto", "stock"],
    accentColor: "#243b53",
  },
  {
    slug: "disaster-relief-mobile-kitchen",
    name: "Disaster Relief Mobile Kitchen Fund",
    shortName: "Disaster Relief",
    country: "United States",
    countryCode: "US",
    description:
      "Emergency mobile kitchen deployments providing hot meals during natural disasters and community crises.",
    mission:
      "Rapid-response food service when communities need it most—hurricanes, floods, fires, and emergencies.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Disaster Response", "Hunger", "Community Service"],
    methods: allMethods,
    popular: true,
    underserved: true,
    accentColor: "#dc2626",
  },
  {
    slug: "veterans-first-responder-meals",
    name: "Veterans & First Responder Meals Program",
    shortName: "Veterans Meals",
    country: "United States",
    countryCode: "US",
    description:
      "Nutritious meal delivery and support services for veterans, active-duty families, and first responders.",
    mission:
      "Honoring those who serve our communities and country with reliable food security and outreach.",
    ein: "XX-XXXXXXX",
    impactAreas: ["First Responders & Veterans", "Hunger", "Health & Medicine"],
    methods: allMethods,
    popular: true,
    accentColor: "#1d4ed8",
  },
  {
    slug: "youth-nutrition-education",
    name: "Youth Nutrition & Education Program",
    shortName: "Youth Program",
    country: "United States",
    countryCode: "US",
    description:
      "After-school meal programs, nutrition education, and civic engagement for children and youth.",
    mission:
      "Nourishing young minds and bodies while building the next generation of community leaders.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Children & Youth", "Hunger", "Education & Training"],
    methods: cashCryptoDaf,
    underserved: true,
    accentColor: "#059669",
  },
  {
    slug: "womens-outreach-initiative",
    name: "Women & Girls Outreach Initiative",
    shortName: "Women & Girls",
    country: "United States",
    countryCode: "US",
    description:
      "Targeted food outreach, workforce training, and mentorship programs for women and girls in underserved areas.",
    mission:
      "Empowering women and girls through nutrition security, education, and economic opportunity.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Women & Girls", "Hunger", "Education & Training"],
    methods: allMethods,
    accentColor: "#db2777",
  },
  {
    slug: "healthcare-access-partnership",
    name: "Healthcare Access Partnership",
    shortName: "Healthcare Access",
    country: "United States",
    countryCode: "US",
    description:
      "Connecting underserved communities with health screenings, nutrition counseling, and medical resource navigation.",
    mission:
      "Bridging the gap between community outreach and accessible healthcare for those who need it most.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Health & Medicine", "Community Service", "Hunger"],
    methods: cashCryptoDaf,
    accentColor: "#0d9488",
  },
  {
    slug: "homeless-support-services",
    name: "Homeless Support & Meal Services",
    shortName: "Homeless Support",
    country: "United States",
    countryCode: "US",
    description:
      "Mobile meal delivery, hygiene kits, and resource connections for individuals experiencing homelessness.",
    mission:
      "Meeting people where they are with dignity, meals, and pathways to stable housing and support.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Homelessness", "Hunger", "Community Service"],
    methods: allMethods,
    underserved: true,
    accentColor: "#7c3aed",
  },
  {
    slug: "legal-aid-policy-fund",
    name: "Legal Aid & Public Policy Fund",
    shortName: "Legal Aid Fund",
    country: "United States",
    countryCode: "US",
    description:
      "Supporting municipal law internships, public policy research, and legal frameworks for civic blockchain.",
    mission:
      "Advancing equitable legal and policy structures for transparent, accountable public infrastructure.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Legal Support", "Human Rights", "Education & Training"],
    methods: ["cash", "stock", "daf"],
    accentColor: "#334e68",
  },
  {
    slug: "racial-equity-civic-tech",
    name: "Racial Equity in Civic Technology Fund",
    shortName: "Racial Equity Fund",
    country: "United States",
    countryCode: "US",
    description:
      "Programs advancing racial justice through equitable access to civic technology and municipal services.",
    mission:
      "Ensuring government modernization and blockchain innovation serve all communities equitably.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Racial Justice", "Technology", "Human Rights"],
    methods: cashCryptoDaf,
    accentColor: "#92400e",
  },
  {
    slug: "lgbtq-community-support",
    name: "LGBTQ+ Community Support Fund",
    shortName: "LGBTQ+ Support",
    country: "United States",
    countryCode: "US",
    description:
      "Inclusive outreach meals, safe-space programs, and community support for LGBTQ+ individuals and families.",
    mission:
      "Creating welcoming, affirming community spaces with food security and outreach for all.",
    ein: "XX-XXXXXXX",
    impactAreas: ["LGBTQ", "Community Service", "Health & Medicine"],
    methods: cashCryptoDaf,
    accentColor: "#a855f7",
  },
  {
    slug: "faith-based-outreach-alliance",
    name: "Faith-Based Outreach Alliance",
    shortName: "Faith Alliance",
    country: "United States",
    countryCode: "US",
    description:
      "Partnering with faith communities to expand mobile food outreach and disaster relief capacity.",
    mission:
      "Uniting faith-based organizations to serve neighbors in need through shared outreach infrastructure.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Religion and Faith Based", "Community Service", "Hunger"],
    methods: allMethods,
    accentColor: "#78716c",
  },
  {
    slug: "addiction-recovery-meals",
    name: "Addiction Recovery Support Meals",
    shortName: "Recovery Meals",
    country: "United States",
    countryCode: "US",
    description:
      "Nutritious meal programs supporting individuals and families in addiction recovery programs.",
    mission:
      "Removing food insecurity as a barrier to recovery with consistent, dignified meal support.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Addiction Recovery", "Health & Medicine", "Hunger"],
    methods: cashCryptoDaf,
    underserved: true,
    accentColor: "#0891b2",
  },
  {
    slug: "environmental-sustainability-lab",
    name: "Environmental Sustainability Lab",
    shortName: "Sustainability Lab",
    country: "United States",
    countryCode: "US",
    description:
      "Research on green infrastructure, sustainable food systems, and environmental impact of civic programs.",
    mission:
      "Advancing environmentally responsible infrastructure and outreach operations for future generations.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Environment", "Technology", "Education & Training"],
    methods: ["cash", "crypto", "daf"],
    accentColor: "#16a34a",
  },
  {
    slug: "water-hygiene-initiative",
    name: "Water & Hygiene Initiative",
    shortName: "Water & Hygiene",
    country: "United States",
    countryCode: "US",
    description:
      "Clean water access, hygiene kit distribution, and sanitation support in underserved communities.",
    mission:
      "Ensuring every community has access to clean water and basic hygiene resources.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Water & Hygiene", "Environment", "Community Service"],
    methods: cashCryptoDaf,
    underserved: true,
    accentColor: "#0284c7",
  },
  {
    slug: "international-civic-development",
    name: "International Civic Development Fund",
    shortName: "Intl. Civic Dev",
    country: "United States",
    countryCode: "US",
    description:
      "Supporting international development of civic technology standards and cross-border humanitarian outreach.",
    mission:
      "Extending transparent civic infrastructure principles and food outreach to global communities.",
    ein: "XX-XXXXXXX",
    impactAreas: ["International Development", "Technology", "Hunger"],
    methods: ["cash", "crypto", "daf"],
    accentColor: "#0369a1",
  },
  {
    slug: "immigration-refugee-services",
    name: "Immigration & Refugee Services Fund",
    shortName: "Refugee Services",
    country: "United States",
    countryCode: "US",
    description:
      "Meal delivery, resource navigation, and community integration support for immigrants and refugees.",
    mission:
      "Welcoming newcomers with nourishment, dignity, and connections to essential community resources.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Immigration & Refugees", "Hunger", "Community Service"],
    methods: allMethods,
    underserved: true,
    accentColor: "#ea580c",
  },
  {
    slug: "arts-culture-community",
    name: "Arts & Culture Community Program",
    shortName: "Arts & Culture",
    country: "United States",
    countryCode: "US",
    description:
      "Community arts events combined with food outreach—using culture to build connection and fight hunger.",
    mission:
      "Enriching communities through arts, culture, and shared meals that bring people together.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Arts & Culture", "Community Service", "Children & Youth"],
    methods: cashCryptoDaf,
    accentColor: "#c026d3",
  },
  {
    slug: "animal-therapy-outreach",
    name: "Animal Therapy & Outreach Program",
    shortName: "Animal Therapy",
    country: "United States",
    countryCode: "US",
    description:
      "Therapeutic animal programs paired with community meal events for seniors and families in need.",
    mission:
      "Healing through human-animal connection while addressing food insecurity in our communities.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Animals", "Health & Medicine", "Community Service"],
    methods: cashCryptoDaf,
    accentColor: "#854d0e",
  },
  {
    slug: "developmental-disabilities-support",
    name: "Developmental Disabilities Support Fund",
    shortName: "Disabilities Support",
    country: "United States",
    countryCode: "US",
    description:
      "Specialized meal programs and civic engagement opportunities for individuals with developmental disabilities.",
    mission:
      "Ensuring inclusive access to nutrition, community programs, and civic participation for all abilities.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Developmental Disabilities", "Community Service", "Health & Medicine"],
    methods: allMethods,
    underserved: true,
    accentColor: "#4f46e5",
  },
  {
    slug: "community-foundation-endowment",
    name: "On 3rd Community Foundation Endowment",
    shortName: "Community Foundation",
    country: "United States",
    countryCode: "US",
    description:
      "Endowment fund supporting long-term sustainability of outreach programs and civic infrastructure initiatives.",
    mission:
      "Building permanent philanthropic capacity to serve communities for generations to come.",
    ein: "XX-XXXXXXX",
    impactAreas: ["Community Foundations", "Community Service", "Education & Training"],
    methods: ["cash", "stock", "daf"],
    popular: true,
    accentColor: "#0f766e",
  },
];

export const featuredOrganizations = organizations.filter((o) => o.featured);

export function getOrganization(slug: string): Organization | undefined {
  return organizations.find((o) => o.slug === slug);
}

export function getOrganizationsByCategoryIds(ids: number[]): Organization[] {
  const names = ids
    .map((id) => impactCategories.find((c) => c.id === id)?.name)
    .filter(Boolean) as ImpactArea[];

  if (names.length === 0) return organizations;

  return organizations.filter((o) =>
    names.some((name) => o.impactAreas.includes(name))
  );
}

export function getDonationMethodsForOrg(orgSlug: string) {
  const org = getOrganization(orgSlug);
  if (!org) return [];

  const base = "/donate/" + orgSlug;

  const all = [
    {
      id: "cash" as const,
      title: "Credit / Debit Card",
      subtitle: "One-time or monthly",
      description: "Give instantly with card. Funds deposit as cash to the organization.",
      href: `${base}/cash`,
      icon: "credit-card",
    },
    {
      id: "crypto" as const,
      title: "Cryptocurrency",
      subtitle: "BTC, ETH, USDC, SOL & more",
      description: "Auto-converted to cash upon receipt—24/7.",
      href: `${base}/crypto`,
      icon: "bitcoin",
    },
    {
      id: "stock" as const,
      title: "Stock & Mutual Funds",
      subtitle: "Appreciated securities",
      description: "Shares sold and converted to cash automatically.",
      href: `${base}/stock`,
      icon: "trending-up",
    },
    {
      id: "daf" as const,
      title: "DAF Grants",
      subtitle: "Donor-advised funds",
      description: "Recommend a grant that settles as cash.",
      href: `${base}/daf`,
      icon: "landmark",
    },
  ];

  return all.filter((m) => org.methods.includes(m.id));
}
