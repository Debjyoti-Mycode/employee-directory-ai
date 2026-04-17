"use client";

import { useActionState } from "react";
import { updateEmployee } from "@/app/actions";
import type { Department, EmployeeWithDepartment } from "@/lib/queries";

type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const initialActionState: ActionState = {
  success: false,
  message: "",
  errors: {},
};

export default function EditEmployeeForm({
  employee,
  departments,
}: {
  employee: EmployeeWithDepartment;
  departments: Department[];
}) {
  const updateEmployeeWithId = updateEmployee.bind(null, employee._id);
  const [state, formAction, pending] = useActionState(
    updateEmployeeWithId,
    initialActionState
  );

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-white/60 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Edit Employee</h2>
        <p className="mt-1 text-sm text-slate-500">Update employee information.</p>
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          defaultValue={employee.name}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
        />
        {state.errors?.name?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="position" className="mb-2 block text-sm font-medium text-slate-700">
          Position
        </label>
        <input
          id="position"
          name="position"
          required
          minLength={2}
          defaultValue={employee.position}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
        />
        {state.errors?.position?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.errors.position[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="salary" className="mb-2 block text-sm font-medium text-slate-700">
          Salary
        </label>
        <input
          id="salary"
          name="salary"
          type="number"
          min="1"
          required
          defaultValue={employee.salary}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
        />
        {state.errors?.salary?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.errors.salary[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="departmentId" className="mb-2 block text-sm font-medium text-slate-700">
          Department
        </label>
        <select
          id="departmentId"
          name="departmentId"
          required
          defaultValue={employee.department?._id ?? ""}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
        >
          <option value="" disabled>
            Select department
          </option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
        {state.errors?.departmentId?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.errors.departmentId[0]}</p>
        )}
      </div>

      {state.message && (
        <p className={`text-sm ${state.success ? "text-emerald-700" : "text-red-600"}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-70"
      >
        {pending ? "Updating..." : "Update Employee"}
      </button>
    </form>
  );
}