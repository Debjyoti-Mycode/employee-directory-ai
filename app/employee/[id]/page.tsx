import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteEmployeeButton from "@/components/delete-employee-button";
import { getEmployeeById } from "@/lib/queries";

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = await getEmployeeById(id);

  if (!employee) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex rounded-2xl border border-white/60 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          ← Back to Directory
        </Link>

        <div className="flex gap-3">
          <Link
            href={`/employee/${employee._id}/edit`}
            className="rounded-2xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            Edit Employee
          </Link>

          <DeleteEmployeeButton id={employee._id} />
        </div>
      </div>

      <article className="overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 p-8 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-200">
            Employee Profile
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{employee.name}</h1>
          <p className="mt-2 text-slate-200">{employee.position}</p>
        </div>

        <div className="grid gap-4 p-8 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Position</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {employee.position}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Salary</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              ₹{employee.salary.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Department</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {employee.department?.name ?? "Unassigned"}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Floor</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {employee.department?.floor ?? "N/A"}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}