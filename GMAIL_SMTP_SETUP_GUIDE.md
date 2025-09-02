# دليل إعداد Gmail SMTP

## المشكلة
ظهر خطأ المصادقة مع Gmail:
```
Email sending error: [Error: Invalid login: 535-5.7.8 Username and Password not accepted.
```

## الحلول الممكنة

### 1. استخدام كلمة مرور التطبيق (مستحسن)

1. **تفعيل التحقق بخطوتين**:
   - اذهب إلى [إعدادات Gmail](https://myaccount.google.com/security)
   - فعّل "التحقق بخطوتين"

2. **إنشاء كلمة مرور التطبيق**:
   - بعد تفعيل التحقق بخطوتين، اذهب إلى [كلمات مرور التطبيقات](https://myaccount.google.com/apppasswords)
   - اختر "البريد" كتطبيق و "Windows Computer" كجهاز
   - انقر على "إنشاء"
   - انسخ كلمة المرور المكونة من 16 حرفاً

3. **تحديث ملف البيئة**:
   - أنشئ ملف `.env.local` في مجلد المشروع
   - أضف المتغيرات التالية:

```env
SMTP_USER=ah01110692728@gmail.com
SMTP_PASS=your-app-password-here
```

### 2. تفعيل الوصول للتطبيقات الأقل أماناً (غير مستحسن)

1. اذهب إلى [إعدادات الأمان في Gmail](https://myaccount.google.com/security)
2. فعّل "الوصول للتطبيقات الأقل أماناً"
3. استخدم كلمة المرور العادية في ملف البيئة

### 3. استخدام مزود بريد إلكتروني آخر

يمكنك استخدام خدمات مثل:
- **SendGrid** (مجاني حتى 100 بريد يومياً)
- **Mailgun** (مجاني للبدء)
- **Amazon SES** (منخفض التكلفة)

## اختبار الإعداد

بعد التحديث، اختبر النموذج مرة أخرى. إذا استمرت المشكلة:

1. تأكد من أن كلمة مرور التطبيق صحيحة
2. تحقق من أن التحقق بخطوتين مفعل
3. تأكد من أن ملف `.env.local` في المجلد الصحيح

## الأمان

- لا تشارك كلمة مرور التطبيق مع أي شخص
- احفظ ملف `.env.local` في `.gitignore` لمنع تسربه
- استخدم كلمات مرور التطبيقات بدلاً من كلمات المرور الرئيسية

## استكشاف الأخطاء

إذا استمرت المشكلة، جرب:

1. **اختبار الاتصال مع Gmail**:
```bash
telnet smtp.gmail.com 587
```

2. **التحقق من إعدادات الجدار الناري**
3. **التأكد من أن الحساب غير مقفل**

## بدائل إذا لم يعمل Gmail

### استخدام خدمة بريد إلكتروني بديلة

أنشئ ملف `src/app/api/consultation/alternative-route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // ... استخدام Resend بدلاً من nodemailer
}
```

سجل في [Resend.com](https://resend.com) واحصل على مفتاح API مجاني.
