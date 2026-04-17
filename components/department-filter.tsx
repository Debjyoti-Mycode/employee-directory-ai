"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Department } from "@/lib/queries";

export default function DepartmentFilter({
  departments,
}: {
  departments: Department[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDept = searchParams.get("dept") ?? "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("dept", value);
    } else {
      params.delete("dept");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-white p-5 shadow-sm">
      <label
        htmlFor="department-filter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Filter by department
      </label>

      <select
        id="department-filter"
        value={currentDept}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
      >
        <option value="">All departments</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}