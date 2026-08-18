import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, IMAGES, NAV_LINKS } from "./content";

function goTo(id: string) {
  if (window.location.hash === `#${id}`) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="mh-export-hide fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled || open
            ? "border-b border-black/8 bg-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          {/* Brand — logo only */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }}
            className="flex items-center"
            aria-label="شركة المحمدية — الرئيسية"
          >
            <img
              src={IMAGES.logo}
              alt={COMPANY.fullName}
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="القائمة الرئيسية"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.to}
                href={item.to}
                onClick={() => goTo(item.to.slice(1))}
                className="rounded-full px-3.5 py-2 text-[13px] font-bold text-mh-black/50 transition-colors hover:bg-mh-black/5 hover:text-mh-black"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => goTo("contact")}
              className="hidden rounded-full bg-mh-black px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-mh-charcoal sm:inline-flex"
            >
              تواصل معنا
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-mh-black/10 bg-white text-mh-black lg:hidden"
              aria-label="افتح القائمة"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-e border-mh-black/8 bg-white p-5">
            <div className="flex items-center justify-between border-b border-mh-black/8 pb-4">
              <div className="flex items-center">
                <img
                  src={IMAGES.logo}
                  alt={COMPANY.fullName}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-mh-black/10 text-mh-black"
                aria-label="إغلاق"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="mt-2 flex flex-col" aria-label="قائمة الجوال">
              {NAV_LINKS.map((item, i) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-mh-black/5 px-2 py-4 text-start text-base font-bold text-mh-black/60 transition-colors hover:text-mh-black"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-mh-gold-deep">
                    0{i + 1}
                  </span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-mh-black font-bold text-white"
              >
                تواصل معنا
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
