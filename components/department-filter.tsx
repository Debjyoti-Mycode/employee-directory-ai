"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Department } from "@/lib/queries";

function getDeptIcon(name: string): string {
  const norm = name.toLowerCase().trim();
  if (norm.includes("engineer") || norm.includes("tech") || norm.includes("dev")) return "💻";
  if (norm.includes("finance") || norm.includes("account") || norm.includes("money")) return "💰";
  if (norm.includes("human resource") || norm.includes("hr") || norm.includes("people")) return "👥";
  if (norm.includes("market") || norm.includes("sales") || norm.includes("ad")) return "📣";
  if (norm.includes("product")) return "🏭";
  return "🏢";
}

export default function DepartmentFilter({
  departments,
}: {
  departments: Department[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDept = searchParams.get("dept") ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("dept", value);
    } else {
      params.delete("dept");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    setIsOpen(false);
  }

  const selectedDept = departments.find((d) => d._id === currentDept);
  const selectedDeptName = selectedDept?.name || "All departments";
  const selectedDeptIcon = selectedDept ? getDeptIcon(selectedDept.name) : "🌐";

  return (
    <div
      ref={dropdownRef}
      className="relative rounded-3xl border border-white/60 bg-white p-5 shadow-sm"
    >
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Filter by department
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:bg-slate-100/70 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-base flex-shrink-0">{selectedDeptIcon}</span>
          <span className="truncate">{selectedDeptName}</span>
        </div>
        <svg
          className={`ml-2 h-4 w-4 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-5 right-5 mt-2 z-50 max-h-60 overflow-y-auto rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-2 space-y-0.5">
          <button
            type="button"
            onClick={() => handleSelect("")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all cursor-pointer ${
              currentDept === ""
                ? "bg-sky-50 text-sky-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-lg transition-colors ${
                  currentDept === "" ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"
                }`}
              >
                🌐
              </div>
              <span>All departments</span>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                currentDept === ""
                  ? "bg-sky-100/50 border-sky-200/50 text-sky-700"
                  : "bg-slate-100 border-slate-200/50 text-slate-500"
              }`}
            >
              All Floors
            </span>
          </button>

          {departments.map((dept) => {
            const isSelected = currentDept === dept._id;
            const icon = getDeptIcon(dept.name);
            return (
              <button
                key={dept._id}
                type="button"
                onClick={() => handleSelect(dept._id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-lg transition-colors ${
                      isSelected ? "bg-sky-100 text-sky-700" : "bg-slate-100/80 text-slate-600"
                    }`}
                  >
                    {icon}
                  </div>
                  <span>{dept.name}</span>
                </div>
                {dept.floor !== undefined && (
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                      isSelected
                        ? "bg-sky-100/50 border-sky-200/50 text-sky-700"
                        : "bg-slate-100 border-slate-200/50 text-slate-500"
                    }`}
                  >
                    Floor {dept.floor}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}