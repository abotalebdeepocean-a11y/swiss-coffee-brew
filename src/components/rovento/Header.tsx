import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, Gift, Menu, X } from "lucide-react";
import { Logo, WhatsAppIcon } from "./art";
import { useCart, whatsappLink } from "@/lib/store";

const NAV: { label: string; to: string; hot?: boolean; badge?: string }[] = [
  { label: "الرئيسية", to: "/#hero" },
  { label: "المنتجات", to: "/#featured" },
  { label: "عرض الأسبوع", to: "/#deal", hot: true },
  { label: "لماذا روفينتو؟", to: "/#why-rovento" },
  { label: "آراء العملاء", to: "/#reviews" },
];

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
      /* ignore */
    }
  }

  return (
    <>
    <header className="sticky top-0 z-40">
      {/* Promo bar — desktop only */}
      <div className="hidden bg-rv-red text-white md:block">
        <p className="mx-auto flex h-9 w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-0 px-4 text-center text-[13px] font-bold">
          <span>خصم 15% على أول طلب باستخدام كود:</span>
          <button
            onClick={copyCode}
            dir="ltr"
            title="اضغط لنسخ الكود"
            className="rounded bg-white/20 px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-white transition hover:bg-white/30"
          >
            ROVENTO15
          </button>
          <span className="inline-flex items-center gap-1.5">
            <span className="opacity-50">|</span> شحن لكل محافظات مصر خلال 24-72 ساعة
          </span>
        </p>
      </div>

      {/* Main nav */}
      <div className="border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between gap-3 px-4 md:h-16 md:px-6">
          <Link to="/" aria-label="روڤينتو — الرئيسية" className="flex items-center">
            <Logo size="large" className="h-10 md:h-12" />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 text-sm font-bold lg:flex"
            aria-label="القائمة الرئيسية"
          >
            {NAV.map((item) => (
              <button
                key={item.to}
                onClick={() => go(item.to)}
                className="relative flex items-center gap-1.5 px-3 py-2 text-stone-400 transition-colors hover:text-rv-red"
              >
                {item.label}
                {item.hot && (
                  <span className="rounded-full bg-rv-red px-1.5 py-0.5 text-[10px] font-black text-white">
                    {item.badge ?? "جديد"}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-2.5">
            {/* WhatsApp */}
            <a
              href={whatsappLink(
                "مرحبًا ROVENTO 👋 أريد الاستفسار عن منتجاتكم.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-[10px] border border-[#25D366]/30 text-[#25D366] transition-colors hover:bg-[#25D366]/10 md:size-10 md:rounded-full md:border-emerald-500/40 md:text-emerald-400"
              aria-label="تواصل عبر واتساب"
            >
              <WhatsAppIcon className="size-5 md:size-[18px]" />
            </a>

            {/* Promo button — desktop */}
            <button
              onClick={openPromoPopup}
              className="hidden items-center gap-2 rounded-full border border-rv-red/30 bg-[#111] px-3.5 py-2 text-xs font-bold text-rv-red transition-colors hover:bg-rv-red/10 sm:flex"
            >
              <Gift className="size-4" />
              هدية فورية
            </button>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex h-11 items-center gap-2 rounded-[10px] bg-rv-red px-4 font-black text-white shadow-lg shadow-rv-red/20 transition-all hover:-translate-y-0.5 hover:bg-rv-red-light hover:shadow-rv-red/30"
              aria-label="سلة التسوق"
            >
              <ShoppingCart className="size-5" />
              <span className="hidden text-sm sm:inline">السلة</span>
              {count > 0 && (
                <span className="absolute -top-1.5 -start-1.5 grid min-w-5 h-5 place-items-center rounded-full bg-white px-1 font-mono text-[11px] font-bold text-rv-red shadow">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-[10px] border border-white/10 lg:hidden"
              aria-label="افتح القائمة"
            >
              <Menu className="size-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto border-e border-white/5 bg-[#0a0a0a] p-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <Logo size="default" className="h-10" />
              <button
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-[10px] border border-white/10"
                aria-label="إغلاق"
              >
                <X className="size-5 text-white" />
              </button>
            </div>
            <nav className="mt-2 flex flex-col" aria-label="قائمة الجوال">
              {NAV.map((item, i) => (
                <button
                  key={item.to}
                  onClick={() => go(item.to)}
                  className="flex items-center justify-between border-b border-white/5 px-2 py-4 text-start text-lg font-bold text-stone-200 transition-colors hover:text-rv-red"
                >
                  {item.label}
                  <span className="font-mono text-[11px] text-rv-red">
                    0{i + 1}
                  </span>
                </button>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="btn-gold flex h-12 items-center justify-center rounded-[10px] text-base font-black"
                >
                  تسوق الآن
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    openPromoPopup();
                  }}
                  className="flex h-12 items-center justify-center gap-2 rounded-[10px] border border-rv-red/40 text-sm font-bold text-rv-red"
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

    {/* Mobile bottom nav */}
    <div className="fixed bottom-0 inset-x-0 z-30 border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-around px-2">
        <button
          onClick={() => setOpen(true)}
          className="flex flex-1 flex-col items-center gap-0.5 py-1 text-stone-500 transition-colors active:text-rv-red"
          aria-label="القائمة"
        >
          <Menu className="size-5" />
          <span className="text-[10px] font-bold">القائمة</span>
        </button>
        <button
          onClick={openCart}
          className="relative flex flex-1 flex-col items-center gap-0.5 py-1 text-stone-500 transition-colors active:text-rv-red"
          aria-label="السلة"
        >
          <ShoppingCart className="size-5" />
          <span className="text-[10px] font-bold">السلة</span>
          {count > 0 && (
            <span className="absolute top-0.5 right-1/3 grid min-w-4 h-4 place-items-center rounded-full bg-rv-red px-1 font-mono text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </button>
        <a
          href={whatsappLink(
            "مرحبًا ROVENTO 👋 عايز أطلب.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center gap-0.5 py-1 text-[#25D366] transition-colors"
          aria-label="واتساب"
        >
          <WhatsAppIcon className="size-5" />
          <span className="text-[10px] font-bold">واتساب</span>
        </a>
      </div>
    </div>
    </>
  );
}
