import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Directory",
  description: "High-performance employee directory built with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%)]">
          {children}
        </div>
      </body>
    </html>
  );
}