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
  { value: "1995", label: "بداية الخبرة التنفيذية" },
  { value: "2013", label: "تأسيس الشركة" },
  { value: "6", label: "قطاعات رئيسية" },
  { value: "37", label: "دولة خارج مصر" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#0a0a0a]">
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.04),transparent_60%)]" />
        <div className="grid-dark absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-44">
        {/* ---- intro copy ---- */}
        <div>
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-mh-gold/30 bg-mh-gold/5 px-4 py-2 text-xs font-bold text-mh-gold-soft backdrop-blur md:text-sm"
          >
            <ShieldCheck className="size-4 text-mh-gold" />
            منذ 2013 | سجل تجاري وبطاقة ضريبية
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-7 text-balance text-4xl font-black leading-[1.15] text-white sm:text-5xl md:text-6xl md:leading-[1.12]"
          >
            <span className="block">شركة المحمدية</span>
            <span className="gold-text block">للمقاولات العامة</span>
            <span className="block text-white/80">والتوريدات العمومية</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-white/50 md:text-lg md:leading-9"
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
              className="btn-gold inline-flex h-13 items-center gap-2 rounded-full px-7 text-base font-black"
            >
              تواصل الآن
            </a>
            <a
              href="#sectors"
              className="btn-outline-gold inline-flex h-13 items-center gap-2 rounded-full px-7 text-base font-bold"
            >
              قطاعات العمل
              <ArrowDown className="size-4" />
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(0.45)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm font-bold text-white/40"
          >
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <item.icon className="size-4 text-mh-gold" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- executive photo card (dark with gold lines) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_70%_15%,rgba(212,175,55,0.2),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111] shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
            {/* gold diagonal lines */}
            <div
              className="absolute -right-20 -top-20 h-[120%] w-px rotate-[25deg] bg-gradient-to-b from-transparent via-mh-gold/40 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute -right-10 -top-20 h-[120%] w-px rotate-[25deg] bg-gradient-to-b from-transparent via-mh-gold/20 to-transparent"
              aria-hidden="true"
            />

            {/* photo */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={IMAGES.chairman}
                alt={COMPANY.chairman}
                className="size-full object-cover object-top"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/80 to-transparent"
                aria-hidden="true"
              />
              {/* name plate on photo */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="text-xl font-black leading-snug text-white md:text-2xl">
                  {COMPANY.chairman}
                </p>
                <p className="mt-1 text-sm font-bold text-mh-gold-soft">
                  {COMPANY.chairmanTitle}
                </p>
              </div>
            </div>

            {/* contact strip */}
            <div className="grid gap-2.5 border-t border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a] p-5 md:p-6">
              <p className="text-[13px] leading-6 text-white/60">{COMPANY.bio}</p>
              <div className="mt-2 grid gap-2.5">
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-bold text-white transition hover:border-mh-gold/50"
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
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-bold text-white transition hover:border-mh-gold/50"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mh-gold/40 text-mh-gold">
                    <Mail className="size-4" />
                  </span>
                  <span className="truncate">{COMPANY.email}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* stats band */}
      <div className="relative border-t border-white/10 bg-[#080808]">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="gold-text text-3xl font-black md:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs font-bold text-white/50 md:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
