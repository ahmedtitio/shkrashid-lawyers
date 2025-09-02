import fs from 'fs-extra';
import path from 'path';

interface SettingsData {
  contact: {
    phone: string;
    mobile: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  officeHours: Array<{
    day: string;
    hours: string;
  }>;
  socialMedia: {
    instagram: string;
    whatsapp: string;
    linkedin: string;
    facebook: string;
  };
  whatsappFloat: {
    url: string;
    enabled: boolean;
  };
  navigation: {
    home: string;
    about: string;
    contact: string;
    terms: string;
    privacy: string;
  };
  buttons: {
    consultation: {
      text: string;
      url: string;
    };
    services: {
      text: string;
      url: string;
    };
    contact: {
      text: string;
      url: string;
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

class SettingsStorage {
  private settingsFilePath: string;
  private defaultSettings: SettingsData;

  constructor() {
    // إنشاء مجلد البيانات إذا لم يكن موجوداً
    const dataDir = path.join(process.cwd(), 'data');
    fs.ensureDirSync(dataDir);

    this.settingsFilePath = path.join(dataDir, 'settings.json');

    // الإعدادات الافتراضية
    this.defaultSettings = {
      contact: {
        phone: '044475234',
        mobile: '+971 58 388 3441',
        email: 'rashidalnuimiest@gmail.com',
        address: 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303',
        mapUrl: 'https://maps.google.com/?q=UAE+Dubai+Oud+Metha+Malaysia+Trade+Centre'
      },
      officeHours: [
        { day: 'mondayThursday', hours: '9:00 AM - 6:00 PM' },
        { day: 'friday', hours: '9:00 AM - 1:00 PM' },
        { day: 'weekend', hours: 'Closed' }
      ],
      socialMedia: {
        instagram: 'https://instagram.com/shkrashidlawyers',
        whatsapp: 'https://wa.me/971583883441',
        linkedin: 'https://linkedin.com/company/shkrashidlawyers',
        facebook: 'https://facebook.com/shkrashidlawyers'
      },
      whatsappFloat: {
        url: 'https://wa.me/971583883441?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services.',
        enabled: true
      },
      navigation: {
        home: '/',
        about: '/about',
        contact: '/contact',
        terms: '/terms',
        privacy: '/privacy'
      },
      buttons: {
        consultation: {
          text: 'Free Legal Consultation',
          url: '#consultation'
        },
        services: {
          text: 'Our Services',
          url: '#services'
        },
        contact: {
          text: 'Contact Us',
          url: '/contact'
        }
      },
      seo: {
        title: 'Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - UAE Legal Services',
        description: 'Expert legal services in UAE including commercial law, arbitration, family law, and more. Professional legal consultation and representation.',
        keywords: 'law firm UAE, legal services Dubai, commercial law, family law, criminal law, real estate law'
      }
    };

    // تحميل الإعدادات عند التهيئة
    this.loadSettings();
  }

  private async loadSettings(): Promise<void> {
    try {
      if (await fs.pathExists(this.settingsFilePath)) {
        const data = await fs.readJson(this.settingsFilePath);
        // دمج الإعدادات المحفوظة مع الافتراضية
        this.defaultSettings = { ...this.defaultSettings, ...data.settings };
      } else {
        // إنشاء ملف الإعدادات الأولي
        await this.saveSettings();
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // في حالة الخطأ، استخدم الإعدادات الافتراضية
    }
  }

  private async saveSettings(): Promise<void> {
    try {
      await fs.writeJson(this.settingsFilePath, {
        settings: this.defaultSettings,
        lastUpdated: new Date().toISOString()
      }, { spaces: 2 });
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  // جلب جميع الإعدادات
  async getSettings(): Promise<SettingsData> {
    return { ...this.defaultSettings };
  }

  // تحديث الإعدادات
  async updateSettings(newSettings: Partial<SettingsData>): Promise<SettingsData> {
    this.defaultSettings = { ...this.defaultSettings, ...newSettings };
    await this.saveSettings();
    return { ...this.defaultSettings };
  }

  // تحديث قسم معين من الإعدادات
  async updateSection(section: keyof SettingsData, data: Record<string, unknown>): Promise<SettingsData> {
    const currentSection = this.defaultSettings[section];
    if (typeof currentSection === 'object' && currentSection !== null) {
      (this.defaultSettings as unknown as Record<keyof SettingsData, Record<string, unknown>>)[section] = {
        ...currentSection,
        ...data
      };
    }
    await this.saveSettings();
    return { ...this.defaultSettings };
  }

  // إعادة تعيين الإعدادات للإعدادات الافتراضية
  async resetToDefaults(): Promise<SettingsData> {
    this.defaultSettings = {
      contact: {
        phone: '044475234',
        mobile: '+971 58 388 3441',
        email: 'rashidalnuimiest@gmail.com',
        address: 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303',
        mapUrl: 'https://maps.google.com/?q=UAE+Dubai+Oud+Metha+Malaysia+Trade+Centre'
      },
      officeHours: [
        { day: 'mondayThursday', hours: '9:00 AM - 6:00 PM' },
        { day: 'friday', hours: '9:00 AM - 1:00 PM' },
        { day: 'weekend', hours: 'Closed' }
      ],
      socialMedia: {
        instagram: 'https://instagram.com/shkrashidlawyers',
        whatsapp: 'https://wa.me/971583883441',
        linkedin: 'https://linkedin.com/company/shkrashidlawyers',
        facebook: 'https://facebook.com/shkrashidlawyers'
      },
      whatsappFloat: {
        url: 'https://wa.me/971583883441?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services.',
        enabled: true
      },
      navigation: {
        home: '/',
        about: '/about',
        contact: '/contact',
        terms: '/terms',
        privacy: '/privacy'
      },
      buttons: {
        consultation: {
          text: 'Free Legal Consultation',
          url: '#consultation'
        },
        services: {
          text: 'Our Services',
          url: '#services'
        },
        contact: {
          text: 'Contact Us',
          url: '/contact'
        }
      },
      seo: {
        title: 'Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - UAE Legal Services',
        description: 'Expert legal services in UAE including commercial law, arbitration, family law, and more. Professional legal consultation and representation.',
        keywords: 'law firm UAE, legal services Dubai, commercial law, family law, criminal law, real estate law'
      }
    };

    await this.saveSettings();
    return { ...this.defaultSettings };
  }
}

// إنشاء instance واحد من SettingsStorage
const settingsStorage = new SettingsStorage();

export default settingsStorage;
export type { SettingsData };
