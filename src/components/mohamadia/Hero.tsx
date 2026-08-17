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
import { COMPANY, waLink } from "./content";
import { Monogram } from "./Emblem";

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
  { value: "1995", label: "بداية الخبرة التنفيذية" },
  { value: "2013", label: "تأسيس الشركة" },
  { value: "6", label: "معادن وعناصر استراتيجية" },
  { value: "عالمي", label: "فريق متعدد الجنسيات" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(23,34,58,0.9),transparent_60%)]" />
        <div className="swiss-grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
        <div className="absolute -left-32 top-[10%] h-px w-[85%] -rotate-[22deg] bg-gradient-to-r from-transparent via-mh-gold/40 to-transparent" />
        <div className="absolute -right-32 bottom-[16%] h-px w-[75%] -rotate-[22deg] bg-gradient-to-r from-transparent via-mh-gold/25 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-16 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-44">
        {/* ---- intro copy ---- */}
        <div>
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-mh-gold/30 bg-mh-navy-900/70 px-4 py-2 text-xs font-bold text-mh-gold-soft backdrop-blur md:text-sm"
          >
            <ShieldCheck className="size-4 text-mh-gold" />
            منذ 2013 | سجل تجاري وبطاقة ضريبية
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-7 text-balance text-4xl font-black leading-[1.15] text-white sm:text-5xl md:text-6xl md:leading-[1.12]"
          >
            <span className="block">شركة المحمدية</span>
            <span className="gold-gradient-text block">للمقاولات العامة</span>
            <span className="block text-white/90">والتوريدات العمومية</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-slate-300 md:text-lg md:leading-9"
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
              className="inline-flex h-13 items-center gap-2 rounded-full bg-gradient-to-br from-mh-gold-soft via-mh-gold to-mh-gold-deep px-7 text-base font-black text-mh-navy-950 shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition hover:brightness-110"
            >
              تواصل الآن
            </a>
            <a
              href="#metals"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-mh-gold/40 bg-mh-navy-900/60 px-7 text-base font-bold text-mh-gold-soft backdrop-blur transition hover:border-mh-gold/80 hover:bg-mh-gold/10"
            >
              المعادن المطلوبة
              <ArrowDown className="size-4" />
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(0.45)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm font-bold text-slate-400"
          >
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <item.icon className="size-4 text-mh-gold" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- executive profile card ---- */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,0.16),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-mh-gold/25 bg-gradient-to-b from-mh-navy-800/90 via-mh-navy-900/95 to-mh-navy-950 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:p-9">
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/70 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Monogram className="size-16 text-2xl" />
                <div>
                  <p className="text-xl font-black leading-snug text-white md:text-2xl">
                    {COMPANY.chairman}
                  </p>
                  <p className="mt-1 text-sm font-bold text-mh-gold">
                    {COMPANY.chairmanTitle}
                  </p>
                </div>
              </div>
              <EmblemSmall />
            </div>

            <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-8 text-slate-300 md:text-[15px]">
              {COMPANY.bio}
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-mh-gold/40 hover:text-white"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mh-gold/40 text-mh-gold">
                  <Phone className="size-4" />
                </span>
                <span dir="ltr" className="font-mono tracking-wide">
                  {COMPANY.phoneDisplay}
                </span>
              </a>
              <a
                href={COMPANY.emailHref}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-mh-gold/40 hover:text-white"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mh-gold/40 text-mh-gold">
                  <Mail className="size-4" />
                </span>
                <span className="truncate">{COMPANY.email}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* stats strip */}
      <div className="relative border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="gold-gradient-text text-3xl font-black md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-bold text-slate-400 md:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmblemSmall() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="size-12 opacity-80" aria-hidden="true">
      <circle cx="32" cy="32" r="29.5" stroke="#d4af37" strokeWidth="2" opacity="0.55" />
      <path d="M17 46 V33 Q17 28 21 28 Q25 28 25 33 V46 Z" fill="#d4af37" opacity="0.6" />
      <path d="M26 46 V22 Q26 16 32 16 Q38 16 38 22 V46 Z" fill="#d4af37" />
      <path d="M39 46 V29 Q39 24.5 43 24.5 Q47 24.5 47 29 V46 Z" fill="#d4af37" opacity="0.6" />
    </svg>
  );
}
