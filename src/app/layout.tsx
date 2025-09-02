import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { SettingsProvider } from "./components/SettingsProvider";
import fs from 'fs';
import path from 'path';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    const settingsData = JSON.parse(data);

    return {
      title: settingsData?.seo?.title || "Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
      description: settingsData?.seo?.description || "Expert Legal Services in the UAE",
      keywords: settingsData?.seo?.keywords || "law firm, legal services, UAE, Dubai, lawyer",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  } catch (error) {
    console.error("Error fetching settings for metadata:", error);
    return {
      title: "Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
      description: "Expert Legal Services in the UAE",
      keywords: "law firm, legal services, UAE, Dubai, lawyer",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <SettingsProvider>
              {children}
            </SettingsProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
