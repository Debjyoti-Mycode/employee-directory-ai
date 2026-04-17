import Link from "next/link";
import type { EmployeeWithDepartment } from "@/lib/queries";

export default function EmployeeCard({
  employee,
}: {
  employee: EmployeeWithDepartment;
}) {
  return (
    <article className="group rounded-3xl border border-white/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{employee.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{employee.position}</p>
        </div>

        <div className="rounded-2xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700">
          {employee.department?.name ?? "Unassigned"}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Salary</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            ₹{employee.salary.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <Link
        href={`/employee/${employee._id}`}
        className="mt-5 inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        View Details
      </Link>
    </article>
  );
}