import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Emblem } from "./Emblem";
import { COMPANY, NAV_LINKS } from "./content";

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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-mh-navy-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          {/* Brand */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }}
            className="flex items-center gap-3"
            aria-label="شركة المحمدية — الرئيسية"
          >
            <Emblem className="size-10 md:size-11" />
            <span className="leading-tight">
              <span className="block text-base font-black text-white md:text-lg">
                {COMPANY.name}
              </span>
              <span className="mt-0.5 block text-[10px] font-bold tracking-wide text-mh-gold-soft md:text-[11px]">
                {COMPANY.tagline}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="القائمة الرئيسية"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.to}
                href={item.to}
                onClick={() => goTo(item.to.slice(1))}
                className="rounded-full px-3.5 py-2 text-sm font-bold text-slate-300 transition-colors hover:text-mh-gold-soft"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => goTo("contact")}
              className="hidden rounded-full bg-gradient-to-br from-mh-gold-soft via-mh-gold to-mh-gold-deep px-5 py-2.5 text-sm font-black text-mh-navy-950 shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition hover:brightness-110 sm:inline-flex"
            >
              تواصل معنا
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-e border-white/10 bg-mh-navy-950 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Emblem className="size-10" />
                <span className="leading-tight">
                  <span className="block text-base font-black text-white">
                    {COMPANY.name}
                  </span>
                  <span className="mt-0.5 block text-[10px] font-bold text-mh-gold-soft">
                    {COMPANY.tagline}
                  </span>
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white"
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
                  className="flex items-center justify-between border-b border-white/5 px-2 py-4 text-start text-base font-bold text-slate-200 transition-colors hover:text-mh-gold-soft"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-mh-gold">
                    0{i + 1}
                  </span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-br from-mh-gold-soft via-mh-gold to-mh-gold-deep font-black text-mh-navy-950 shadow-lg"
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
