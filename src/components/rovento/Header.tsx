import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/store";
import { whatsappLink } from "@/lib/store";
import { RoventoMark } from "./RoventoMark";

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
            ? "border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <RoventoMark size={32} />
            <span className="font-condensed text-sm font-bold tracking-[0.2em] text-[#c9a84c] uppercase">
              ROVENTO
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#products"
              className="text-sm font-bold text-[#b0a898] transition-colors hover:text-[#c9a84c]"
            >
              المنتجات
            </a>
            <a
              href="#profiles"
              className="text-sm font-bold text-[#b0a898] transition-colors hover:text-[#c9a84c]"
            >
              البلندات
            </a>
            <a
              href="#flavor"
              className="text-sm font-bold text-[#b0a898] transition-colors hover:text-[#c9a84c]"
            >
              النكهة
            </a>
            <a
              href="#shipping"
              className="text-sm font-bold text-[#b0a898] transition-colors hover:text-[#c9a84c]"
            >
              الشحن
            </a>
            <a
              href="#faq"
              className="text-sm font-bold text-[#b0a898] transition-colors hover:text-[#c9a84c]"
            >
              الأسئلة
            </a>
            <Link
              to="/about"
              className="text-sm font-bold text-[#b0a898] transition-colors hover:text-[#c9a84c]"
            >
              من نحن
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative rounded-full border border-white/10 bg-white/5 p-2.5 transition-all hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/10"
            >
              <ShoppingCart className="size-4 text-[#b0a898]" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#c9a84c] text-[9px] font-black text-[#0a0a0a]">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/10 bg-white/5 p-2.5 transition-all hover:border-green-500/30 hover:bg-green-500/10 md:block"
            >
              <MessageCircle className="size-4 text-[#b0a898]" />
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 md:hidden"
            >
              {open ? (
                <X className="size-4 text-white" />
              ) : (
                <Menu className="size-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a]/95 pt-20 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center gap-6 py-12">
            <a
              href="#products"
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-[#f5efe6]"
            >
              المنتجات
            </a>
            <a
              href="#profiles"
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-[#b0a898]"
            >
              البلندات
            </a>
            <a
              href="#flavor"
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-[#b0a898]"
            >
              النكهة
            </a>
            <a
              href="#shipping"
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-[#b0a898]"
            >
              الشحن
            </a>
            <a
              href="#faq"
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-[#b0a898]"
            >
              الأسئلة
            </a>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-[#b0a898]"
            >
              من نحن
            </Link>
            <a
              href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
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
