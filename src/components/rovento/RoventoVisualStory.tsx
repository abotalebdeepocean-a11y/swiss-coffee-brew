import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, Sparkles } from "lucide-react";
import { ROVENTO_ASSETS, ROVENTO_ASSET_URLS } from "@/lib/rovento-assets";

const LOGO_FILE = "ROVENTO_logo_from_coffee_powder_2K_20260919064334_1.jpeg";
const photoItems = ROVENTO_ASSETS
  .map((filename, index) => ({ filename, src: ROVENTO_ASSET_URLS[index] }))
  .filter((item) => item.filename !== LOGO_FILE);

const slideIndexes = [0, 6, 13];
const slides = slideIndexes.map((index) => photoItems[index]).filter(Boolean);
const sideItems = slideIndexes
  .map((index) => photoItems[index])
  .filter(Boolean);

export function RoventoVisualStory() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-[#080b0b] px-4 py-16 text-[#f5efe6] md:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.12),transparent_52%)]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="mb-8 flex flex-col items-start justify-between gap-5 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[0.32em] text-[#d9bd69] uppercase">
              <Sparkles className="size-3.5" /> ROVENTO · VISUAL JOURNAL
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
              القهوة مش مجرد كيس…
              <span className="mt-2 block text-[#d9bd69]">دي حكاية بتبدأ من التفاصيل.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-stone-400">
            اكتشف عالم روفينتو من خلال صورنا الأصلية. تجربة بصرية هادئة، خامات واضحة، وتفاصيل تخلّي القهوة هي بطلة المشهد.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.55fr_0.8fr]">
          <div className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-[#121615] md:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[active]?.src}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={slides[active]?.src}
                  alt="صورة من مكتبة ROVENTO الأصلية"
                  fetchPriority={active === 0 ? "high" : "auto"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[6000ms] group-hover:scale-[1.035]"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050707]/90 via-[#050707]/15 to-[#050707]/5" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
              <div>
                <span className="mb-3 inline-flex rounded-full border border-[#d9bd69]/40 bg-black/30 px-3 py-1 text-[10px] font-bold tracking-widest text-[#e4ca7b] backdrop-blur-md">
                  من مكتبة روفينتو
                </span>
                <h3 className="text-2xl font-black md:text-4xl">التفاصيل تصنع الفرق</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-stone-200/80">
                  صور أصلية من مكتبتنا، بتجربة متحركة مصممة لتبرز عالم القهوة من غير زحمة بصرية.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.filename}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`عرض الصورة ${index + 1}`}
                    aria-pressed={active === index}
                    className={`h-2 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-[#e4ca7b]" : "w-2 bg-white/50 hover:bg-white"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {sideItems.map((item, index) => (
              <motion.button
                key={item.filename}
                type="button"
                onClick={() => {
                  const slideIndex = slides.findIndex((slide) => slide.filename === item.filename);
                  if (slideIndex >= 0) setActive(slideIndex);
                }}
                whileHover={{ y: -3 }}
                className="group relative min-h-[150px] overflow-hidden rounded-2xl border border-white/10 bg-[#141817] text-right md:min-h-[235px]"
              >
                <img
                  src={item.src}
                  alt={`صورة ${index + 1} من مكتبة ROVENTO`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  ROVENTO · 0{index + 1}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl border border-[#d9bd69]/15 bg-white/[0.025] p-5 md:flex-row md:items-center md:px-7">
          <div>
            <p className="text-sm font-black text-[#e4ca7b]">صور حقيقية من مكتبة العلامة</p>
            <p className="mt-1 text-xs leading-6 text-stone-400">الأسماء الأصلية محفوظة، والصور تُحمّل مباشرة من مستودع ROVENTO.</p>
          </div>
          <a href="#profiles" className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#e4ca7b]">
            اكتشف خلطاتنا <ArrowDownLeft className="size-4" />
          </a>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#d9bd69] uppercase">THE ROVENTO ARCHIVE</p>
              <h3 className="mt-2 text-xl font-black md:text-2xl">من مكتبتنا البصرية</h3>
            </div>
            <span className="text-xs text-stone-500">{photoItems.length} صورة</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {photoItems.map((item, index) => (
              <motion.div
                key={item.filename}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(index % 5, 4) * 0.04 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[#121615]"
              >
                <img
                  src={item.src}
                  alt={`صورة من مكتبة ROVENTO رقم ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-2 right-2 rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[9px] text-white/85 backdrop-blur-sm">
                  ROVENTO
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
