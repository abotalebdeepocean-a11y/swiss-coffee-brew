import { useState } from "react";
import { Link } from "react-router";
import { Check, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo, WhatsAppIcon } from "./art";
import { whatsappLink } from "@/lib/store";

const PAYMENTS = [
  { label: "Visa", cls: "text-stone-200" },
  { label: "Mastercard", cls: "text-stone-200" },
  { label: "ميزة (Meeza)", cls: "text-rv-gold" },
  { label: "فودافون كاش", cls: "text-red-400" },
  { label: "Instapay", cls: "text-purple-400" },
  { label: "الدفع عند الاستلام (COD)", cls: "text-emerald-400" },
];

const SHIPPING = [
  { label: "Aramex", cls: "text-red-500" },
  { label: "Bosta (بوسطة)", cls: "text-blue-400" },
  { label: "Mylerz (مايلرز)", cls: "text-amber-500" },
];

const LINKS = [
  { label: "الرئيسية", to: "/" },
  { label: "خلطات روفينتو", to: "/#featured" },
  { label: "عرض الأسبوع", to: "/#deal" },
  { label: "لماذا بريكا؟", to: "/#brikka" },
  { label: "تجارب العملاء", to: "/#reviews" },
];

const SOCIALS = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="mt-4"
    >
      {done ? (
        <p className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-bold text-emerald-400">
          <Check className="size-4" />
          تم الاشتراك! كوبون خصمك في الطريق 🎉
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="اكتب بريدك الإلكتروني"
            dir="ltr"
            className="h-11 min-w-0 flex-1 rounded-xl border border-stone-800 bg-coffee-900 px-3 text-sm text-stone-200 placeholder:text-stone-500 focus:border-rv-gold focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-xl bg-rv-red px-4 text-sm font-black text-white transition hover:brightness-110"
          >
            اشترك الآن
          </button>
        </div>
      )}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-coffee-950 pb-12 pt-16 text-sm text-stone-400">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        {/* العلامة */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs leading-relaxed text-stone-400">
            عصارة قهوة خالصة لتجربة فريدة — علامة مصرية رائدة في تحميص وإنتاج
            قهوة الإسبريسو الفاخرة بأعلى معايير الجودة العالمية في قلب القاهرة.
          </p>
          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5 text-rv-gold" />
              القاهرة، مصر
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-3.5 text-rv-gold" />
              <span dir="ltr">+20 100 000 0000</span>
            </p>
          </div>

          {/* سوشيال ميديا */}
          <div className="flex items-center gap-2 pt-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-stone-800 bg-coffee-900 text-stone-300 transition hover:border-rv-gold hover:text-rv-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* النشرة البريدية */}
        <div>
          <h4 className="mb-1 font-bold text-white">
            اشترك في نشرتنا البريدية
          </h4>
          <p className="text-xs text-stone-400">
            احصل على عروض وخصومات حصرية + كود خصم أول طلب.
          </p>
          <NewsletterForm />
          <div className="mt-4">
            <h5 className="mb-2 text-xs font-bold text-white">خدمة العملاء</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href={whatsappLink("مرحبًا ROVENTO 👋 لدي استفسار.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-rv-gold"
                >
                  تواصل معنا عبر واتساب
                </a>
              </li>
              <li className="text-stone-500">متاحون يوميًا ٩ صباحًا — ١١ مساءً</li>
            </ul>
          </div>
        </div>

        {/* روابط سريعة */}
        <div>
          <h4 className="mb-4 font-bold text-white">روابط سريعة</h4>
          <ul className="space-y-2 text-xs">
            {LINKS.map((l) => (
              <li key={l.to + l.label}>
                <Link
                  to={l.to}
                  className="transition-colors hover:text-rv-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* وسائل الدفع + الشحن */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 font-bold text-white">
              وسائل الدفع المتاحة في مصر
            </h4>
            <div className="flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span
                  key={p.label}
                  className={`rounded-lg border border-stone-800 bg-coffee-900 px-3 py-1.5 text-xs font-bold ${p.cls}`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">شركاء الشحن في مصر</h4>
            <div className="flex flex-wrap gap-2">
              {SHIPPING.map((s) => (
                <span
                  key={s.label}
                  dir="ltr"
                  className={`rounded-lg border border-stone-800 bg-coffee-900 px-3 py-1.5 text-xs font-bold ${s.cls}`}
                >
                  {s.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-stone-500">
              شحن مؤمن ومغلف بعناية لجميع أنحاء مصر خلال 24-72 ساعة.
            </p>
          </div>
        </div>
      </div>

      {/* شريط واتساب */}
      <div className="mx-auto mt-10 flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-stone-800 px-4 pt-8 md:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-emerald-500 text-white">
            <WhatsAppIcon className="size-5" />
          </span>
          <div>
            <p className="font-bold text-white">اطلب مباشرة عبر واتساب</p>
            <p className="text-xs text-stone-400">
              رد سريع من ٩ صباحًا حتى ١١ مساءً
            </p>
          </div>
        </div>
        <a
          href={whatsappLink("مرحبًا ROVENTO 👋 أريد الطلب الآن.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-black text-white transition hover:bg-emerald-600"
        >
          <MessageCircle className="size-4" />
          راسلنا الآن
        </a>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1200px] border-t border-stone-900 px-4 pt-8 text-center text-xs text-stone-500 md:px-6">
        <p>جميع الحقوق محفوظة © 2024 روفينتو للقهوة • صنع بكل فخر في مصر 🇪🇬</p>
      </div>
    </footer>
  );
}
