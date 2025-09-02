# مكتب الشيخ راشد بن ناصر النعيمي للمحاماة

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)](https://vercel.com)

موقع احترافي لمكتب محاماة متخصص في القانون التجاري والمدني والعائلي في دولة الإمارات العربية المتحدة.

## ✨ المميزات

- 🌐 **دعم متعدد اللغات**: الإنجليزية والعربية
- 🌓 **وضع مظلم/فاتح**: تجربة مستخدم مريحة
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة
- ⚡ **أداء عالي**: مبني بـ Next.js 15
- 🔒 **لوحة إدارة آمنة**: إدارة رسائل الاستشارة
- 📧 **نموذج استشارة تفاعلي**: مع التحقق من البيانات
- 💬 **دعم واتساب**: تواصل سريع مع العملاء

## 🚀 التشغيل المحلي

### المتطلبات الأساسية:
- Node.js 18+
- npm أو yarn أو pnpm

### خطوات التثبيت:

1. **استنساخ المستودع:**
   ```bash
   git clone https://github.com/ahmedtitio/shkrashid-lawyers.git
   cd shkrashid-lawyers
   ```

2. **تثبيت التبعيات:**
   ```bash
   npm install
   # أو
   yarn install
   # أو
   pnpm install
   ```

3. **تشغيل الخادم المحلي:**
   ```bash
   npm run dev
   # أو
   yarn dev
   # أو
   pnpm dev
   ```

4. **فتح المتصفح:**
   افتح [http://localhost:3000](http://localhost:3000) لرؤية الموقع.

## 📁 هيكل المشروع

```
shkrashid-lawyers/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── admin/            # لوحة الإدارة
│   │   ├── components/       # المكونات
│   │   ├── globals.css       # الأنماط العامة
│   │   └── layout.tsx        # التخطيط الرئيسي
│   ├── components/
│   │   ├── ui/               # مكونات واجهة المستخدم
│   │   └── ...               # مكونات أخرى
│   └── utils/                # الأدوات المساعدة
├── public/                   # الملفات الثابتة
├── data/                     # بيانات JSON
└── package.json
```

## 🛠️ التقنيات المستخدمة

- **Frontend Framework:** Next.js 15.4.5
- **Programming Language:** TypeScript 5.0
- **Styling:** TailwindCSS 4.0
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Internationalization:** Custom i18n solution
- **Deployment:** Vercel

## 📧 لوحة الإدارة

### الوصول إلى لوحة الإدارة:
1. انتقل إلى `/admin/login`
2. استخدم البيانات التالية للتسجيل:
   - اسم المستخدم: `admin`
   - كلمة المرور: `admin1232025`

### مميزات لوحة الإدارة:
- عرض جميع رسائل الاستشارة
- تحديث حالة الرسائل (مقروءة/غير مقروءة)
- حذف الرسائل
- إحصائيات مفصلة
- فلترة الرسائل حسب الحالة

## 🌐 النشر على Vercel

### الطريقة السهلة:
1. ارفع المشروع إلى GitHub
2. اربط المستودع بـ Vercel
3. اضغط "Deploy"

### إعدادات Vercel:
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

## 📝 الاستخدام

### إضافة خدمة جديدة:
1. أضف البيانات في `src/app/components/pages/HomePage.tsx`
2. أضف الترجمات في `src/app/components/LanguageProvider.tsx`

### تخصيص الألوان:
عدل المتغيرات في `src/app/globals.css`:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

### إضافة صفحة جديدة:
1. أنشئ مجلد في `src/app/`
2. أضف `page.tsx`
3. أضف الرابط في `src/app/components/Header.tsx`

## 🔧 التطوير

### أوامر مفيدة:
```bash
# تشغيل الخادم المحلي
npm run dev

# بناء المشروع للإنتاج
npm run build

# تشغيل الاختبارات
npm run test

# فحص الكود
npm run lint
```

### متغيرات البيئة:
أنشئ ملف `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

## 📞 التواصل

للاستفسارات أو الدعم:
- البريد الإلكتروني: rashidalnuimiest@gmail.com
- الهاتف: +971 58 388 3441
- العنوان: UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm

## 📄 الترخيص

هذا المشروع محمي بحقوق الطبع والنشر © 2024 مكتب الشيخ راشد بن ناصر النعيمي للمحاماة.

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة دليل المساهمة قبل البدء.

---

**تم التطوير بـ ❤️ بواسطة Ahmed Tito**
