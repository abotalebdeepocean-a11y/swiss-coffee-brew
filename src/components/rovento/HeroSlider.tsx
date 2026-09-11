import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * HeroSlider — خلفية سلايدر سينمائية معزولة تمامًا عن باقي الهيرو.
 *
 * لماذا معزول؟ كل التغيير يحدث داخل هذه الطبقة فقط (خلفية absolute
 * بلا تأثير على التخطيط) — الأكياس العائمة والنصوص طبقات مستقلة فوقها
 * في تدفق الصفحة، فلا تُعاد render ولا تتحرك ولا تهتز مهما تغيّرت الصورة.
 *
 * بانر العرض (خصم ١٠٪) مُعطّل حاليًا — لإعادة تفعيله أضف السطر التالي
 * أول المصفوفة: { src: "/images/promo-slide.webp", promo: true },
 * وحدّث الـ preloads في index.html (promo بحق أولوية عالية).
 *
 * الطلبات الخاصة بالمالك: سلايدر البانر الرئيسي يعرض **بانرين فقط**
 * (hero-main-1 و hero-main-2) بالتناوب — لا صور أخرى في السلايدر.
 *
 * الحركة: crossfade بطيء (1.8ث) — لا انزلاق ولا حركة مزعجة.
 * كل صورة layer دائمة absolute inset-0: لا إزالة/تركيب DOM عند التبديل،
 * لا وميض، ولا إعادة تحميل. زمن بقاء كل سلايد مستقل (بانر العرض يبقى
 * أطول قليلًا ليُقرأ العرض). الإيقاف عند مرور المؤشر يُدار من قسم الهيرو
 * نفسه (خاصية paused)، ويتوقف كليًا أثناء إخفاء التاب.
 */
const SLIDES = [
  { src: "/images/hero-main-1.webp", promo: false }, // بانر ١ — من مكتبة Drive
  { src: "/images/hero-main-2.webp", promo: false }, // بانر ٢ — من مكتبة Drive
  // { src: "/images/promo-slide.webp", promo: true }, // مُعطّل — بانر خصم ١٠٪ (لا يُعرض في السلايدر)
  // { src: "/images/hero-slide-1.webp", promo: false }, // مشاهد الجبال القديمة — استُبدلت بطلب المالك
  // { src: "/images/hero-slide-2.webp", promo: false },
  // { src: "/images/hero-slide-3.webp", promo: false },
] as const;

const FADE_MS = 1800;
/** مدة بقاء كل سلايد — بانر العرض يبقى أطول لأن فيه نص العرض */
const HOLD_MS = (promo: boolean) => (promo ? 7000 : 5000);

export function HeroSlider({
  paused = false,
  onActiveChange,
}: {
  paused?: boolean;
  /** يُبلّغ قسم الهيرو بالسلايد النشط — لاستخدامها في مزامنة نص العنوان */
  onActiveChange?: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [pageHidden, setPageHidden] = useState(false);
  const timerRef = useRef<number | null>(null);

  // مزامنة السلايد النشط مع الأب (عنوان الهيرو) — بدون إعادة render للأب
  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  // إيقاف كامل أثناء إخفاء التاب — لا استهلاك بطارية في الخلفية
  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // مؤقت لكل سلايد على حدة — أي تغيير (تبديل/إيقاف/عودة للتاب) يضبطه من جديد
  useEffect(() => {
    if (paused || pageHidden) return;
    timerRef.current = window.setTimeout(
      () => setActive((a) => (a + 1) % SLIDES.length),
      HOLD_MS(SLIDES[active].promo),
    );
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, paused, pageHidden]);

  const goTo = useCallback((i: number) => {
    setActive(i); // المؤقت يُعاد ضبطه تلقائيًا عبر الـ effect
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* كل الصور layers دائمة inset-0 — التبديل عبر opacity فقط */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity ease-in-out will-change-[opacity]",
            "motion-reduce:transition-none",
          )}
          style={{
            opacity: i === active ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        >
          <img
            src={slide.src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            width={1600}
            height={1000}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover select-none"
          />
          {/* وميض خلفي متوهج لبانر العرض — CSS خفيف بدل GIF (يُعطَّل مع reduced-motion) */}
          {slide.promo && <div className="rv-promo-flash motion-reduce:hidden" />}
        </div>
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
            aria-label={slide.promo ? "عرض الخصم" : `خلفية ${i}`}
            onClick={() => goTo(i)}
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
