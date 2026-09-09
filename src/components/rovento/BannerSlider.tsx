import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useImageCandidates } from "./BagVisual";

/** السلايدات — بنرات ROVENTO الحقيقية من Google Drive */
const SLIDES = [
  {
    image: IMAGES.banners.hero,
  },
  {
    image: IMAGES.banners.workshop,
  },
  {
    image: IMAGES.banners.signature,
  },
  {
    image: IMAGES.banners.collections,
  },
  {
    image: IMAGES.banners.choose,
  },
] as const;

const AUTOPLAY_MS = 5500;

/** صورة السلايد — الصور فيها كلام مكتوب، فنشيل النص المضاف */
function SlideImage({ image }: { image: string }) {
  const { src, onError } = useImageCandidates(image);

  if (src) {
    return (
      <>
        <img
          src={src}
          alt=""
          onError={onError}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* تدرج سفلي خفيف فقط — الصور فيها كلام مكتوب */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      </>
    );
  }

  // Fallback إذا الصورة مش موجودة
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-coffee-950 via-[#17120d] to-coffee-950">
      <div className="text-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-rv-gold">
          ROVENTO
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-rv-gold/60" />
      </div>
    </div>
  );
}

/**
 * سلايدر البنرات — سينمائي، متجاوب، مسؤول بالكامل على الموبايل
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

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  // تسخين كاش الصور بعد أول رسم — أول تبديل سلايد يصبح فوريًا من الكاش
  // بدل انتظار تنزيل الصورة (كان يظهر فراغ/سقوط للفالباك في أول دورة).
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = `${s.image}.webp`;
    });
  }, []);

  const slide = SLIDES[index];

  return (
    <section
      aria-label="ROVENTO عروض وبانرات"
      className="relative w-full overflow-hidden border-b border-stone-800 bg-coffee-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* أبعاد مسؤولة: أعلى على الموبايل، أوسع على الشاشات الكبيرة */}
      <div className="relative aspect-[3/2] w-full sm:aspect-[16/9] md:aspect-[16/7]">
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
            <SlideImage image={slide.image} />
          </motion.div>
        </AnimatePresence>

        {/* تدرج سفلي خفيف */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

        {/* عربي RTL: السهم على اليسار = التالي */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="السلايد التالي"
          className="absolute end-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:border-rv-gold hover:bg-black/80 hover:text-rv-gold sm:end-5 sm:size-12"
        >
          <ChevronLeft className="size-5 sm:size-6" />
        </button>

        {/* عربي RTL: السهم على اليمين = السابق */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="السلايد السابق"
          className="absolute start-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:border-rv-gold hover:bg-black/80 hover:text-rv-gold sm:start-5 sm:size-12"
        >
          <ChevronRight className="size-5 sm:size-6" />
        </button>

        {/* النقاط — سهلة اللمس على الموبايل */}
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2 sm:bottom-5">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`الانتقال إلى السلايد ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 sm:h-2.5 ${
                i === index
                  ? "w-10 bg-rv-gold shadow-lg shadow-rv-gold/30"
                  : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
