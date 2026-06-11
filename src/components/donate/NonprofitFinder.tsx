"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Building2,
  Heart,
} from "lucide-react";
import {
  organizations,
  featuredOrganizations,
  impactCategories,
  allCategoryIds,
  categoryIdsToQuery,
  parseCategoryIdsFromQuery,
  categoryNamesFromIds,
} from "@/lib/organizations";
import type { DonationMethodId } from "@/lib/donations";
import { cn } from "@/lib/utils";

type SortOption = "popular" | "name" | "underserved";

const methodFilters: { id: DonationMethodId; label: string }[] = [
  { id: "crypto", label: "Crypto" },
  { id: "stock", label: "Stock" },
  { id: "daf", label: "DAF" },
  { id: "cash", label: "Card" },
];

export default function NonprofitFinder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "popular"
  );
  const [showFilters, setShowFilters] = useState(
    Boolean(searchParams.get("categories") || searchParams.get("method"))
  );
  const [categoryIds, setCategoryIds] = useState<number[]>(() =>
    parseCategoryIdsFromQuery(searchParams.get("categories"))
  );
  const [methodFilter, setMethodFilter] = useState<DonationMethodId | null>(
    (searchParams.get("method") as DonationMethodId) || null
  );

  const syncUrl = useCallback(
    (
      ids: number[],
      method: DonationMethodId | null,
      q: string,
      sortBy: SortOption
    ) => {
      const params = new URLSearchParams();
      if (ids.length > 0) params.set("categories", categoryIdsToQuery(ids));
      if (method) params.set("method", method);
      if (q.trim()) params.set("q", q.trim());
      if (sortBy !== "popular") params.set("sort", sortBy);
      const qs = params.toString();
      router.replace(qs ? `/donate?${qs}` : "/donate", { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    syncUrl(categoryIds, methodFilter, search, sort);
  }, [categoryIds, methodFilter, search, sort, syncUrl]);

  const categoryNames = useMemo(
    () => categoryNamesFromIds(categoryIds),
    [categoryIds]
  );

  const filtered = useMemo(() => {
    let list = [...organizations];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.shortName.toLowerCase().includes(q) ||
          o.impactAreas.some((a) => a.toLowerCase().includes(q))
      );
    }

    if (categoryNames.length > 0) {
      list = list.filter((o) =>
        categoryNames.some((name) => o.impactAreas.includes(name))
      );
    }

    if (methodFilter) {
      list = list.filter((o) => o.methods.includes(methodFilter));
    }

    if (sort === "popular") {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sort === "underserved") {
      list.sort((a, b) => (b.underserved ? 1 : 0) - (a.underserved ? 1 : 0));
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [search, sort, categoryNames, methodFilter]);

  const toggleCategory = (id: number) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const selectAllCategories = () => setCategoryIds([...allCategoryIds]);

  const clearFilters = () => {
    setCategoryIds([]);
    setMethodFilter(null);
    setSearch("");
    setSort("popular");
  };

  const hasFilters =
    categoryIds.length > 0 || methodFilter !== null || search.trim() !== "";

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="container-wide py-8">
        {/* Featured orgs — TGB-style strip */}
        {featuredOrganizations.length > 0 && !hasFilters && (
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
              Featured organizations
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {featuredOrganizations.map((org) => (
                <Link
                  key={org.slug}
                  href={`/donate/${org.slug}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 shadow-sm transition-colors hover:border-gold-400 hover:bg-gold-50"
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: org.accentColor }}
                  >
                    {org.shortName.charAt(0)}
                  </span>
                  {org.shortName}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
            <input
              type="search"
              placeholder="Search organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-navy-200 bg-white py-3 pl-12 pr-4 text-navy-900 shadow-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-navy-200 bg-white p-1">
              {(["popular", "underserved"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors",
                    sort === s
                      ? "bg-navy-900 text-white"
                      : "text-navy-700 hover:bg-navy-50"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                showFilters
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-800 hover:border-navy-300"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter by
              {(categoryIds.length > 0 || methodFilter) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs text-navy-950">
                  {categoryIds.length + (methodFilter ? 1 : 0)}
                </span>
              )}
            </button>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-navy-600 hover:text-navy-950"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-navy-500">
                Ways to Give
              </h3>
              <div className="flex flex-wrap gap-2">
                {methodFilters.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() =>
                      setMethodFilter(methodFilter === m.id ? null : m.id)
                    }
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      methodFilter === m.id
                        ? "bg-navy-900 text-white"
                        : "bg-navy-100 text-navy-700 hover:bg-navy-200"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
                Impact Areas ({impactCategories.length})
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAllCategories}
                  className="text-xs font-semibold text-gold-600 hover:text-gold-500"
                >
                  Select all
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryIds([])}
                  className="text-xs font-semibold text-navy-500 hover:text-navy-800"
                >
                  Clear categories
                </button>
              </div>
            </div>
            <div className="flex max-h-64 flex-wrap gap-2 overflow-y-auto">
              {impactCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    categoryIds.includes(cat.id)
                      ? "bg-gold-500 text-navy-950"
                      : "bg-navy-100 text-navy-700 hover:bg-navy-200"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mb-6 text-sm text-navy-600">
          <strong className="text-navy-900">{filtered.length}</strong>{" "}
          organization{filtered.length !== 1 ? "s" : ""} found
          {categoryIds.length > 0 &&
            ` in ${categoryIds.length} impact area${categoryIds.length !== 1 ? "s" : ""}`}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center">
            <p className="mb-2 text-lg font-semibold text-navy-900">
              No results found
            </p>
            <p className="mb-6 text-navy-600">
              Please check your spelling or try different keywords.
            </p>
            <button type="button" onClick={clearFilters} className="btn-primary">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((org) => (
              <Link
                key={org.slug}
                href={`/donate/${org.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all hover:border-gold-300 hover:shadow-lg"
              >
                <div
                  className="flex h-28 items-center justify-center"
                  style={{ backgroundColor: org.accentColor + "18" }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-md"
                    style={{ backgroundColor: org.accentColor }}
                  >
                    {org.shortName.charAt(0)}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-navy-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-600">
                      {org.countryCode}
                    </span>
                    {org.popular && (
                      <span className="rounded bg-gold-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gold-800">
                        Popular
                      </span>
                    )}
                    {org.underserved && (
                      <span className="rounded bg-navy-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
                        Underserved
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 line-clamp-2 text-lg font-bold text-navy-950 group-hover:text-navy-800">
                    {org.name}
                  </h2>
                  <p className="mb-3 line-clamp-2 flex-1 text-sm text-navy-600">
                    {org.description}
                  </p>
                  <div className="mb-3 flex flex-wrap gap-1">
                    {org.impactAreas.slice(0, 3).map((area) => (
                      <span
                        key={area}
                        className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] text-navy-600"
                      >
                        {area}
                      </span>
                    ))}
                    {org.impactAreas.length > 3 && (
                      <span className="text-[10px] text-navy-400">
                        +{org.impactAreas.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {org.methods.map((m) => (
                      <span
                        key={m}
                        className="rounded-full bg-gold-50 px-2 py-0.5 text-[10px] font-medium uppercase text-gold-800"
                      >
                        {m === "cash" ? "Card" : m}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-navy-950 transition-colors group-hover:bg-gold-400">
                    <Heart className="h-4 w-4" />
                    Donate
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-gold-200 bg-gradient-to-r from-gold-50 to-white p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-2 text-lg font-bold text-navy-950">
                Save on your taxes by donating non-cash assets
              </h3>
              <p className="text-sm text-navy-600">
                Donating crypto and stock directly to 501(c)(3) nonprofits offers
                greater tax advantages than donating cash.{" "}
                <a
                  href="https://thegivingblock.com/donate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                #1 Crypto Donation Platform Model
              </p>
              <Building2 className="ml-auto mt-2 h-10 w-10 text-gold-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
