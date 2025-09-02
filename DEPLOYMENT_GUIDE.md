# دليل تجهيز المشروع للرفع على GitHub والنشر على Vercel

## 1. رفع المشروع على GitHub

### الخطوات:
1. افتح الطرفية (Terminal) في مجلد المشروع.
2. تهيئة مستودع Git (إذا لم يكن مهيأً):
   ```
   git init
   ```
3. إضافة جميع الملفات:
   ```
   git add .
   ```
4. إنشاء أول commit:
   ```
   git commit -m "Initial commit"
   ```
5. ربط المستودع المحلي بالمستودع البعيد على GitHub:
   ```
   git remote add origin https://github.com/ahmedtitio/shkrashid-lawyers.git
   ```
6. دفع التغييرات إلى الفرع الرئيسي:
   ```
   git branch -M main
   git push -u origin main
   ```

## 2. إعداد المشروع للنشر على Vercel

### الخطوات:
1. قم بإنشاء حساب أو تسجيل الدخول إلى [Vercel](https://vercel.com).
2. اضغط على "New Project" ثم اختر المستودع `shkrashid-lawyers` من GitHub.
3. تأكد من أن إعدادات البناء هي:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. اضغط على "Deploy".

### ملاحظات:
- تأكد من أن ملف `next.config.ts` لا يحتوي على `output: 'export'` لأن ذلك يمنع تشغيل API routes.
- تأكد من وجود ملف `package.json` يحتوي على السكريبتات اللازمة مثل `dev`, `build`, و `start`.
- إذا كنت تستخدم متغيرات بيئية (Environment Variables)، قم بإعدادها في إعدادات المشروع على Vercel.

## 3. تشغيل المشروع محلياً

لتشغيل المشروع محلياً قبل الرفع:
```
npm install
npm run dev
```

## 4. نصائح عامة

- قم بكتابة README محدث يشرح كيفية تشغيل المشروع.
- تأكد من اختبار جميع الوظائف، خاصة API routes.
- استخدم Git بشكل منتظم للحفاظ على نسخ احتياطية من التغييرات.

---

إذا كنت بحاجة إلى مساعدة إضافية في أي خطوة، أخبرني.
