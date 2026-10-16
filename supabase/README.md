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

## ملاحظة: الأسعار من قاعدة البيانات
- الموقع يقرأ الأسعار من جدول `products` عند التحميل (لو مش متاح بيرجع لأسعار `config.js`)، ويرسل `expected_price` مع كل منتج لأن `create_order` بيرفض أي سعر مختلف عن السعر في القاعدة.
- غيّر الأسعار من جدول `products` فقط.
