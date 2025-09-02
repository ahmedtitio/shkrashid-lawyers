import type { Metadata } from "next";
import "../globals.css";

// Admin-specific layout that doesn't inherit global providers
export const metadata: Metadata = {
  title: "لوحة تحكم الإدارة - Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
  description: "لوحة تحكم الإدارة لموقع المحامي الشيخ راشد بن ناصر النعيمي",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" dir="rtl" lang="ar">
      {/* Admin pages use fixed Arabic language and light theme */}
      {children}
    </div>
  );
}
