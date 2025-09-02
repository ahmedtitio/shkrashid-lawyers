import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { AboutPage } from '../components/pages/AboutPage';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    const settingsData = JSON.parse(data);

    return {
      title: `About Us - ${settingsData?.seo?.title || "Sheikh Rashid Bin Nasser Al Nuaimi Law Firm"}`,
      description: "Learn about our experienced legal team and our commitment to providing exceptional legal services in the UAE. Discover our expertise in various areas of law.",
      keywords: "about us, legal team, UAE lawyers, legal expertise, law firm Dubai",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  } catch (error) {
    console.error("Error fetching settings for metadata:", error);
    return {
      title: "About Us - Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
      description: "Learn about our experienced legal team and our commitment to providing exceptional legal services in the UAE.",
      keywords: "about us, legal team, UAE lawyers, legal expertise, law firm Dubai",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  }
}

export default function About() {
  return <AboutPage />;
}
