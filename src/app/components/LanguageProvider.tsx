"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.consultation': 'Free Consultation',

    // Header contact info
    'header.email': 'Email',
    'header.phone': 'Phone',
    'header.mobile': 'Mobile',
    'header.address': 'Address',

    // Consultation form
    'consultation.title': 'Free Legal Consultation',
    'consultation.description': 'Please fill out the form below and we will get back to you within 24 hours.',
    'consultation.personalInfo': 'Personal Information',
    'consultation.firstName': 'First Name',
    'consultation.lastName': 'Last Name',
    'consultation.email': 'Email Address',
    'consultation.phone': 'Phone Number',
    'consultation.topic': 'Consultation Topic',
    'consultation.message': 'Message',
    'consultation.submit': 'Submit Consultation',
    'consultation.cancel': 'Cancel',
    'consultation.success': 'Thank you! Your consultation request has been submitted.',
    'consultation.topicPlaceholder': 'Select consultation topic',
    'consultation.messagePlaceholder': 'Please describe your legal matter in detail...',
    'consultation.submitting': 'Submitting...',
    'consultation.verificationQuestion': 'What is 2 + 3? (Enter the number)',
    'consultation.verificationError': 'Please answer the verification question correctly.',

    // Consultation topics
    'topics.civilLaw': 'Civil Law',
    'topics.commercialLaw': 'Commercial Law',
    'topics.criminalLaw': 'Criminal Law',
    'topics.familyLaw': 'Family Law',
    'topics.realEstateLaw': 'Real Estate Law',
    'topics.employmentLaw': 'Employment Law',
    'topics.corporateLaw': 'Corporate Law',
    'topics.immigrationLaw': 'Immigration Law',
    'topics.intellectualProperty': 'Intellectual Property',
    'topics.other': 'Other',

    // Footer
    'footer.contact': 'Contact Information',
    'footer.quickLinks': 'Quick Links',
    'footer.social': 'Follow Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms and Conditions',
    'footer.rights': '© 2024 Sheikh Rashid Bin Nasser Al Nuaimi Law Firm. All rights reserved.',

    // Pages
    'home.title': 'Sheikh Rashid Bin Nasser Al Nuaimi Law Firm',
    'home.subtitle': 'Expert Legal Services in the UAE',
    'about.title': 'About Us',
    'contact.title': 'Contact Us',
    'privacy.title': 'Privacy Policy',
    'terms.title': 'Terms and Conditions',

    // Error messages
    'errors.invalidEmail': 'Please enter a valid email address.',
    'errors.rateLimited': 'Please wait a moment before submitting another consultation.',
    'errors.general': 'An error occurred. Please try again.',

    // WhatsApp
    'whatsapp.title': 'Contact via WhatsApp',
    'whatsapp.description': 'Send us a message on WhatsApp for quick legal consultation.',
    'whatsapp.messageLabel': 'Your Message',
    'whatsapp.messagePlaceholder': 'Type your message here...',
    'whatsapp.quickMessages': 'Quick Messages',
    'whatsapp.template1': 'I need legal consultation regarding...',
    'whatsapp.template2': 'I would like to schedule an appointment.',
    'whatsapp.template3': 'I have a question about legal services.',
    'whatsapp.send': 'Send via WhatsApp',
    'whatsapp.cancel': 'Cancel',
    'whatsapp.defaultMessage': 'Hello, I would like to inquire about your legal services.',

    // Services
    'services.title': 'Our Legal Services',
    'services.subtitle': 'Comprehensive legal solutions with expertise and dedication',
    'services.commercial': 'Commercial Law',
    'services.commercial.desc': 'Expert handling of business disputes, contracts, and commercial transactions.',
    'services.arbitration': 'International Arbitration',
    'services.arbitration.desc': 'Specialized representation in complex international arbitration cases.',
    'services.family': 'Family Law',
    'services.family.desc': 'Compassionate guidance through family legal matters and personal disputes.',
    'services.formation': 'Company Formation',
    'services.formation.desc': 'Complete assistance in establishing and structuring business entities.',
    'services.contracts': 'Contract Drafting',
    'services.contracts.desc': 'Professional drafting and review of legal agreements and contracts.',
    'services.criminal': 'Criminal Law',
    'services.criminal.desc': 'Strong defense representation in criminal proceedings and investigations.',
    'services.civil': 'Civil Litigation',
    'services.civil.desc': 'Effective representation in civil disputes and court proceedings.',
    'services.real': 'Real Estate Law',
    'services.real.desc': 'Comprehensive legal services for property transactions and disputes.',
    'services.employment': 'Employment Law',
    'services.employment.desc': 'Legal guidance on workplace rights, contracts, and employment disputes.',
    'services.banking': 'Banking & Finance',
    'services.banking.desc': 'Expert advice on financial regulations, banking law, and investment matters.',
    'services.intellectual': 'Intellectual Property',
    'services.intellectual.desc': 'Protection and enforcement of patents, trademarks, and copyrights.',
    'services.insurance': 'Insurance Law',
    'services.insurance.desc': 'Specialized representation in insurance claims and coverage disputes.',
    'services.maritime': 'Maritime Law',
    'services.maritime.desc': 'Expert handling of shipping, maritime commerce, and admiralty matters.',
    'services.tax': 'Tax Law',
    'services.tax.desc': 'Comprehensive tax planning, compliance, and dispute resolution services.',

    // Stats section
    'stats.title': 'Our Track Record',
    'stats.subtitle': 'Years of excellence in legal practice with proven results',
    'stats.cases': 'Successful Cases',
    'stats.experience': 'Years of Experience',
    'stats.clients': 'Satisfied Clients',
    'stats.rate': 'Success Rate',

    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'What our clients say about our legal services',

    // Companies
    'companies.title': 'Trusted by Leading Organizations',

    // Hero sections
    'hero.home.title': 'Excellence in Legal Practice',
    'hero.home.subtitle': 'Providing comprehensive legal solutions with integrity and expertise',
    'hero.about.title': 'About Our Firm',
    'hero.about.subtitle': 'Discover our commitment to legal excellence and client service',
    'hero.contact.title': 'Get in Touch',
    'hero.contact.subtitle': 'Contact us today for professional legal consultation',

    // Contact hours
    'contact.hours.mondayThursday': 'Monday – Thursday',
    'contact.hours.friday': 'Friday',
    'contact.hours.weekend': 'Saturday – Sunday',
    'contact.hours.closed': 'Closed',

    // Contact page
    'contact.getInTouch': 'Get in Touch',
    'contact.phoneNumbers': 'Phone Numbers',
    'contact.office': 'Office',
    'contact.mobile': 'Mobile',
    'contact.emailAddress': 'Email Address',
    'contact.officeAddress': 'Office Address',
    'contact.officeHours': 'Office Hours',
    'contact.quickContact': 'Quick Contact',
    'contact.needImmediateAssistance': 'Need Immediate Legal Assistance?',
    'contact.quickContactMessage': 'Our legal team is available to provide immediate assistance for your legal needs.',
    'contact.callNow': 'Call Now',
    'contact.whatsapp': 'WhatsApp',
    'contact.location': 'Location',
    'contact.mapPlaceholder': 'Interactive map to be added',
    'contact.locationName': 'Malaysia Trade Centre, Dubai',
    'contact.connectWithUs': 'Connect With Us',
    'contact.instagram': 'Instagram',
    'contact.whatsappBusiness': 'WhatsApp Business',
    'contact.interactiveMap': 'Interactive map to be added',
    'contact.malaysiaTradeCentre': 'Malaysia Trade Centre, Dubai',
    'contact.getDirections': 'Get Directions',

    // CTA section
    'cta.title': 'Need Legal Assistance?',
    'cta.subtitle': 'Contact us today for professional legal consultation and expert guidance.',
    'cta.consultation': 'Get Your Free Consultation',
    'cta.services': 'View Our Services',

    // About page
    'about.sheikh.title': 'About Sheikh Rashid bin Nasser Al Nuaimi',
    'about.sheikh.bio1': 'Welcome to our prestigious law firm—one of the UAE\'s most successful legal institutions. We pride ourselves on a deep-rooted commitment to excellence, integrity, and innovation.',
    'about.sheikh.bio2': 'With years of experience navigating complex legal landscapes, our team of dedicated professionals delivers bespoke solutions tailored to meet the diverse needs of our clients.',
    'about.sheikh.bio3': 'We combine a profound understanding of both local and international laws with a passion for justice, ensuring that every client receives personalized, results-driven representation.',
    'about.qualifications.title': 'Qualifications & Experience',
    'about.qualifications.education': 'Education',
    'about.qualifications.education.desc': 'Advanced legal education from prestigious institutions',
    'about.qualifications.certifications': 'Certifications',
    'about.qualifications.certifications.desc': 'Professional legal certifications and memberships',
    'about.qualifications.experience': 'Experience',
    'about.qualifications.experience.desc': 'Over 20 years of legal practice and expertise',
    'about.qualifications.jurisdictions': 'Jurisdictions',
    'about.qualifications.jurisdictions.desc': 'Licensed to practice in UAE and international jurisdictions',
    'about.values.title': 'Our Values & Mission',
    'about.values.mission': 'To provide exceptional legal services with integrity, excellence, and client-focused solutions.',
    'about.values.integrity': 'Integrity',
    'about.values.integrity.desc': 'We uphold the highest ethical standards in all our legal practices.',
    'about.values.excellence': 'Excellence',
    'about.values.excellence.desc': 'We strive for excellence in every case and client interaction.',
    'about.values.client': 'Client Focus',
    'about.values.client.desc': 'Our clients\' needs and satisfaction are our top priority.',
    'about.practice.title': 'Areas of Practice',
    'about.practice.intro': 'We offer comprehensive legal services across various practice areas.',
    'about.practice.commercial': 'Commercial Law',
    'about.practice.arbitration': 'International Arbitration',
    'about.practice.family': 'Family Law',
    'about.practice.corporate': 'Corporate Law',
    'about.practice.criminal': 'Criminal Law',
    'about.practice.real': 'Real Estate Law',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.consultation': 'استشارة مجانية',

    // Header contact info
    'header.email': 'البريد الإلكتروني',
    'header.phone': 'الهاتف',
    'header.mobile': 'الجوال',
    'header.address': 'العنوان',

    // Consultation form
    'consultation.title': 'استشارة قانونية مجانية',
    'consultation.description': 'يرجى ملء النموذج أدناه وسنعود إليك خلال 24 ساعة.',
    'consultation.personalInfo': 'المعلومات الشخصية',
    'consultation.firstName': 'الاسم الأول',
    'consultation.lastName': 'اسم العائلة',
    'consultation.email': 'عنوان البريد الإلكتروني',
    'consultation.phone': 'رقم الهاتف',
    'consultation.topic': 'موضوع الاستشارة',
    'consultation.message': 'الرسالة',
    'consultation.submit': 'إرسال الاستشارة',
    'consultation.cancel': 'إلغاء',
    'consultation.success': 'شكراً لك! تم إرسال طلب الاستشارة بنجاح.',
    'consultation.topicPlaceholder': 'اختر موضوع الاستشارة',
    'consultation.messagePlaceholder': 'يرجى وصف مسألتك القانونية بالتفصيل...',
    'consultation.submitting': 'جاري الإرسال...',
    'consultation.verificationQuestion': 'كم ناتج 2 + 3؟ (أدخل الرقم)',
    'consultation.verificationError': 'يرجى الإجابة على سؤال التحقق بشكل صحيح.',

    // Consultation topics
    'topics.civilLaw': 'القانون المدني',
    'topics.commercialLaw': 'القانون التجاري',
    'topics.criminalLaw': 'القانون الجنائي',
    'topics.familyLaw': 'قانون الأسرة',
    'topics.realEstateLaw': 'قانون العقارات',
    'topics.employmentLaw': 'قانون العمل',
    'topics.corporateLaw': 'قانون الشركات',
    'topics.immigrationLaw': 'قانون الهجرة',
    'topics.intellectualProperty': 'الملكية الفكرية',
    'topics.other': 'أخرى',

    // Footer
    'footer.contact': 'معلومات الاتصال',
    'footer.quickLinks': 'روابط سريعة',
    'footer.social': 'تابعنا',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.rights': '© 2024 مكتب الشيخ راشد بن ناصر النعيمي للمحاماة. جميع الحقوق محفوظة.',

    // Pages
    'home.title': 'مكتب الشيخ راشد بن ناصر النعيمي للمحاماة',
    'home.subtitle': 'خدمات قانونية متخصصة في دولة الإمارات العربية المتحدة',
    'about.title': 'من نحن',
    'contact.title': 'اتصل بنا',
    'privacy.title': 'سياسة الخصوصية',
    'terms.title': 'الشروط والأحكام',

    // Error messages
    'errors.invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صالح.',
    'errors.rateLimited': 'يرجى الانتظار قليلاً قبل إرسال استشارة أخرى.',
    'errors.general': 'حدث خطأ. يرجى المحاولة مرة أخرى.',

    // WhatsApp
    'whatsapp.title': 'التواصل عبر واتساب',
    'whatsapp.description': 'أرسل لنا رسالة على واتساب للحصول على استشارة قانونية سريعة.',
    'whatsapp.messageLabel': 'رسالتك',
    'whatsapp.messagePlaceholder': 'اكتب رسالتك هنا...',
    'whatsapp.quickMessages': 'رسائل سريعة',
    'whatsapp.template1': 'أحتاج استشارة قانونية بخصوص...',
    'whatsapp.template2': 'أود حجز موعد للاستشارة.',
    'whatsapp.template3': 'لدي سؤال حول الخدمات القانونية.',
    'whatsapp.send': 'إرسال عبر واتساب',
    'whatsapp.cancel': 'إلغاء',
    'whatsapp.defaultMessage': 'مرحباً، أود الاستفسار عن خدماتكم القانونية.',

    // Services
    'services.title': 'خدماتنا القانونية',
    'services.subtitle': 'حلول قانونية شاملة بخبرة وتفان',
    'services.commercial': 'القانون التجاري',
    'services.commercial.desc': 'خبرة في التعامل مع المنازعات التجارية والعقود والمعاملات التجارية.',
    'services.arbitration': 'التحكيم الدولي',
    'services.arbitration.desc': 'تمثيل متخصص في قضايا التحكيم الدولي المعقدة.',
    'services.family': 'قانون الأسرة',
    'services.family.desc': 'إرشاد مفعم بالرحمة خلال القضايا القانونية الأسرية والمنازعات الشخصية.',
    'services.formation': 'تأسيس الشركات',
    'services.formation.desc': 'مساعدة كاملة في إنشاء وهيكلة الكيانات التجارية.',
    'services.contracts': 'صياغة العقود',
    'services.contracts.desc': 'صياغة ومراجعة مهنية للاتفاقيات والعقود القانونية.',
    'services.criminal': 'القانون الجنائي',
    'services.criminal.desc': 'تمثيل دفاعي قوي في الإجراءات الجنائية والتحقيقات.',
    'services.civil': 'التقاضي المدني',
    'services.civil.desc': 'تمثيل فعال في المنازعات المدنية وإجراءات المحكمة.',
    'services.real': 'قانون العقارات',
    'services.real.desc': 'خدمات قانونية شاملة لمعاملات العقارات والمنازعات.',
    'services.employment': 'قانون العمل',
    'services.employment.desc': 'إرشادات قانونية حول حقوق العمال والعقود ومنازعات العمل.',
    'services.banking': 'القانون المصرفي والمالي',
    'services.banking.desc': 'مشورة خبيرة في اللوائح المالية والقانون المصرفي وأمور الاستثمار.',
    'services.intellectual': 'الملكية الفكرية',
    'services.intellectual.desc': 'حماية وإنفاذ براءات الاختراع والعلامات التجارية وحقوق الطبع والنشر.',
    'services.insurance': 'قانون التأمين',
    'services.insurance.desc': 'تمثيل متخصص في مطالبات التأمين ومنازعات التغطية.',
    'services.maritime': 'القانون البحري',
    'services.maritime.desc': 'خبرة في التعامل مع الشحن والتجارة البحرية والمسائل البحرية.',
    'services.tax': 'القانون الضريبي',
    'services.tax.desc': 'خدمات شاملة للتخطيط الضريبي والامتثال وحل المنازعات.',

    // Stats section
    'stats.title': 'سجلنا الحافل',
    'stats.subtitle': 'سنوات من التميز في الممارسة القانونية مع نتائج مثبتة',
    'stats.cases': 'قضايا ناجحة',
    'stats.experience': 'سنوات من الخبرة',
    'stats.clients': 'عملاء راضون',
    'stats.rate': 'معدل النجاح',

    // Testimonials
    'testimonials.title': 'شهادات العملاء',
    'testimonials.subtitle': 'ما يقوله عملاؤنا عن خدماتنا القانونية',

    // Companies
    'companies.title': 'موثوق من قبل المؤسسات الرائدة',

    // Hero sections
    'hero.home.title': 'التميز في الممارسة القانونية',
    'hero.home.subtitle': 'تقديم حلول قانونية شاملة بنزاهة وخبرة',
    'hero.about.title': 'حول مكتبنا',
    'hero.about.subtitle': 'اكتشف التزامنا بالتميز القانوني وخدمة العملاء',
    'hero.contact.title': 'تواصل معنا',
    'hero.contact.subtitle': 'اتصل بنا اليوم للحصول على استشارة قانونية مهنية',

    // Contact hours
    'contact.hours.mondayThursday': 'الاثنين – الخميس',
    'contact.hours.friday': 'الجمعة',
    'contact.hours.weekend': 'السبت – الأحد',
    'contact.hours.closed': 'مغلق',

    // Contact page
    'contact.getInTouch': 'تواصل معنا',
    'contact.phoneNumbers': 'أرقام الهواتف',
    'contact.office': 'المكتب',
    'contact.mobile': 'الجوال',
    'contact.emailAddress': 'عنوان البريد الإلكتروني',
    'contact.officeAddress': 'عنوان المكتب',
    'contact.officeHours': 'ساعات العمل',
    'contact.quickContact': 'التواصل السريع',
    'contact.needImmediateAssistance': 'هل تحتاج مساعدة قانونية فورية؟',
    'contact.quickContactMessage': 'فريقنا القانوني متاح لتقديم المساعدة الفورية لاحتياجاتك القانونية.',
    'contact.callNow': 'اتصل الآن',
    'contact.whatsapp': 'واتساب',
    'contact.location': 'الموقع',
    'contact.mapPlaceholder': 'سيتم إضافة خريطة تفاعلية',
    'contact.locationName': 'مركز ماليزيا التجاري، دبي',
    'contact.connectWithUs': 'تواصل معنا',
    'contact.instagram': 'إنستغرام',
    'contact.whatsappBusiness': 'واتساب للأعمال',
    'contact.interactiveMap': 'سيتم إضافة خريطة تفاعلية',
    'contact.malaysiaTradeCentre': 'مركز ماليزيا التجاري، دبي',
    'contact.getDirections': 'الحصول على الاتجاهات',

    // CTA section
    'cta.title': 'هل تحتاج مساعدة قانونية؟',
    'cta.subtitle': 'اتصل بنا اليوم للحصول على استشارة قانونية مهنية وإرشاد خبير.',
    'cta.consultation': 'احصل على استشارتك المجانية',
    'cta.services': 'عرض خدماتنا',

    // About page
    'about.sheikh.title': 'حول الشيخ راشد بن ناصر النعيمي',
    'about.sheikh.bio1': 'مرحباً بكم في مكتبنا القانوني المرموق - أحد أنجح المؤسسات القانونية في دولة الإمارات العربية المتحدة. نحن نفخر بالتزامنا العميق بالتميز والنزاهة والابتكار.',
    'about.sheikh.bio2': 'مع سنوات من الخبرة في التنقل في المشهد القانوني المعقد، يقدم فريقنا من المهنيين المخصصين حلولاً مخصصة لتلبية الاحتياجات المتنوعة لعملائنا.',
    'about.sheikh.bio3': 'نحن نجمع بين فهم عميق للقوانين المحلية والدولية مع شغف بالعدالة، مما يضمن أن يتلقى كل عميل تمثيلاً شخصياً ومدفوعاً بالنتائج.',
    'about.qualifications.title': 'المؤهلات والخبرة',
    'about.qualifications.education': 'التعليم',
    'about.qualifications.education.desc': 'تعليم قانوني متقدم من مؤسسات مرموقة',
    'about.qualifications.certifications': 'الشهادات',
    'about.qualifications.certifications.desc': 'شهادات قانونية مهنية وعضويات',
    'about.qualifications.experience': 'الخبرة',
    'about.qualifications.experience.desc': 'أكثر من 20 عاماً من الممارسة القانونية والخبرة',
    'about.qualifications.jurisdictions': 'الاختصاصات',
    'about.qualifications.jurisdictions.desc': 'مرخص للممارسة في الإمارات والاختصاصات الدولية',
    'about.values.title': 'قيمنا ورسالتنا',
    'about.values.mission': 'تقديم خدمات قانونية استثنائية بالنزاهة والتميز وحلول تركز على العميل.',
    'about.values.integrity': 'النزاهة',
    'about.values.integrity.desc': 'نحن نحافظ على أعلى المعايير الأخلاقية في جميع ممارساتنا القانونية.',
    'about.values.excellence': 'التميز',
    'about.values.excellence.desc': 'نسعى للتميز في كل قضية وتفاعل مع العميل.',
    'about.values.client': 'التركيز على العميل',
    'about.values.client.desc': 'احتياجات عملائنا ورضاهم هي أولويتنا القصوى.',
    'about.practice.title': 'مجالات الممارسة',
    'about.practice.intro': 'نقدم خدمات قانونية شاملة عبر مجالات ممارسة متنوعة.',
    'about.practice.commercial': 'القانون التجاري',
    'about.practice.arbitration': 'التحكيم الدولي',
    'about.practice.family': 'قانون الأسرة',
    'about.practice.corporate': 'قانون الشركات',
    'about.practice.criminal': 'القانون الجنائي',
    'about.practice.real': 'قانون العقارات',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Apply language to document
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => {
      const newLang = prevLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
