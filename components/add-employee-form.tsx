"use client";

import { useActionState, useEffect, useRef } from "react";
import { addEmployee } from "@/app/actions";
import Toast from "@/components/toast";
import type { Department } from "@/lib/queries";

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

export default function AddEmployeeForm({
  departments,
}: {
  departments: Department[];
}) {
  const [state, formAction, pending] = useActionState(addEmployee, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5 rounded-3xl border border-white/60 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Add Employee</h2>
        <p className="mt-1 text-sm text-slate-500">Create a new employee record.</p>
      </div>

      {state.message && (
        <Toast
          message={state.message}
          type={state.success ? "success" : "error"}
        />
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          placeholder="Enter employee name"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
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
          placeholder="Enter position"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
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
          placeholder="Enter salary"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
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
          defaultValue=""
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
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

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-70"
      >
        {pending ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
}