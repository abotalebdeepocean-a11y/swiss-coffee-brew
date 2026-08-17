import { Mail, MapPin, Phone } from "lucide-react";
import { Emblem } from "./Emblem";
import { COMPANY, NAV_LINKS } from "./content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-mh-navy-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <Emblem className="size-11" />
              <span className="leading-tight">
                <span className="block text-lg font-black text-white">
                  {COMPANY.name}
                </span>
                <span className="mt-0.5 block text-[11px] font-bold text-mh-gold-soft">
                  {COMPANY.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              شريك استراتيجي في المقاولات والتوريدات والتجارة الدولية،
              ومتخصصون في توريد وتصدير المعادن الثمينة والاستراتيجية وفق
              أعلى المعايير العالمية.
            </p>
          </div>

          {/* quick links */}
          <nav aria-label="روابط سريعة">
            <h3 className="text-sm font-black text-white">روابط سريعة</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="text-sm font-bold text-slate-400 transition-colors hover:text-mh-gold-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="text-sm font-black text-white">معلومات التواصل</h3>
            <ul className="mt-4 space-y-3 text-sm font-bold text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-mh-gold" />
                <a
                  href={COMPANY.phoneHref}
                  dir="ltr"
                  className="transition-colors hover:text-white"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-mh-gold" />
                <a
                  href={COMPANY.emailHref}
                  className="break-all transition-colors hover:text-white"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-mh-gold" />
                <span className="leading-6">{COMPANY.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs font-bold text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.fullName} — جميع الحقوق محفوظة</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rotate-45 bg-mh-gold/70" aria-hidden="true" />
            سجل تجاري وبطاقة ضريبية منذ 2013
          </p>
        </div>
      </div>
    </footer>
  );
}
