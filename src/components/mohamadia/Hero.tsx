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
  { value: "6", label: "معادن وعناصر استراتيجية" },
  { value: "عالمي", label: "فريق متعدد الجنسيات" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,10,10,0.045),transparent_60%)]" />
        <div className="grid-light absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
        <div className="absolute -left-32 top-[10%] h-px w-[85%] -rotate-[22deg] bg-gradient-to-r from-transparent via-mh-gold/50 to-transparent" />
        <div className="absolute -right-32 bottom-[16%] h-px w-[75%] -rotate-[22deg] bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-16 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-44">
        {/* ---- intro copy ---- */}
        <div>
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-4 py-2 text-xs font-bold text-neutral-700 backdrop-blur md:text-sm"
          >
            <ShieldCheck className="size-4 text-mh-gold" />
            منذ 2013 | سجل تجاري وبطاقة ضريبية
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-7 text-balance text-4xl font-black leading-[1.15] text-neutral-900 sm:text-5xl md:text-6xl md:leading-[1.12]"
          >
            <span className="block">شركة المحمدية</span>
            <span className="gold-text block">للمقاولات العامة</span>
            <span className="block text-neutral-800">والتوريدات العمومية</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-neutral-500 md:text-lg md:leading-9"
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
              className="btn-gold-light inline-flex h-13 items-center gap-2 rounded-full px-7 text-base font-black"
            >
              تواصل الآن
            </a>
            <a
              href="#metals"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-neutral-900 px-7 text-base font-bold text-neutral-900 transition hover:bg-black hover:text-white"
            >
              المعادن المطلوبة
              <ArrowDown className="size-4" />
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(0.45)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-neutral-200 pt-6 text-sm font-bold text-neutral-500"
          >
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <item.icon className="size-4 text-mh-gold" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- executive photo card (black) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_70%_15%,rgba(201,162,39,0.25),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-neutral-900 bg-black shadow-[0_40px_90px_rgba(10,10,10,0.35)]">
            {/* photo */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={IMAGES.chairman}
                alt={COMPANY.chairman}
                className="size-full object-cover object-top"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
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
            <div className="grid gap-2.5 border-t border-white/10 bg-gradient-to-b from-black to-neutral-950 p-5 md:p-6">
              <p className="text-[13px] leading-6 text-white/70">{COMPANY.bio}</p>
              <div className="mt-2 grid gap-2.5">
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-white transition hover:border-mh-gold/60"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mh-gold/50 text-mh-gold">
                    <Phone className="size-4" />
                  </span>
                  <span dir="ltr" className="font-mono tracking-wide">
                    {COMPANY.phoneDisplay}
                  </span>
                </a>
                <a
                  href={COMPANY.emailHref}
                  className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-white transition hover:border-mh-gold/60"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mh-gold/50 text-mh-gold">
                    <Mail className="size-4" />
                  </span>
                  <span className="truncate">{COMPANY.email}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* stats band — black */}
      <div className="relative border-t border-neutral-900 bg-black">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.1),transparent_60%)]"
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
              <p className="mt-2 text-xs font-bold text-white/60 md:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
