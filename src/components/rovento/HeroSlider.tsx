import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * HeroSlider — خلفية سلايدر سينمائية معزولة تمامًا عن باقي الهيرو.
 *
 * لماذا معزول؟ كل التغيير يحدث داخل هذه الطبقة فقط (خلفية absolute
 * بلا تأثير على التخطيط) — الأكياس العائمة طبقة مستقلة فوقها، فلا
 * تتحرك ولا تهتز مهما تغيّرت الصورة.
 *
 * الملكية (lifting state): حالة السلايد النشط معاشة في قسم الهيرو
 * (LandingHero) حتى تتزامن نصوص العنوان/السطر الفرعي والنقاط معها.
 * هذا المكوّن "متحكَّم فيه" (controlled): يستقبل active وonActiveChange.
 *
 * الطلبات الخاصة بالمالك: سلايدر البانر الرئيسي يعرض **بانرين فقط**
 * (hero-main-1 و hero-main-2) بالتناوب — لا صور أخرى في السلايدر،
 * ويتقدّم تلقائيًا كل 5 ثوانٍ، ويتوقف عند اللمس أو مرور المؤشر.
 *
 * الحركة: crossfade بطيء (1.8ث) — لا انزلاق ولا حركة مزعجة.
 * كل صورة layer دائمة absolute inset-0: لا إزالة/تركيب DOM عند
 * التبديل، لا وميض، ولا إعادة تحميل. الإيقاف عند مرور المؤشر أو
 * اللمس يُدار من قسم الهيرو نفسه (خاصية paused)، ويتوقف كليًا أثناء
 * إخفاء التاب.
 */

const SLIDES = [
  { src: "/images/hero-main-1.webp", promo: false }, // بانر ١ — من مكتبة Drive
  { src: "/images/hero-main-2.webp", promo: false }, // بانر ٢ — من مكتبة Drive
  // { src: "/images/promo-slide.webp", promo: true }, // مُعطّل — بانر خصم ١٠٪ (لا يُعرض في السلايدر)
  // { src: "/images/hero-slide-1.webp", promo: false }, // مشاهد الجبال القديمة — استُبدلت بطلب المالك
  // { src: "/images/hero-slide-2.webp", promo: false },
  // { src: "/images/hero-slide-3.webp", promo: false },
] as const;

/** عدد السلايدرات الفعّالة — تستخدمه النقاط والهيرو للتنقل */
export const HERO_SLIDE_COUNT = SLIDES.length;

const FADE_MS = 1800;
/** التقدّم التلقائي كل 5 ثوانٍ (طلب المالك) */
const AUTO_ADVANCE_MS = 5000;

export function HeroSlider({
  active,
  paused = false,
  onActiveChange,
}: {
  /** السلايد النشط — مملوك لقسم الهيرو */
  active: number;
  /** إيقاف التقدّم التلقائي (مرور المؤشر / لمس) */
  paused?: boolean;
  /** يُبلّغ قسم الهيرو بالسلايد النشط عند النقر على نقاط التنقل */
  onActiveChange?: (index: number) => void;
}) {
  const timerRef = useRef<number | null>(null);

  // التقدّم التلقائي كل 5 ثوانٍ — يتوقف مع paused وإخفاء التاب
  useEffect(() => {
    if (paused || document.hidden) return;
    timerRef.current = window.setTimeout(() => {
      onActiveChange?.((active + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, paused, onActiveChange]);

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
          {/* وميض خلفي متوهج لبانر العرض — CSS خفيف (يُعطَّل مع reduced-motion) */}
          {slide.promo && <div className="rv-promo-flash motion-reduce:hidden" />}
        </div>
      ))}
    </div>
  );
}

/**
 * HeroDots — نقاط تنقل ذهبية تحت أزرار CTA في الهيرو.
 * 3 نقاط فقط، قطر 8px، غير النشطة بشفافية 40% والنشطة 100%،
 * بلا أسهم — النقر (ولوحة المفاتيح) ينقل مباشرة.
 */
export function HeroDots({
  active,
  onSelect,
  className,
}: {
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2.5", className)}
      role="tablist"
      aria-label="اختيار خلفية الهيرو"
    >
      {Array.from({ length: HERO_SLIDE_COUNT }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`خلفية ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "size-2 cursor-pointer rounded-full border transition-opacity duration-500 ease-out",
            "motion-reduce:transition-none",
            i === active
              ? "border-[#e0c872] bg-[#e0c872] opacity-100 shadow-[0_0_10px_rgba(224,200,114,0.55)]"
              : "border-[#e0c872]/50 bg-[#e0c872]/40 opacity-40 hover:opacity-70",
          )}
        />
      ))}
    </div>
  );
}
