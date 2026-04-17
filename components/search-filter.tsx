"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-white p-5 shadow-sm">
      <label
        htmlFor="employee-search"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Search employee by name
      </label>
      <input
        id="employee-search"
        type="text"
        defaultValue={currentSearch}
        placeholder="Search by employee name"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
      />
    </div>
  );
}