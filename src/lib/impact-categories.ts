/**
 * Impact area categories aligned with The Giving Block nonprofit finder:
 * https://thegivingblock.com/donate/
 */

export interface ImpactCategory {
  id: number;
  name: string;
}

export const impactCategories: ImpactCategory[] = [
  { id: 1, name: "Addiction Recovery" },
  { id: 2, name: "Animals" },
  { id: 3, name: "Arts & Culture" },
  { id: 4, name: "Children & Youth" },
  { id: 5, name: "Community Foundations" },
  { id: 6, name: "Community Service" },
  { id: 7, name: "Developmental Disabilities" },
  { id: 8, name: "Disaster Response" },
  { id: 9, name: "Education & Training" },
  { id: 10, name: "Environment" },
  { id: 11, name: "First Responders & Veterans" },
  { id: 12, name: "Health & Medicine" },
  { id: 13, name: "Higher Education" },
  { id: 14, name: "Homelessness" },
  { id: 15, name: "Human Rights" },
  { id: 16, name: "Hunger" },
  { id: 17, name: "Immigration & Refugees" },
  { id: 18, name: "International Development" },
  { id: 19, name: "Legal Support" },
  { id: 20, name: "LGBTQ" },
  { id: 21, name: "Racial Justice" },
  { id: 22, name: "Religion and Faith Based" },
  { id: 23, name: "Technology" },
  { id: 24, name: "Water & Hygiene" },
  { id: 25, name: "Women & Girls" },
];

export type ImpactArea = (typeof impactCategories)[number]["name"];

export const impactAreaOptions: ImpactArea[] = impactCategories.map((c) => c.name);

export const allCategoryIds = impactCategories.map((c) => c.id);

export function getCategoryById(id: number): ImpactCategory | undefined {
  return impactCategories.find((c) => c.id === id);
}

export function getCategoryByName(name: string): ImpactCategory | undefined {
  return impactCategories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function parseCategoryIdsFromQuery(param: string | null): number[] {
  if (!param) return [];
  return param
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((id) => allCategoryIds.includes(id));
}

export function categoryIdsToQuery(ids: number[]): string {
  return ids.sort((a, b) => a - b).join(",");
}

export function categoryNamesFromIds(ids: number[]): ImpactArea[] {
  return ids
    .map((id) => getCategoryById(id)?.name)
    .filter((n): n is ImpactArea => Boolean(n));
}
