'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Separator } from '../../../components/ui/separator';
import { toast } from 'sonner';
import { Toaster } from '../../../components/ui/sonner';
import {
  Save,
  Phone,
  Clock,
  MessageSquare,
  Globe,
  Home,
  Settings,
  ArrowLeft
} from 'lucide-react';

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

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    loadSettings();
  }, [router]);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('حدث خطأ في تحميل الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      toast.success('تم حفظ الإعدادات بنجاح', {
        description: 'تم حفظ جميع التغييرات في قاعدة البيانات',
        duration: 4000,
      });

      // Notify frontend to refresh settings
      if (typeof window !== 'undefined') {
        localStorage.setItem('settings_updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('settingsUpdated'));
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('فشل في حفظ الإعدادات', {
        description: 'حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى',
        duration: 6000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (section: keyof SettingsData, field: string, value: string | boolean) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  const updateNestedSetting = (section: keyof SettingsData, subsection: string, field: string, value: string) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [subsection]: {
          ...(settings[section] as Record<string, Record<string, string>>)[subsection],
          [field]: value,
        },
      },
    });
  };

  const updateOfficeHours = (index: number, field: string, value: string) => {
    if (!settings) return;

    const updatedHours = [...settings.officeHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };

    setSettings({
      ...settings,
      officeHours: updatedHours,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">فشل في تحميل الإعدادات</p>
        </div>
      </div>
    );
  }



  const tabs = [
    { id: 'contact', label: 'معلومات الاتصال', icon: Phone },
    { id: 'hours', label: 'ساعات العمل', icon: Clock },
    { id: 'social', label: 'وسائل التواصل', icon: Globe },
    { id: 'whatsapp', label: 'واتساب العائم', icon: MessageSquare },
    { id: 'navigation', label: 'التنقل', icon: Home },
    { id: 'buttons', label: 'الأزرار', icon: Settings },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'clearCache', label: 'مسح الكاش', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة للوحة التحكم
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h1>
                <p className="text-sm text-gray-600">إدارة إعدادات الموقع والمحتوى</p>
              </div>
            </div>
              <Button
                onClick={saveSettings}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
              </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الأقسام</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
            <div className="mt-4 px-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة إلى لوحة التحكم
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </CardTitle>
                <CardDescription>
                  قم بتعديل إعدادات هذا القسم
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Information */}
                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          value={settings.contact.phone}
                          onChange={(e) => updateSetting('contact', 'phone', e.target.value)}
                          placeholder="044475234"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile">رقم الجوال</Label>
                        <Input
                          id="mobile"
                          value={settings.contact.mobile}
                          onChange={(e) => updateSetting('contact', 'mobile', e.target.value)}
                          placeholder="+971 58 388 3441"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.contact.email}
                        onChange={(e) => updateSetting('contact', 'email', e.target.value)}
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">العنوان</Label>
                      <Textarea
                        id="address"
                        value={settings.contact.address}
                        onChange={(e) => updateSetting('contact', 'address', e.target.value)}
                        placeholder="العنوان الكامل"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mapUrl">رابط الخريطة</Label>
                      <Input
                        id="mapUrl"
                        value={settings.contact.mapUrl}
                        onChange={(e) => updateSetting('contact', 'mapUrl', e.target.value)}
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                  </div>
                )}

                {/* Office Hours */}
                {activeTab === 'hours' && (
                  <div className="space-y-4">
                    {settings.officeHours.map((hours, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-48">
                          <Label>
                            {hours.day === 'mondayThursday' && 'الاثنين - الخميس'}
                            {hours.day === 'friday' && 'الجمعة'}
                            {hours.day === 'weekend' && 'السبت - الأحد'}
                          </Label>
                        </div>
                        <Input
                          value={hours.hours}
                          onChange={(e) => updateOfficeHours(index, 'hours', e.target.value)}
                          placeholder="09:00 am – 04:00 pm"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Social Media */}
                {activeTab === 'social' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="instagram">إنستغرام</Label>
                      <Input
                        id="instagram"
                        value={settings.socialMedia.instagram}
                        onChange={(e) => updateSetting('socialMedia', 'instagram', e.target.value)}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">واتساب</Label>
                      <Input
                        id="whatsapp"
                        value={settings.socialMedia.whatsapp}
                        onChange={(e) => updateSetting('socialMedia', 'whatsapp', e.target.value)}
                        placeholder="https://wa.me/971..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">لينكد إن</Label>
                      <Input
                        id="linkedin"
                        value={settings.socialMedia.linkedin}
                        onChange={(e) => updateSetting('socialMedia', 'linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook">فيسبوك</Label>
                      <Input
                        id="facebook"
                        value={settings.socialMedia.facebook}
                        onChange={(e) => updateSetting('socialMedia', 'facebook', e.target.value)}
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                  </div>
                )}

                {/* WhatsApp Float */}
                {activeTab === 'whatsapp' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="whatsappEnabled">تفعيل زر واتساب العائم</Label>
                      <Switch
                        id="whatsappEnabled"
                        checked={settings.whatsappFloat.enabled}
                        onCheckedChange={(checked) => updateSetting('whatsappFloat', 'enabled', checked)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsappUrl">رابط واتساب</Label>
                      <Input
                        id="whatsappUrl"
                        value={settings.whatsappFloat.url}
                        onChange={(e) => updateSetting('whatsappFloat', 'url', e.target.value)}
                        placeholder="https://wa.me/971..."
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {activeTab === 'navigation' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="navHome">الصفحة الرئيسية</Label>
                      <Input
                        id="navHome"
                        value={settings.navigation.home}
                        onChange={(e) => updateSetting('navigation', 'home', e.target.value)}
                        placeholder="/"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navAbout">من نحن</Label>
                      <Input
                        id="navAbout"
                        value={settings.navigation.about}
                        onChange={(e) => updateSetting('navigation', 'about', e.target.value)}
                        placeholder="/about"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navContact">اتصل بنا</Label>
                      <Input
                        id="navContact"
                        value={settings.navigation.contact}
                        onChange={(e) => updateSetting('navigation', 'contact', e.target.value)}
                        placeholder="/contact"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navTerms">الشروط والأحكام</Label>
                      <Input
                        id="navTerms"
                        value={settings.navigation.terms}
                        onChange={(e) => updateSetting('navigation', 'terms', e.target.value)}
                        placeholder="/terms"
                      />
                    </div>
                    <div>
                      <Label htmlFor="navPrivacy">سياسة الخصوصية</Label>
                      <Input
                        id="navPrivacy"
                        value={settings.navigation.privacy}
                        onChange={(e) => updateSetting('navigation', 'privacy', e.target.value)}
                        placeholder="/privacy"
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                {activeTab === 'buttons' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">زر الاستشارة</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="consultationText">نص الزر</Label>
                          <Input
                            id="consultationText"
                            value={settings.buttons.consultation.text}
                            onChange={(e) => updateNestedSetting('buttons', 'consultation', 'text', e.target.value)}
                            placeholder="Free Legal Consultation"
                          />
                        </div>
                        <div>
                          <Label htmlFor="consultationUrl">رابط الزر</Label>
                          <Input
                            id="consultationUrl"
                            value={settings.buttons.consultation.url}
                            onChange={(e) => updateNestedSetting('buttons', 'consultation', 'url', e.target.value)}
                            placeholder="#consultation"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">زر الخدمات</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="servicesText">نص الزر</Label>
                          <Input
                            id="servicesText"
                            value={settings.buttons.services.text}
                            onChange={(e) => updateNestedSetting('buttons', 'services', 'text', e.target.value)}
                            placeholder="View Our Services"
                          />
                        </div>
                        <div>
                          <Label htmlFor="servicesUrl">رابط الزر</Label>
                          <Input
                            id="servicesUrl"
                            value={settings.buttons.services.url}
                            onChange={(e) => updateNestedSetting('buttons', 'services', 'url', e.target.value)}
                            placeholder="#services"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">زر الاتصال</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="contactText">نص الزر</Label>
                          <Input
                            id="contactText"
                            value={settings.buttons.contact.text}
                            onChange={(e) => updateNestedSetting('buttons', 'contact', 'text', e.target.value)}
                            placeholder="Get in Touch"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactUrl">رابط الزر</Label>
                          <Input
                            id="contactUrl"
                            value={settings.buttons.contact.url}
                            onChange={(e) => updateNestedSetting('buttons', 'contact', 'url', e.target.value)}
                            placeholder="/contact"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* SEO */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle">عنوان الموقع</Label>
                    <Input
                      id="seoTitle"
                      value={settings.seo.title}
                      onChange={(e) => updateSetting('seo', 'title', e.target.value)}
                      placeholder="Sheikh Rashid Bin Nasser Al Nuaimi Law Firm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription">وصف الموقع</Label>
                    <Textarea
                      id="seoDescription"
                      value={settings.seo.description}
                      onChange={(e) => updateSetting('seo', 'description', e.target.value)}
                      placeholder="Expert Legal Services in the UAE"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoKeywords">الكلمات المفتاحية</Label>
                    <Input
                      id="seoKeywords"
                      value={settings.seo.keywords}
                      onChange={(e) => updateSetting('seo', 'keywords', e.target.value)}
                      placeholder="law firm, legal services, UAE, Dubai, lawyer"
                    />
                  </div>
                </div>
              )}

              {/* Cache Clearing */}
              {activeTab === 'clearCache' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">مسح الكاش</h3>
                    <p className="text-blue-700 mb-4">
                      يمكنك مسح الكاش لتحسين أداء الموقع وضمان عرض أحدث المحتويات. هذا سيؤدي إلى تحديث جميع البيانات المخزنة مؤقتاً.
                    </p>
                    <Button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/admin/cache/clear', {
                            method: 'POST',
                            headers: {
                              'x-admin-logged-in': 'true',
                            },
                          });
                          if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'فشل في مسح الكاش');
                          }
                          const data = await response.json();
                          toast.success(data.message || 'تم مسح الكاش بنجاح', {
                            description: `تم مسح: ${data.operations?.join(', ') || 'جميع أنواع الكاش'}`,
                            duration: 5000,
                          });
                        } catch (error: unknown) {
                          if (error instanceof Error) {
                            toast.error(error.message);
                          } else {
                            toast.error('حدث خطأ أثناء مسح الكاش');
                          }
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      مسح الكاش الآن
                    </Button>
                  </div>
                </div>
              )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>

              {/* Toast Notifications */}
              <Toaster position="top-right" />
            </div>
          );
        }
