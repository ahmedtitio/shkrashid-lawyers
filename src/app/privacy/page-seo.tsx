import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { PrivacyPage } from '../components/pages/PrivacyPage';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    const settingsData = JSON.parse(data);

    return {
      title: `Privacy Policy - ${settingsData?.seo?.title || "Sheikh Rashid Bin Nasser Al Nuaimi Law Firm"}`,
      description: "Learn about our privacy policy and how we protect your personal information. We are committed to maintaining the confidentiality and security of client data.",
      keywords: "privacy policy, data protection, legal privacy, client confidentiality, UAE law firm privacy",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  } catch (error) {
    console.error("Error fetching settings for metadata:", error);
    return {
      title: "Privacy Policy - Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
      description: "Learn about our privacy policy and how we protect your personal information. We are committed to maintaining the confidentiality and security of client data.",
      keywords: "privacy policy, data protection, legal privacy, client confidentiality, UAE law firm privacy",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  }
}

export default function Privacy() {
  return <PrivacyPage />;
}
