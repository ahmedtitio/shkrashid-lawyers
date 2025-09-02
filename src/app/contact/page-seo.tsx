import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { ContactPage } from '../components/pages/ContactPage';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    const settingsData = JSON.parse(data);

    return {
      title: `Contact Us - ${settingsData?.seo?.title || "Sheikh Rashid Bin Nasser Al Nuaimi Law Firm"}`,
      description: "Get in touch with our experienced legal team. Contact us for legal consultations, appointments, and professional legal services in the UAE.",
      keywords: "contact us, legal consultation, UAE lawyers, law firm Dubai, legal services contact",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  } catch (error) {
    console.error("Error fetching settings for metadata:", error);
    return {
      title: "Contact Us - Sheikh Rashid Bin Nasser Al Nuaimi Law Firm",
      description: "Get in touch with our experienced legal team. Contact us for legal consultations, appointments, and professional legal services in the UAE.",
      keywords: "contact us, legal consultation, UAE lawyers, law firm Dubai, legal services contact",
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png"
      }
    };
  }
}

export default function Contact() {
  return <ContactPage onConsultationClick={() => {}} />;
}
