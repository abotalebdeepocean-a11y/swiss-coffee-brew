import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, Gift, Menu, X } from "lucide-react";
import { Logo, WhatsAppIcon } from "./art";
import { useCart, whatsappLink } from "@/lib/store";

const NAV = [
  { label: "الرئيسية", to: "/#hero" },
  { label: "اختار شخصيتك", to: "/#featured" },
  { label: "عرض الأسبوع", to: "/#deal", hot: true },
  { label: "لماذا بريكا؟", to: "/#brikka" },
  { label: "الأكثر مبيعًا", to: "/#bestsellers" },
  { label: "لماذا روفينتو؟", to: "/#why-rovento" },
  { label: "آراء العملاء", to: "/#reviews" },
];

/** يفتح نافذة الهدية (ExitIntentPopup) من أي مكان */
export function openPromoPopup() {
  window.dispatchEvent(new Event("rovento:open-promo"));
}

export function Header() {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function go(to: string) {
    setOpen(false);
    const [path, hash] = to.split("#");
    if (hash) {
      if (location.pathname === path) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(to);
      }
    } else {
      navigate(to);
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText("ROVENTO15");
    } catch {
      /* تجاهل */
    }
  }

  return (
    <header className="sticky top-0 z-40">
      {/* شريط العرض — عنبري دافئ */}
      <div className="bg-gradient-to-r from-amber-700 via-rv-gold to-amber-700 text-black">
        <p className="mx-auto flex h-9 w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-0 px-4 text-center text-[12px] font-black md:text-[13px]">
          <span>🔥 خصم 15% على أول طلب باستخدام كود:</span>
          <button
            onClick={copyCode}
            dir="ltr"
            title="اضغط لنسخ الكود"
            className="rounded bg-black px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-rv-gold transition hover:bg-stone-900"
          >
            ROVENTO15
          </button>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <span className="opacity-50">|</span> 🚚 شحن سريع لكل محافظات مصر
            خلال 24-72 ساعة
          </span>
        </p>
      </div>

      {/* شريط التنقل */}
      <div className="border-b border-stone-800 bg-coffee-900/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:h-20 md:px-6">
          <Link to="/" aria-label="روڤينتو — الرئيسية">
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-1 text-sm font-bold lg:flex"
            aria-label="القائمة الرئيسية"
          >
            {NAV.map((item) => (
              <button
                key={item.to}
                onClick={() => go(item.to)}
                className="relative flex items-center gap-1.5 px-3 py-2 text-stone-300 transition-colors hover:text-rv-gold"
              >
                {item.label}
                {item.hot && (
                  <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-black text-white">
                    خصم
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={whatsappLink(
                "مرحبًا ROVENTO 👋 أريد الاستفسار عن منتجاتكم.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 items-center justify-center rounded-full border border-emerald-500/40 text-emerald-400 transition-colors hover:bg-emerald-500/10 md:flex"
              aria-label="تواصل عبر واتساب"
            >
              <WhatsAppIcon className="size-4.5" />
            </a>

            {/* هدية فورية */}
            <button
              onClick={openPromoPopup}
              className="hidden items-center gap-2 rounded-full border border-rv-gold/30 bg-stone-800 px-3.5 py-2 text-xs font-bold text-rv-gold transition-colors hover:bg-stone-700 sm:flex"
            >
              <Gift className="size-4" />
              هدية فورية
            </button>

            {/* زر السلة — ذهبي */}
            <button
              onClick={openCart}
              className="relative flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-rv-gold to-[#b89728] px-4 font-black text-black shadow-lg transition hover:brightness-110"
              aria-label="سلة التسوق"
            >
              <ShoppingCart className="size-4.5" />
              <span className="hidden sm:inline">السلة</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-black px-1.5 font-mono text-[10px] font-bold text-rv-gold">
                {count}
              </span>
            </button>

            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-lg border border-stone-700 lg:hidden"
              aria-label="افتح القائمة"
            >
              <Menu className="size-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الجوال */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-e border-stone-800 bg-coffee-900 p-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-lg border border-stone-700"
                aria-label="إغلاق"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="mt-2 flex flex-col" aria-label="قائمة الجوال">
              {NAV.map((item, i) => (
                <button
                  key={item.to}
                  onClick={() => go(item.to)}
                  className="flex items-center justify-between border-b border-white/5 px-2 py-4 text-start text-base font-bold text-stone-200 transition-colors hover:text-rv-gold"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-rv-gold">
                    0{i + 1}
                  </span>
                </button>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="btn-gold flex h-11 items-center justify-center rounded-xl font-black"
                >
                  تسوق الآن
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    openPromoPopup();
                  }}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-rv-gold/40 text-sm font-bold text-rv-gold"
                >
                  <Gift className="size-4" />
                  هدية فورية — كوبون خصم
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
