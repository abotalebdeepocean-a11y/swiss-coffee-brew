import { Link } from "react-router";
import { MapPin, Phone, MessageCircle } from "lucide-react";
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
  { label: "خلطات روفينتو", to: "/#signature" },
  { label: "عرض الأسبوع", to: "/#offers" },
  { label: "لماذا بريكا؟", to: "/#moka" },
  { label: "تجارب العملاء", to: "/#reviews" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-coffee-950 pb-12 pt-16 text-sm text-stone-400">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        {/* العلامة */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs leading-relaxed text-stone-400">
            روفينتو كوفي — علامة مصرية رائدة في تحميص وإنتاج قهوة الإسبريسو
            الفاخرة بأعلى معايير الجودة العالمية في قلب القاهرة.
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

        {/* وسائل الدفع */}
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

        {/* شركاء الشحن */}
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
        <p>
          © 2026 ROVENTO COFFEE. جميع الحقوق محفوظة • صنع بكل فخر في مصر 🇪🇬
        </p>
      </div>
    </footer>
  );
}
