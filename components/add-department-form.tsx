"use client";

import { useActionState, useEffect, useRef } from "react";
import { addDepartment } from "@/app/actions";
import Toast from "@/components/toast";

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

export default function AddDepartmentForm() {
  const [state, formAction, pending] = useActionState(addDepartment, initialActionState);
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
        <h2 className="text-2xl font-bold text-slate-900">Add Department</h2>
        <p className="mt-1 text-sm text-slate-500">Create a new department.</p>
      </div>

      {state.message && (
        <Toast
          message={state.message}
          type={state.success ? "success" : "error"}
        />
      )}

      <div>
        <label htmlFor="department-name" className="mb-2 block text-sm font-medium text-slate-700">
          Department Name
        </label>
        <input
          id="department-name"
          name="name"
          required
          minLength={2}
          placeholder="Enter department name"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
        />
        {state.errors?.name?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="floor" className="mb-2 block text-sm font-medium text-slate-700">
          Floor
        </label>
        <input
          id="floor"
          name="floor"
          type="number"
          min="1"
          required
          placeholder="Enter floor number"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
        />
        {state.errors?.floor?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.errors.floor[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-70"
      >
        {pending ? "Adding..." : "Add Department"}
      </button>
    </form>
  );
}