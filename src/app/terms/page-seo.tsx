import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { TermsPage } from '../components/pages/TermsPage';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    const settingsData = JSON.parse(data);

    return {
      title: `Terms and Conditions - ${settingsData?.seo?.title || "Sheikh Rashid Bin Nasser Al Nuaimi Law Firm"}`,
      description: "Read our terms and conditions for legal services. Understand our professional standards, client responsibilities, and service agreements.",
      keywords: "terms and conditions, legal terms, service agreement, client terms, UAE law firm terms",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  } catch (error) {
    console.error("Error fetching settings for metadata:", error);
    return {
      title: "Terms and Conditions - Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
      description: "Read our terms and conditions for legal services. Understand our professional standards, client responsibilities, and service agreements.",
      keywords: "terms and conditions, legal terms, service agreement, client terms, UAE law firm terms",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  }
}

export default function Terms() {
  return <TermsPage />;
}
