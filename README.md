# Rola Alsulami — Portfolio (Starter)

This repository is a starter scaffold for a premium portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It includes JSON-based data files and a minimal admin-write API to manage content without editing source code.

## Quick start

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

API endpoints (read):

- `GET /api/data/profile`
- `GET /api/data/projects`
- `GET /api/data/internship`
- `GET /api/data/skills`
- `GET /api/data/experience`
- `GET /api/data/contact`

To update content from the admin UI (or programmatically), send a `POST` with a JSON body to the same endpoints (server must have write permissions).

## Next steps


## Admin token (حماية واجهات الـ API)

## Adding your banner image

To use a custom banner like the example you provided, add the image file to:

```
assets/images/banner.jpg
```

The `Hero` component uses `/assets/images/banner.jpg` as the background. The Admin pages also allow uploading images (stored as data URLs in JSON) but for the main banner place the file at the path above so it loads server-side.


هذا المشروع يستخدم متغير بيئة بسيط اسمه `ADMIN_TOKEN` لحماية عمليات الكتابة (`POST`) على نقاط الـ API في `pages/api/data/[name]`.

- القيمة الافتراضية (للتطوير) هي: `rola-admin` — غيريها دائمًا قبل النشر.
- عند إرسال طلب `POST` إلى مثلاً `/api/data/projects` يجب تضمين رأس HTTP باسم `x-admin-token` بقيمة `ADMIN_TOKEN`.

إعداد محلي (ملف `.env.local` في جذر المشروع):

```bash
ADMIN_TOKEN=your-secret-token-here
```

أو في Windows PowerShell (جلسة محلية):

```powershell
$env:ADMIN_TOKEN = "your-secret-token-here"
```

على استضافة مثل Vercel: أضيفي متغير بيئة `ADMIN_TOKEN` من صفحة Environment Variables في إعدادات المشروع.

ملاحظة أمنيّة: الحل الحالي هو حماية بسيطة مناسبة للنسخ التجريبية؛ في الإنتاج أنصح باستخدام نظام مصادقة أقوى (NextAuth، OAuth، أو JWT مع HttpOnly cookies) بدلاً من توكن ثابت مخزن في localStorage.

بعد تغيير المتغير، أعد تشغيل الخادم حتى يبدأ استخدام القيمة الجديدة.

