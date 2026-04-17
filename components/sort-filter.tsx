"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-white p-5 shadow-sm">
      <label
        htmlFor="sort-filter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Sort employees
      </label>

      <select
        id="sort-filter"
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
      >
        <option value="">Default</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="salary-asc">Salary Low to High</option>
        <option value="salary-desc">Salary High to Low</option>
      </select>
    </div>
  );
}