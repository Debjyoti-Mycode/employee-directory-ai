"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "", label: "Default" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "salary-asc", label: "Salary Low to High" },
  { value: "salary-desc", label: "Salary High to Low" },
];

export default function SortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";
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
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    setIsOpen(false);
  }

  const selectedOptionLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Default";

  return (
    <div
      ref={dropdownRef}
      className="relative rounded-3xl border border-white/60 bg-white p-5 shadow-sm"
    >
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Sort employees
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:bg-slate-100/70 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 cursor-pointer"
      >
        <span className="truncate">{selectedOptionLabel}</span>
        <svg
          className={`ml-2 h-4 w-4 text-slate-500 transition-transform duration-200 ${
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
        <div className="absolute left-5 right-5 mt-2 z-50 max-h-60 overflow-y-auto rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition-all cursor-pointer ${
                currentSort === opt.value
                  ? "bg-sky-50 text-sky-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}