import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/store";
import { whatsappLink } from "@/lib/store";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items, openCart } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-rv-black/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/rovento-logo-final.webp"
              alt="ROVENTO"
              className="h-9 w-auto md:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-bold text-rv-smoke transition-colors hover:text-rv-gold">
              الرئيسية
            </Link>
            <a href="#featured" className="text-sm font-bold text-rv-smoke transition-colors hover:text-rv-gold">
              المنتجات
            </a>
            <a href="#story" className="text-sm font-bold text-rv-smoke transition-colors hover:text-rv-gold">
              قصتنا
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative rounded-full border border-white/10 bg-white/5 p-2.5 transition-all hover:border-rv-gold/30 hover:bg-rv-gold/10"
            >
              <ShoppingCart className="size-4 text-rv-smoke" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rv-gold text-[9px] font-black text-rv-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp */}
            <a
              href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/10 bg-white/5 p-2.5 transition-all hover:border-green-500/30 hover:bg-green-500/10 md:block"
            >
              <MessageCircle className="size-4 text-rv-smoke" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 md:hidden"
            >
              {open ? <X className="size-4 text-white" /> : <Menu className="size-4 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-rv-black/95 pt-20 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center gap-6 py-12">
            <Link to="/" onClick={() => setOpen(false)} className="text-lg font-bold text-white">
              الرئيسية
            </Link>
            <a href="#featured" onClick={() => setOpen(false)} className="text-lg font-bold text-rv-smoke">
              المنتجات
            </a>
            <a href="#story" onClick={() => setOpen(false)} className="text-lg font-bold text-rv-smoke">
              قصتنا
            </a>
            <a
              href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white"
            >
              <MessageCircle className="size-4" />
              تواصل واتساب
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
