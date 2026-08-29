import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Coffee,
  ShoppingBag,
  Star,
  Flame,
} from "lucide-react";

/* ── الصور + القصة ─────────────────────────────────── */
const SLIDES = [
  {
    src: "/images/story-slider/01-choose-packages.png",
    alt: "اختار كيس روفينتو",
    title: "اختار كيسك",
    subtitle: "5 بلندات فاخرة — كل واحد ليه شخصيته",
    icon: ShoppingBag,
    cta: { label: "تصفح المنتجات", href: "#featured" },
  },
  {
    src: "/images/story-slider/02-hero-1.jpeg",
    alt: "روفينتو — قهوة محمصة طازج",
    title: "روفينتو اتولدت",
    subtitle: "من شغف بالقهوة لمحمصة في قلب القاهرة",
    icon: Coffee,
    cta: { label: "اكتشف القصة", href: "#why" },
  },
  {
    src: "/images/story-slider/03-hero-2.jpeg",
    alt: "حبوب القهوة الأصلية",
    title: "حبوب من أفضل المزارع",
    subtitle: "كولومبيا · إثيوبيا · البرازيل — أجود الحبوب عالمياً",
    icon: Star,
    cta: { label: "شف المزيج", href: "#blend-lab" },
  },
  {
    src: "/images/story-slider/04-hero-3.jpeg",
    alt: "عملية التحميص",
    title: "تحميص طازج يومياً",
    subtitle: "كل كيس بيتحمص في نفس يوم الشحن — طعمه غير أي حاجة جربتها",
    icon: Flame,
    cta: { label: "جرّب دلوقتي", href: "#featured" },
  },
  {
    src: "/images/story-slider/05-ad.jpeg",
    alt: "إعلان روفينتو",
    title: "من المحمصة لبيتك",
    subtitle: "شحن مجاني لكل المحافظات — خلال 24 لـ 72 ساعة",
    icon: ShoppingBag,
    cta: { label: "اطلب الآن", href: "#featured" },
  },
  {
    src: "/images/story-slider/06-slider-vavet.png",
    alt: "باقة روفينتو الكاملة",
    title: "الباقة الكاملة",
    subtitle: "اختار الكيسين اللي يناسبك واحصل على خصم 400 ج.م",
    icon: Star,
    cta: { label: "العرض الساري", href: "#offer" },
  },
  {
    src: "/images/story-slider/07-slider-main.png",
    alt: "روفينتو — صمّم خلطتك",
    title: "صمّم خلطتك",
    subtitle: "مختبر روفينتو — حدّد النسب والتحميص والطحن",
    icon: Coffee,
    cta: { label: "ادخل المختبر", href: "#blend-lab" },
  },
  {
    src: "/images/story-slider/08-slider-order.png",
    alt: "اطلب من روفينتو",
    title: "اطلب دلوقتي",
    subtitle: "الدفع عند الاستلام · واتساب · فودافون كاش",
    icon: ShoppingBag,
    cta: { label: "اطلب عبر واتساب", href: "https://wa.me/201033012381" },
  },
];

const INTERVAL = 5000; // 5 ثواني لكل شريحة

/* ── المكوّن الرئيسي ──────────────────────────────── */
export function StorySlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 يسار، +1 يمين
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const total = SLIDES.length;

  const go = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setCurrent(((idx % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, next]);

  // Touch/swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const slide = SLIDES[current];
  const Icon = slide.icon;

  // Variantز للحركة
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="story"
      className="relative w-full overflow-hidden border-y border-stone-800 bg-[#0d0b09]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* العنوان العلوي */}
      <div className="relative z-20 mx-auto flex max-w-[1200px] items-center justify-between px-4 pb-3 pt-5 md:px-6 md:pb-4 md:pt-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-rv-gold/15">
            <Coffee className="size-5 text-rv-gold" />
          </div>
          <div>
            <h2 className="text-base font-black text-stone-100 md:text-lg">
              قصة روفينتو
            </h2>
            <p className="text-[11px] text-stone-500">
              {current + 1} / {total}
            </p>
          </div>
        </div>

        {/* أزرار التشغيل/الإيقاف */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-stone-400 transition hover:border-rv-gold/40 hover:text-rv-gold"
          aria-label={isPlaying ? "إيقاف" : "تشغيل"}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </button>
      </div>

      {/* السلايدر */}
      <div className="relative h-[300px] w-full sm:h-[380px] md:h-[480px] lg:h-[540px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {/* الصورة */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="size-full object-cover"
              loading={current === 0 ? "eager" : "lazy"}
            />

            {/* تراكب داكن */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

            {/* النص */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 pt-16 sm:px-8 md:px-12 lg:px-16">
              <div className="mx-auto max-w-[1200px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* الشارة */}
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-3 py-1.5">
                    <Icon className="size-3.5 text-rv-gold" />
                    <span className="text-[11px] font-bold text-rv-gold">
                      {slide.title}
                    </span>
                  </div>

                  {/* العنوان */}
                  <h3 className="mb-2 text-2xl font-black text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h3>

                  {/* الوصف */}
                  <p className="mb-4 max-w-lg text-sm leading-relaxed text-stone-300 md:text-base">
                    {slide.subtitle}
                  </p>

                  {/* الزر */}
                  <a
                    href={slide.cta.href}
                    onClick={(e) => {
                      if (slide.cta.href.startsWith("#")) {
                        e.preventDefault();
                        const el = document.querySelector(slide.cta.href);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-rv-gold px-6 py-3 text-sm font-black text-black transition-all hover:-translate-y-0.5 hover:bg-[#d4af37] hover:shadow-[0_4px_20px_rgba(201,162,39,0.4)]"
                  >
                    {slide.cta.label}
                    <ChevronLeft className="size-4" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* أزرار التنقل */}
        <button
          onClick={prev}
          className="absolute start-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:border-rv-gold/50 hover:text-rv-gold md:start-6 md:size-12"
          aria-label="الشريحة السابقة"
        >
          <ChevronRight className="size-5 md:size-6" />
        </button>
        <button
          onClick={next}
          className="absolute end-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:border-rv-gold/50 hover:text-rv-gold md:end-6 md:size-12"
          aria-label="الشريحة التالية"
        >
          <ChevronLeft className="size-5 md:size-6" />
        </button>
      </div>

      {/* نقاط التنقل + شريط التقدم */}
      <div className="relative z-20 mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-4 md:px-6 md:py-5">
        {/* النقاط */}
        <div className="flex flex-1 items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="group relative"
              aria-label={`شريحة ${i + 1}`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-rv-gold"
                    : "w-2 bg-stone-600 group-hover:bg-stone-400"
                }`}
              />
              {i === current && isPlaying && (
                <motion.div
                  className="absolute inset-0 h-2 rounded-full bg-rv-gold/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                  style={{ transformOrigin: "right" }}
                  key={`progress-${current}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
