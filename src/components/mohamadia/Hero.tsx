import { motion } from "framer-motion";
import {
  ArrowDown,
  CalendarDays,
  FileCheck2,
  Globe2,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { COMPANY, IMAGES, waLink } from "./content";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

const TRUST = [
  { icon: ShieldCheck, label: "سجل تجاري وبطاقة ضريبية" },
  { icon: FileCheck2, label: "عقود دولية موثقة" },
  { icon: Globe2, label: "أسواق عالمية متعددة" },
  { icon: CalendarDays, label: "خبرة تنفيذية منذ 1995" },
];

const STATS = [
  { value: "1995", label: "بداية الخبرة", labelEn: "Experience Started" },
  { value: "2013", label: "تأسيس الشركة", labelEn: "Company Founded" },
  { value: "8", label: "قطاعات رئيسية", labelEn: "Key Sectors" },
  { value: "37", label: "دولة خارج مصر", labelEn: "Countries Beyond Egypt" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-mh-cream">
      {/* Subtle editorial grid */}
      <div className="pointer-events-none absolute inset-0 grid-editorial opacity-40" aria-hidden="true" />

      {/* Decorative diagonal lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-40 top-0 h-[120%] w-px rotate-[12deg] bg-mh-black/5" />
        <div className="absolute -right-20 top-0 h-[120%] w-px rotate-[12deg] bg-mh-black/3" />
        <div className="absolute -left-40 top-0 h-[120%] w-px rotate-[-12deg] bg-mh-gold/10" />
      </div>

      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 top-20 size-40 rounded-full border border-mh-gold/10" />
        <div className="absolute -right-10 top-30 size-20 rounded-full border border-mh-black/5" />
        <div className="absolute -left-10 bottom-20 size-32 rounded-full border border-mh-gold/10" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-44">
        {/* ---- intro copy ---- */}
        <div>
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-mh-black/10 bg-white px-4 py-2 text-xs font-bold tracking-wide text-mh-black/60 md:text-sm"
          >
            <ShieldCheck className="size-4 text-mh-gold" />
            منذ 2013 | سجل تجاري وبطاقة ضريبية
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-7 text-balance font-black leading-[1.02] text-mh-black"
          >
            <span className="block text-[clamp(2.5rem,5.5vw,4.5rem)] editorial-heading">
              {COMPANY.nameEn}
            </span>
            <span className="block text-[clamp(1.8rem,4vw,3.2rem)] text-mh-gold-deep editorial-heading">
              {COMPANY.taglineEn}
            </span>
            <span className="block text-[clamp(1.5rem,3vw,2.5rem)] text-mh-black/40 editorial-heading">
              {COMPANY.fullName}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-mh-black/50 md:text-lg md:leading-9"
          >
            {COMPANY.heroIntro}
          </motion.p>

          <motion.div
            {...fadeUp(0.35)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={waLink(
                "السلام عليكم، أرغب في الاستفسار عن خدمات شركة المحمدية والتواصل معكم.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-mh-black px-7 text-base font-bold text-white transition-all hover:bg-mh-charcoal"
            >
              تواصل الآن
            </a>
            <a
              href="#sectors"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-mh-black/15 px-7 text-base font-bold text-mh-black transition-all hover:bg-mh-black/5"
            >
              قطاعات العمل
              <ArrowDown className="size-4" />
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(0.45)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-mh-black/10 pt-6 text-sm font-bold text-mh-black/40"
          >
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <item.icon className="size-4 text-mh-gold" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- chairman photo card (editorial style) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-2xl bg-mh-black shadow-[0_40px_90px_rgba(0,0,0,0.15)]">
            {/* photo */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={IMAGES.chairman}
                alt={COMPANY.chairman}
                className="size-full object-cover object-top grayscale contrast-[1.1]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-mh-black via-mh-black/30 to-transparent"
                aria-hidden="true"
              />
              {/* name plate on photo */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-2xl font-black leading-snug text-white md:text-3xl editorial-heading">
                  {COMPANY.chairmanEn}
                </p>
                <p className="mt-2 text-sm font-bold text-mh-gold">
                  {COMPANY.chairmanTitleEn}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={COMPANY.phoneHref}
                    className="flex items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 text-mh-gold" />
                    <span dir="ltr">{COMPANY.phoneDisplay}</span>
                  </a>
                  <a
                    href={COMPANY.emailHref}
                    className="flex items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-white"
                  >
                    <Mail className="size-4 text-mh-gold" />
                    <span className="truncate max-w-[180px]">{COMPANY.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* stats band — editorial black */}
      <div className="relative border-t border-mh-black/10 bg-mh-black">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-black text-white md:text-5xl editorial-heading">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-bold text-white/40 md:text-sm">
                {s.label}
              </p>
              <p className="mt-1 text-[10px] font-bold text-mh-gold/60 uppercase tracking-wider">
                {s.labelEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
