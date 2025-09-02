'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface SettingsContextType {
  settings: SettingsData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async (cacheBust = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const url = cacheBust ? `/api/settings?t=${Date.now()}` : '/api/settings';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      setSettings(data.settings);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Listen for settings update events from admin panel
  useEffect(() => {
    const handleSettingsUpdate = () => {
      fetchSettings(true); // Use cache busting when triggered by admin
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('settingsUpdated', handleSettingsUpdate);
      return () => window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    }
  }, []);

  const refetch = async () => {
    await fetchSettings(true); // Use cache busting when refetching
  };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error, refetch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
