"use client";

type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({ message, type = "success" }: ToastProps) {
  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${styles}`}
    >
      {message}
    </div>
  );
}