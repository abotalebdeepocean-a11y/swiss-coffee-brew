import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { SlideVisual, useImageCandidates } from "./BagVisual";

/** السلايدات الأربعة — بنرات ROVENTO الحقيقية من Google Drive */
const SLIDES = [
  {
    image: IMAGES.banners.hero,
    title: "ROVENTO — مش قهوة… دي شخصية",
  },
  {
    image: IMAGES.banners.workshop,
    title: "ROVENTO × Brikka — طعم قهوة لا ينسى",
  },
  {
    image: IMAGES.banners.signature,
    title: "ROVENTO — أكياسنا المتعددة",
  },
  {
    image: IMAGES.banners.collections,
    title: "ROVENTO — طزاجة محفوظة بصمام أحادي",
  },
] as const;

const AUTOPLAY_MS = 5200;

function FallbackSlide({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-coffee-950 via-[#17120d] to-coffee-950">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-rv-gold">
          ROVENTO
        </p>
        <p className="mt-3 text-3xl font-black text-white md:text-5xl">
          {title}
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-rv-gold/60" />
      </div>
    </div>
  );
}

/** صورة السلايد — بتجرب png/jpg/webp وتقع على التصميم البديل عند الحاجة */
function SlideImage({ image, title }: { image: string; title: string }) {
  const { src, onError } = useImageCandidates(image);
  return (
    <SlideVisual
      src={src}
      onError={onError}
      scrim="soft"
      fallback={() => <FallbackSlide title={title} />}
    />
  );
}

/**
 * سلايدر البنرات — سينمائي، يشتغل تلقائيًا، ومسؤول بالكامل على الموبايل:
 * سحب باللمس + أسهم + نقاط، وأبعاد (aspect) مضبوطة لكل شاشة حتى لا تتقطع
 * الصورة أو تظهر فارغة على أي هاتف.
 */
export function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = SLIDES.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  const goTo = useCallback((i: number) => setIndex(i % count), [count]);

  // تشغيل تلقائي — يتوقف مؤقتًا عند اللمس أو الوقوف عليه
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      aria-label="ROVENTO عروض وبانرات"
      className="relative w-full overflow-hidden border-b border-stone-800 bg-coffee-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* أبعاد مسؤولة: على الموبايل 4:3 لسهولة القراءة، وأوسع على الشاشات الكبيرة */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-[21/9]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
            onClick={() => go(1)}
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null;
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              const end = e.changedTouches[0]?.clientX ?? null;
              if (touchX.current !== null && end !== null) {
                const delta = end - touchX.current;
                if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
              }
              touchX.current = null;
              setPaused(false);
            }}
          >
            <SlideImage image={SLIDES[index].image} title={SLIDES[index].title} />
          </motion.div>
        </AnimatePresence>

        {/* تدرج سفلي خفيف لراحة النقاط والأسهم على أي صورة */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

        {/* عربي RTL: السهم على اليسار = التالي (يتقدم مع اتجاه القراءة) */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="السلايد التالي"
          className="absolute end-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:border-rv-gold hover:bg-black/70 hover:text-rv-gold sm:grid"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* عربي RTL: السهم على اليمين = السابق */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="السلايد السابق"
          className="absolute start-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:border-rv-gold hover:bg-black/70 hover:text-rv-gold sm:grid"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* النقاط — سهلة اللمس على الموبايل */}
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`الانتقال إلى السلايد ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-rv-gold"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
