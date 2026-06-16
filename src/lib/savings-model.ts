/** Fixed rates for the On 3rd Outreach municipal savings model */
export const BLOCKCHAIN_SAVINGS_RATE = 0.65;
export const OUTREACH_FEE_RATE = 0.37;

export const DEFAULT_PROJECT_BUDGET = 3_000_000;

export const PROJECT_TYPES = [
  "Roads & Streets",
  "Water Systems",
  "Schools & Parks",
  "Dams & Bridges",
  "Public Buildings",
  "Other Infrastructure",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface SavingsBreakdown {
  traditionalCost: number;
  grossSavings: number;
  grossSavingsRate: number;
  actualProjectCost: number;
  actualCostRate: number;
  outreachFee: number;
  outreachFeeRate: number;
  netSavings: number;
}

export function calculateSavings(traditionalCost: number): SavingsBreakdown {
  const budget = Math.max(0, traditionalCost);
  const grossSavings = budget * BLOCKCHAIN_SAVINGS_RATE;
  const actualProjectCost = budget - grossSavings;
  const outreachFee = grossSavings * OUTREACH_FEE_RATE;
  const netSavings = grossSavings - outreachFee;

  return {
    traditionalCost: budget,
    grossSavings,
    grossSavingsRate: BLOCKCHAIN_SAVINGS_RATE,
    actualProjectCost,
    actualCostRate: 1 - BLOCKCHAIN_SAVINGS_RATE,
    outreachFee,
    outreachFeeRate: OUTREACH_FEE_RATE,
    netSavings,
  };
}

export function parseBudgetInput(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return 0;
  return Number.parseInt(digits, 10);
}

export function formatBudgetInput(value: number): string {
  if (!value) return "";
  return value.toLocaleString("en-US");
}
