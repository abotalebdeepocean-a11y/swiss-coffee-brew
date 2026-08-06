import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo, WhatsAppIcon } from "./art";
import { useCart, whatsappLink } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV = [
  { label: "الرئيسية", to: "/" },
  { label: "المتجر", to: "/shop" },
  { label: "مجموعة MISH", to: "/#signature" },
  { label: "لماذا روفينتو", to: "/#why" },
  { label: "آراء العملاء", to: "/#reviews" },
];

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

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <Link to="/" aria-label="روڤينتو — الرئيسية">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
          {NAV.map((item) => (
            <button
              key={item.to}
              onClick={() => go(item.to)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("مرحبًا ROVENTO 👋 أريد الاستفسار عن منتجاتكم.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden size-10 items-center justify-center border border-white/15 text-[#25d366] transition-colors hover:border-[#25d366]/60 hover:bg-[#25d366]/10 md:flex"
            aria-label="تواصل عبر واتساب"
          >
            <WhatsAppIcon className="size-4.5" />
          </a>

          <Button asChild size="sm" className="hidden rounded-none md:inline-flex">
            <Link to="/shop">اطلب الآن</Link>
          </Button>

          <button
            onClick={openCart}
            className="relative grid size-10 place-items-center border border-white/15 transition-colors hover:border-rv-red hover:text-rv-red"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="size-4.5" />
            {count > 0 && (
              <span className="absolute -top-2 -end-2 grid min-w-5 place-items-center bg-rv-red px-1 font-mono text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center border border-white/15 lg:hidden"
            aria-label="افتح القائمة"
          >
            <Menu className="size-4.5" />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[86%] border-e border-white/10 sm:max-w-sm">
          <SheetHeader className="border-b border-white/10">
            <SheetTitle className="flex items-center justify-between text-start">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center border border-white/15"
                aria-label="إغلاق"
              >
                <X className="size-4" />
              </button>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col px-2" aria-label="قائمة الجوال">
            {NAV.map((item, i) => (
              <button
                key={item.to}
                onClick={() => go(item.to)}
                className="flex items-center justify-between border-b border-white/5 px-4 py-4 text-start text-base font-semibold transition-colors hover:bg-white/5"
              >
                {item.label}
                <span className="font-mono text-[10px] tracking-widest text-rv-red">
                  0{i + 1}
                </span>
              </button>
            ))}
            <div className="mt-6 flex flex-col gap-3 px-4">
              <Button asChild className="rounded-none">
                <Link to="/shop" onClick={() => setOpen(false)}>
                  تسوق الآن
                </Link>
              </Button>
              <a
                href={whatsappLink("مرحبًا ROVENTO 👋 أريد الاستفسار عن منتجاتكم.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center gap-2 border border-[#25d366]/40 text-sm font-semibold text-[#25d366] transition-colors hover:bg-[#25d366]/10"
              >
                <WhatsAppIcon className="size-4" />
                تواصل عبر واتساب
              </a>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
