import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, IMAGES, NAV_LINKS } from "./content";

export function Footer() {
  return (
    <footer className="bg-mh-black">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-24 place-items-center overflow-hidden rounded-lg bg-white/5">
                <img
                  src={IMAGES.logo}
                  alt={COMPANY.fullName}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-black text-white uppercase tracking-wider editorial-heading">
                  {COMPANY.nameEn}
                </span>
                <span className="mt-0.5 block text-[10px] font-bold tracking-widest text-mh-gold uppercase">
                  {COMPANY.taglineEn}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/35">
              {COMPANY.heroIntro}
            </p>
          </div>

          {/* quick links */}
          <nav aria-label="روابط سريعة">
            <h3 className="text-sm font-black text-white uppercase tracking-wider editorial-heading">
              NAVIGATION
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="text-sm font-bold text-white/30 transition-colors hover:text-mh-gold"
                  >
                    {item.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider editorial-heading">
              CONTACT INFO
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-bold text-white/30">
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
                <span className="leading-6">{COMPANY.addressEn}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-center text-xs font-bold text-white/20 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.fullNameEn} — All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rotate-45 bg-mh-gold" aria-hidden="true" />
            Commercial Registry & Tax Card since 2013
          </p>
        </div>
      </div>
    </footer>
  );
}
