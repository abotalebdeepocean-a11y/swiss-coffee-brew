import { useState } from "react";
import { Link } from "react-router";
import { Check, MapPin, MessageCircle, Phone, Mail, Globe } from "lucide-react";
import { Logo, WhatsAppIcon } from "./art";
import { whatsappLink } from "@/lib/store";

const PHONE_NUMBERS = [
  { number: "01033012381", label: "خط رئيسي" },
  { number: "01042324842", label: "خط ثانوي" },
  { number: "01042320848", label: "خط ثالث" },
];

const PAYMENTS = [
  { label: "Visa", cls: "text-blue-500" },
  { label: "Mastercard", cls: "text-orange-500" },
  { label: "ميزة (Meeza)", cls: "text-rv-gold" },
  { label: "فودافون كاش", cls: "text-red-500" },
  { label: "Instapay", cls: "text-purple-500" },
  { label: "COD", cls: "text-emerald-600" },
];

const SHIPPING = [
  { label: "Aramex", cls: "text-red-500" },
  { label: "Bosta", cls: "text-blue-400" },
  { label: "Mylerz", cls: "text-amber-500" },
];

const LINKS = [
  { label: "الرئيسية", to: "/" },
  { label: "المتجر", to: "/shop" },
  { label: "خلطات روفينتو", to: "/#featured" },
  { label: "عرض الأسبوع", to: "/#deal" },
  { label: "تجارب العملاء", to: "/#reviews" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
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
          تم الاشتراك! كوبون خصمك في الطريق
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
            className="h-11 min-w-0 flex-1 rounded-xl border border-rv-cream/10 bg-rv-darkBrown/80 px-3 text-sm text-rv-cream placeholder:text-rv-cream/30 focus:border-rv-gold focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-xl bg-rv-gold px-4 text-sm font-black text-white transition hover:bg-rv-darkGold"
          >
            اشترك
          </button>
        </div>
      )}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rv-brown/10 bg-rv-darkBrown pb-10 pt-14 text-sm text-rv-cream/60">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs leading-relaxed text-rv-cream/40">
            عصارة قهوة خالصة لتجربة فريدة — علامة مصرية رائدة في تحميص وإنتاج
            قهوة الإسبريسو الفاخرة بأعلى معايير الجودة العالمية في قلب القاهرة.
          </p>
          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-rv-gold" />
              القاهرة، مصر
            </p>
            {PHONE_NUMBERS.map((p) => (
              <a
                key={p.number}
                href={`tel:+20${p.number}`}
                className="flex items-center gap-2 transition-colors hover:text-rv-gold"
              >
                <Phone className="size-3.5 shrink-0 text-rv-gold" />
                <span dir="ltr">{p.number}</span>
                <span className="text-rv-cream/30">({p.label})</span>
              </a>
            ))}
            <a
              href="mailto:info@rovento.site"
              className="flex items-center gap-2 transition-colors hover:text-rv-gold"
            >
              <Mail className="size-3.5 shrink-0 text-rv-gold" />
              info@rovento.site
            </a>
            <a
              href="https://www.rovento.site"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-rv-gold"
            >
              <Globe className="size-3.5 shrink-0 text-rv-gold" />
              <span dir="ltr">www.rovento.site</span>
            </a>
          </div>

          {/* QR Code */}
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-rv-cream/10 bg-rv-darkBrown/80 p-3">
            <div className="shrink-0">
              <svg viewBox="0 0 100 100" className="size-16" aria-label="QR Code لـ www.rovento.site">
                <rect width="100" height="100" fill="white" rx="8" />
                <rect x="8" y="8" width="24" height="24" fill="#0a0a0a" rx="2" />
                <rect x="12" y="12" width="16" height="16" fill="white" rx="1" />
                <rect x="15" y="15" width="10" height="10" fill="#0a0a0a" rx="1" />
                <rect x="68" y="8" width="24" height="24" fill="#0a0a0a" rx="2" />
                <rect x="72" y="12" width="16" height="16" fill="white" rx="1" />
                <rect x="75" y="15" width="10" height="10" fill="#0a0a0a" rx="1" />
                <rect x="8" y="68" width="24" height="24" fill="#0a0a0a" rx="2" />
                <rect x="12" y="72" width="16" height="16" fill="white" rx="1" />
                <rect x="15" y="75" width="10" height="10" fill="#0a0a0a" rx="1" />
                {[38,42,46,50,54,58].map(x => [38,42,46,50].map(y => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="#0a0a0a" opacity={((x+y) % 6 < 3) ? 1 : 0.3} />
                )))}
                {[38,42,46].map(x => [8,12,16].map(y => (
                  <rect key={`t-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#0a0a0a" opacity={((x*y) % 5 < 3) ? 1 : 0.3} />
                )))}
                {[8,12,16].map(x => [38,42,46,50].map(y => (
                  <rect key={`l-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#0a0a0a" opacity={((x+y) % 4 < 2) ? 1 : 0.3} />
                )))}
                <circle cx="50" cy="50" r="6" fill="#d03b1e" />
                <circle cx="50" cy="50" r="3" fill="white" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-rv-cream/80">امسح الكود للزيارة</p>
              <p className="text-[10px] text-rv-cream/40" dir="ltr">www.rovento.site</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2 pt-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-rv-cream/10 bg-rv-darkBrown/80 text-rv-cream/40 transition hover:border-rv-gold hover:text-rv-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-1 font-bold text-rv-cream">اشترك في نشرتنا البريدية</h4>
          <p className="text-xs text-rv-cream/40">
            احصل على عروض وخصومات حصرية + كود خصم أول طلب.
          </p>
          <NewsletterForm />
          <div className="mt-5">
            <h5 className="mb-2 text-xs font-bold text-rv-cream">خدمة العملاء</h5>
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
              <li className="text-rv-cream/40">متاحون يوميًا 9 صباحًا — 11 مساءً</li>
            </ul>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-4 font-bold text-rv-cream">روابط سريعة</h4>
          <ul className="space-y-2 text-xs">
            {LINKS.map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="transition-colors hover:text-rv-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Payments + Shipping */}
        <div className="space-y-5">
          <div>
            <h4 className="mb-3 font-bold text-rv-cream">وسائل الدفع</h4>
            <div className="flex flex-wrap gap-1.5">
              {PAYMENTS.map((p) => (
                <span
                  key={p.label}
                  className={`rounded-lg border border-rv-cream/10 bg-rv-darkBrown/80 px-2.5 py-1.5 text-[11px] font-bold ${p.cls}`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-rv-cream">شركاء الشحن</h4>
            <div className="flex flex-wrap gap-1.5">
              {SHIPPING.map((s) => (
                <span
                  key={s.label}
                  dir="ltr"
                  className={`rounded-lg border border-rv-cream/10 bg-rv-darkBrown/80 px-2.5 py-1.5 text-[11px] font-bold ${s.cls}`}
                >
                  {s.label}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-rv-cream/40">
              شحن مؤمن لكل مصر خلال 24-72 ساعة.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp strip */}
      <div className="mx-auto mt-10 flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-rv-cream/10 px-4 pt-8 md:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon className="size-5" />
          </span>
          <div>
            <p className="font-bold text-rv-cream">اطلب مباشرة عبر واتساب</p>
            <p className="text-xs text-rv-cream/40">رد سريع من 9 صباحًا حتى 11 مساءً — <span dir="ltr">01033012381</span></p>
          </div>
        </div>
        <a
          href={whatsappLink("مرحبًا ROVENTO 👋 أريد الطلب الآن.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-black text-white transition hover:bg-[#20bd5a]"
        >
          <MessageCircle className="size-4" />
          راسلنا الآن
        </a>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1200px] border-t border-rv-cream/10 px-4 pt-8 text-center text-xs text-rv-cream/30 md:px-6">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} روفينتو للقهوة • صنع بكل فخر في مصر 🇪🇬</p>
      </div>
    </footer>
  );
}
