# Supabase — مشروع rovento-coffee

- Project ref: `osganvzmjisqsomjayyt` — https://osganvzmjisqsomjayyt.supabase.co (eu-central-1)
- الجداول (كلها RLS مفعّل): `products`, `site_settings` (قراءة عامة)، `profiles` (المستخدم يقرأ/يعدّل بياناته فقط)، `orders` و`order_items` (المستخدم يقرأ طلباته فقط).
- الطلبات تتسجل **فقط** عبر الدالة `create_order` (تعمل للزائر والمسجّل): بتعيد حساب الأسعار والشحن (١٠٠ جنيه من `site_settings.shipping_fee`) من الجداول، فمش ممكن حد يعدّل السعر من المتصفح.
- لتغيير سعر أو شحن: عدّل في جدول `products` / `site_settings` من لوحة Supabase، وعدّل نفس القيمة في `assets/js/config.js` عشان العرض.

## تفعيل الدخول بجوجل (خطوات يدوية مرة واحدة)
1. Google Cloud Console → APIs & Services → Credentials → Create OAuth client ID (Web application).
   Authorized redirect URI: `https://osganvzmjisqsomjayyt.supabase.co/auth/v1/callback`
2. Supabase Dashboard → Authentication → Providers → Google → فعّل وضع Client ID و Client Secret.
3. Authentication → URL Configuration: Site URL = `https://www.rovento.site`، وأضف في Redirect URLs رابط الموقع (ورابط الاختبار لو بتجرب).


## Migrations

- `schema.sql` documents the initial schema for a new Supabase project. Do not rerun it on a project where these tables already exist.
- Apply `migrations/20261015000000_supabase_foundation.sql` to an existing project using the Supabase SQL Editor or Supabase CLI. It removes unapproved prices from active checkout paths and makes the `create_order` RPC reject any variant without an approved server-side price.
- The current frontend reads `site_settings.shipping_fee` and calls `create_order`; order totals and item prices returned to WhatsApp come from the database.
- Configure Supabase Auth email templates to send the six-digit token (`{{ .Token }}`) expected by the code-entry screen. Enable anonymous sign-in only if the guest-login button is intended to remain available.
- Before production, confirm that the recorded EGP 100 shipping fee and approved 500 g / 1 kg prices are still commercially correct. The migration preserves only the prices documented as confirmed in the existing Supabase setup.
