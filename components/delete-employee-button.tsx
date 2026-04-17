"use client";

import { useState, useTransition } from "react";
import { deleteEmployee } from "@/app/actions";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/confirm-modal";

export default function DeleteEmployeeButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteEmployee(id);
      setOpen(false);
      router.push("/");
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={pending}
        className="rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-70"
      >
        Delete Employee
      </button>

      <ConfirmModal
        open={open}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={pending}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}