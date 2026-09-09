import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * HeroSlider — خلفية سلايدر سينمائية معزولة تمامًا عن باقي الهيرو.
 *
 * لماذا معزول؟ كل التغيير يحدث داخل هذه الطبقة فقط (خلفية absolute
 * بلا تأثير على التخطيط) — الأكياس العائمة والنصوص طبقات مستقلة فوقها
 * في تدفق الصفحة، فلا تُعاد render ولا تتحرك ولا تهتز مهما تغيّرت الصورة.
 *
 * Slide 0 يُعرض في الـ HTML الأولي (بدون تحميل كسول) ليكون LCP فوريًا،
 * والباقي lazy بعد أول تشكيل.
 *
 * الحركة: crossfade بطيء (1.8ث) كل 5 ثوانٍ — لا انزلاق ولا حركة مزعجة.
 * كل صورة layer دائمة absolute inset-0: لا إزالة/تركيب DOM عند التبديل،
 * لا وميض، ولا إعادة تحميل. الإيقاف عند مرور المؤشر يُدار من قسم الهيرو
 * نفسه (خاصية paused) ليشمل الهيرو كله، ويعود تلقائيًا عند الخروج.
 */
const SLIDES = [
  { src: "/images/hero-slide-1.webp" },
  { src: "/images/hero-slide-2.webp" },
  { src: "/images/hero-slide-3.webp" },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1800;

export function HeroSlider({ paused = false }: { paused?: boolean }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timerRef.current !== null) return;
    timerRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, INTERVAL_MS);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!paused) start();
    return stop;
  }, [paused, start, stop]);

  // إيقاف أثناء إخفاء التاب — لا استهلاك بطاقة في الخلفية
  useEffect(() => {
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [start, stop]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* كل الصور layers دائمة inset-0 — التبديل عبر opacity فقط */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          width={1600}
          height={1000}
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-cover select-none",
            "transition-opacity ease-in-out will-change-[opacity]",
            "motion-reduce:transition-none",
          )}
          style={{
            opacity: i === active ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}

      {/* نقاط التنقل — قابلة للنقر ولوحة المفاتيح */}
      <div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5"
        role="tablist"
        aria-label="اختيار خلفية الهيرو"
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`خلفية ${i + 1}`}
            onClick={() => {
              setActive(i);
              stop();
              start(); // إعادة ضبط مؤقت الـ 5 ثوانٍ عند الاختيار اليدوي
            }}
            className={cn(
              "pointer-events-auto h-2.5 cursor-pointer rounded-full border transition-all duration-500 ease-out",
              i === active
                ? "w-8 border-[#e0c872]/90 bg-[#e0c872] shadow-[0_0_12px_rgba(224,200,114,0.55)]"
                : "w-2.5 border-white/35 bg-white/25 hover:border-white/60 hover:bg-white/45",
            )}
          />
        ))}
      </div>
    </div>
  );
}
