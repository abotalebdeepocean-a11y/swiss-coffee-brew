import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/rovento/art";
import { COMPANY, waLink } from "./content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const CHANNELS = [
  {
    icon: Phone,
    label: "هاتف / واتساب",
    value: COMPANY.phoneDisplay,
    href: COMPANY.phoneHref,
    ltr: true,
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: COMPANY.email,
    href: COMPANY.emailHref,
    ltr: false,
  },
  {
    icon: MapPin,
    label: "العنوان",
    value: "13 شارع أبو بكر الصديق — مدينة الأمل، مدينة نصر أول، القاهرة",
    href: undefined,
    ltr: false,
  },
];

export function Contact() {
  return (
    <Section id="contact">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="gold-border-glow relative overflow-hidden rounded-[2rem] border border-mh-gold/30 bg-gradient-to-b from-mh-navy-800/90 via-mh-navy-900/95 to-mh-navy-950 p-8 md:p-14">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14),transparent_55%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/80 to-transparent"
              aria-hidden="true"
            />

            <div className="relative text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-mh-gold/30 bg-mh-gold/[0.08] px-4 py-1.5 text-xs font-bold text-mh-gold-soft">
                <span className="size-1.5 rotate-45 bg-mh-gold/80" aria-hidden="true" />
                جاهزون للشراكة
              </span>
              <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl md:text-5xl">
                <span className="gold-gradient-text">تواصل معنا</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-8 text-slate-400 md:text-base">
                نحن على بُعد رسالة واحدة — تحدث معنا مباشرة عبر واتساب، أو
                اتصل بنا، أو راسلنا على بريدنا الإلكتروني.
              </p>
            </div>

            <div className="relative mt-12 grid gap-4 md:grid-cols-3">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={`group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-mh-gold/50 hover:bg-mh-gold/[0.06] ${
                    c.href ? "" : "pointer-events-none"
                  }`}
                >
                  <span className="grid size-13 place-items-center rounded-full border border-mh-gold/40 bg-mh-gold/[0.08] text-mh-gold transition-colors group-hover:text-mh-gold-soft">
                    <c.icon className="size-6" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-slate-500">
                      {c.label}
                    </span>
                    <span
                      dir={c.ltr ? "ltr" : undefined}
                      className="mt-1.5 block text-sm font-black leading-7 text-white"
                    >
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={waLink(
                  "السلام عليكم، أرغب في بدء تعاون تجاري مع شركة المحمدية.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center gap-2.5 rounded-full bg-gradient-to-br from-mh-gold-soft via-mh-gold to-mh-gold-deep px-8 text-base font-black text-mh-navy-950 shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition hover:brightness-110"
              >
                <WhatsAppIcon className="size-5" />
                تواصل عبر واتساب
              </a>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex h-13 items-center gap-2 rounded-full border border-mh-gold/40 bg-mh-navy-900/60 px-8 text-base font-bold text-mh-gold-soft backdrop-blur transition hover:border-mh-gold/80 hover:bg-mh-gold/10"
              >
                <Phone className="size-4.5" />
                <span dir="ltr">{COMPANY.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
