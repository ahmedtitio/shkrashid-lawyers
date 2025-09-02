import type { Metadata } from "next";
import "../../globals.css";

// Dashboard-specific layout for admin pages
export const metadata: Metadata = {
  title: "لوحة تحكم الإدارة - Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
  description: "لوحة تحكم الإدارة لموقع المحامي الشيخ راشد بن ناصر النعيمي",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
