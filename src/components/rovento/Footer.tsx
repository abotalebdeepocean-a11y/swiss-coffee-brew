import { Link } from "react-router";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo, WhatsAppIcon } from "./art";
import { whatsappLink } from "@/lib/store";

const PAYMENTS = [
  "فيزا",
  "ماستركارد",
  "ميزة",
  "فوري",
  "فودافون كاش",
  "إنستاباي",
  "الدفع عند الاستلام",
];

const LINKS = [
  { label: "الرئيسية", to: "/" },
  { label: "المتجر", to: "/shop" },
  { label: "مجموعة MISH", to: "/#signature" },
  { label: "لماذا روفينتو", to: "/#why" },
  { label: "آراء العملاء", to: "/#reviews" },
];

const CATS = [
  { label: "حبوب القهوة", to: "/shop?category=beans" },
  { label: "حبوب الإسبريسو", to: "/shop?category=espresso" },
  { label: "القهوة المطحونة", to: "/shop?category=ground" },
  { label: "ماكينات القهوة", to: "/shop?category=machines" },
  { label: "الإكسسوارات", to: "/shop?category=accessories" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b]">
      {/* top strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-8 md:px-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center bg-rv-red text-white">
              <WhatsAppIcon className="size-5" />
            </span>
            <div>
              <p className="font-bold">اطلب مباشرة عبر واتساب</p>
              <p className="text-xs text-muted-foreground">
                رد سريع من ٩ صباحًا حتى ١١ مساءً
              </p>
            </div>
          </div>
          <a
            href={whatsappLink("مرحبًا ROVENTO 👋 أريد الطلب الآن.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 bg-[#25d366] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1fbd5b]"
          >
            <MessageCircle className="size-4" />
            راسلنا الآن
          </a>
        </div>
      </div>

      {/* main grid */}
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-14 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            قهوة مختصة مصرية من قلب القاهرة إلى العالم. تحميص طازج أسبوعيًا،
            حبوب مختارة، ومجتمع من عشاق القهوة.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-rv-red" />
              القاهرة، مصر
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-rv-red" />
              <span dir="ltr">+20 100 000 0000</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-rv-red">
            روابط سريعة
          </h4>
          <ul className="mt-5 space-y-3">
            {LINKS.map((l) => (
              <li key={l.to + l.label}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-rv-red">
            التصنيفات
          </h4>
          <ul className="mt-5 space-y-3">
            {CATS.map((l) => (
              <li key={l.to + l.label}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-rv-red">
            وسائل الدفع
          </h4>
          <div className="mt-5 flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="border border-white/12 px-2.5 py-1.5 text-[11px] text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            شحن لكل محافظات مصر خلال ٤٨ ساعة · توصيل مجاني للطلبات فوق ١٠٠٠ ج.م
          </p>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-5 md:px-6">
          <p className="text-xs text-muted-foreground">
            © 2026 ROVENTO · صُنع بحب في مصر 🇪🇬
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Not Ordinary Coffee · مش قهوة عادية
          </p>
        </div>
      </div>
    </footer>
  );
}
