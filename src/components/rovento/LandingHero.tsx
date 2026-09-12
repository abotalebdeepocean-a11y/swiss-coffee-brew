import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { HeroSlider, HeroDots } from "./HeroSlider";
import { FlavorProfileCard, FLAVOR_COMPARISON_HINT } from "./FlavorProfileCard";

/**
 * Hero — "بتدفع في قهوتك... وبتشرب نص المذاق؟"
 * يبدأ بسؤال يلمس الألم (القهوة المخزّنة) مش بيان يصف المنتج، وبعدين يقدّم الحل:
 * خلفية سلايدر سينمائية (بانران يتقدّمان تلقائيًا كل 5 ثوانٍ) + الأكياس
 * العائمة ثابتة فوقها كطبقة مستقلة تمامًا: السلايدر داخل طبقة absolute
 * معزولة، فلا تُعاد render للأكياس ولا تتحرك ولا تهتز مهما تغيّرت الصورة.
 *
 * ترتيب المنتجات (طلب المالك): بريميوم أولًا — الجهة اليمنى/الموقع الأساسي،
 * وبار إنتنسو ثانيًا — الجهة اليسرى. على الموبايل (عمودي): بريميوم فوق.
 *
 * حركة النصوص المتزامنة مع السلايدر (CSS transitions فقط، بلا مكتبات):
 *   خروج العنوان  : 300ms ease-in — opacity 1→0 + translateY(0→-12px)
 *   دخول العنوان  : 400ms ease-out بتأخير 200ms — opacity 0→1 + translateY(12px→0)
 *   السطر الفرعي   : نفس حركة الدخول بتأخير إضافي 100ms بعد العنوان
 *   الأكياس        : crossfade شفافية فقط (500ms) بلا transform — ثابتة
 * الأكياس تنعكس شفافيتها مع السلايد النشط (طبقتان دائمتان، تبديل opacity
 * فقط) فيبدو النص يطفو بلطف فوق مشهد ثابت — كلها في src/index.css
 * (rv-hero-text / rv-bag-crossfade) مع تعطيل transforms كليًا عند
 * prefers-reduced-motion (يبقى opacity فقط).
 *
 * الإيقاف: مرور المؤشر فوق الهيرو (hover) أو اللمس على الشاشات اللمسية
 * (touchstart)، واستئناف تلقائي بعد ثانيتين من آخر لمسة.
 */

/** بروفايل النكهة — المكوّن المشترك FlavorProfileCard (مقاييس موحّدة من 10) */

/** ═══ نصوص الهيرو لكل سلايد ═══ */
const HEADLINES = [
  <>
    <span className="text-[#f5efe6]">بتدفع في قهوتك... </span>
    <span className="gold-gradient-text">وبتشرب نص المذاق؟</span>
  </>,
  <span className="text-[#f5efe6]">
    روفينتو بتحافظ على حبوب القهوة فريش لحد ما توصل باب بيتك
  </span>,
];

export function LandingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [sliderPaused, setSliderPaused] = useState(false);
  const [active, setActive] = useState(0);
  /** حالة حركة النص: ثابت | خارج | داخل (آلية النقل عبر أصناف CSS) */
  const [textPhase, setTextPhase] = useState<"idle" | "out" | "pre">("idle");
  const touchTimerRef = useRef<number | null>(null);
  const { add } = useCart();
  const intenso = getProduct("rovento-bar-intenso-1kg");
  const premium = getProduct("rovento-premium-1kg");

  // ── تبديل السلايد مع حركة النص: خروج 300ms ← دخول بتأخير 200ms ──
  // عند التبديل: نخلي العنوان القديم يخرج (rv-hero-text--out 300ms)،
  // ثم عند انتهائه نبدّل المحتوى ونركّب rv-hero-text--pre لحظة واحدة
  // (نقطة انطلاق translateY(12px) بلا انتقال)، ثم نزيله لينطلق انتقال
  // الدخول 400ms ease-out بتأخير 200ms المعرّف في CSS.
  const changeSlide = (next: number) => {
    setActive((current) => {
      if (next === current) return current;
      setTextPhase("out");
      window.setTimeout(() => {
        setActive(next);
        setTextPhase("pre");
        // إطار رسم واحد لإلغاء --pre وانطلاق انتقال الدخول
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTextPhase("idle");
          });
        });
      }, 300);
      return current;
    });
  };

  // ── إيقاف مؤقت عند اللمس — استئناف تلقائي بعد ثانيتين ──
  useEffect(() => {
    const onTouch = () => {
      setSliderPaused(true);
      if (touchTimerRef.current !== null) {
        window.clearTimeout(touchTimerRef.current);
      }
      touchTimerRef.current = window.setTimeout(() => {
        setSliderPaused(false);
        touchTimerRef.current = null;
      }, 2000);
    };
    const el = ref.current;
    el?.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", onTouch);
      if (touchTimerRef.current !== null) {
        window.clearTimeout(touchTimerRef.current);
      }
    };
  }, []);

  const headlineClass =
    textPhase === "out"
      ? "rv-hero-text rv-hero-text--out"
      : textPhase === "pre"
        ? "rv-hero-text rv-hero-text--pre"
        : "rv-hero-text";

  const subClass =
    textPhase === "out"
      ? "rv-hero-text rv-hero-text--sub rv-hero-text--out"
      : textPhase === "pre"
        ? "rv-hero-text rv-hero-text--sub rv-hero-text--pre"
        : "rv-hero-text rv-hero-text--sub";

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-20"
      onMouseEnter={() => setSliderPaused(true)}
      onMouseLeave={() => setSliderPaused(false)}
    >
      {/* ═══ الطبقة 1 — خلفية السلايدر المتغيرة (معزولة تمامًا) ═══ */}
      <HeroSlider active={active} paused={sliderPaused} onActiveChange={changeSlide} />

      {/* ═══ الطبقة 2 — تعتيم خفيف لوضوح النص + اندماج أعلى/أسفل ═══ */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[#0a0a0a]/20" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      {/* ═══ الطبقة 3 — عناصر زخرفية ثابتة (حبيبات سينمائية) ═══ */}
      <div className="rv-noise pointer-events-none absolute inset-0 z-[2]" />

      {/* ═══ Top bar — origin story line ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-30 mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-4 text-[10px] font-bold tracking-[0.35em] text-[#e0c872] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-xs"
      >
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e0c872]/50" />
        من مزارع الجبال — إلى فنجانك
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e0c872]/50" />
      </motion.div>

      {/* ═══ Headline — يتبدّل بتلاشٍ + ارتفاع خفيف متزامن مع السلايدر ═══ */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="relative z-30 mx-auto mt-6 max-w-[900px] px-4 text-center text-4xl font-black leading-[1.25] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] md:text-6xl lg:text-7xl"
      >
        <span key={active} className={headlineClass}>
          {HEADLINES[active]}
        </span>
      </motion.h1>

      {/* ═══ Subheadline — نفس حركة العنوان بتأخير +100ms ═══ */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="relative z-30 mx-auto mt-4 max-w-[720px] px-4 text-center text-sm leading-relaxed text-[#f5efe6]/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-base"
      >
        <span className={subClass}>
          نقدم تجربة الحصول على أفضل أنواع حبوب القهوة في مصر ونعمل على تقديمها
          بأفضل جودة وسعر تستحقونه —{" "}
          <span className="font-bold text-[#e0c872]">
            روفينتو بتحمصلك طلبك مخصوص.. مش من المخزن
          </span>
        </span>
      </motion.p>

      {/* ═══ The two bags with prices — بريميوم يمين (الأول)، بار إنتنسو يسار ═══ */}
      <div
        id="products"
        className="relative z-20 mx-auto mt-10 flex max-w-[820px] scroll-mt-24 flex-col items-stretch gap-8 px-4 sm:gap-10 md:mt-14 md:flex-row md:items-end md:gap-16"
      >
        {/* Premium — first (right in RTL / top on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="group flex flex-1 flex-col items-center"
        >
          <Link
            to="/product/rovento-premium-1kg"
            aria-label="بريميوم — انتقل إلى صفحة المنتج"
            className="animate-levitate relative block cursor-pointer"
          >
            <img
              src="/images/premium-bag.webp"
              alt="ROVENTO بريميوم — الوجه الأمامي"
              fetchPriority="high"
              decoding="async"
              width={400}
              height={600}
              className="h-[190px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
            />
          </Link>

            <div className="mt-5 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-black gold-gradient-text md:text-4xl">
                  {premium?.price}
                </span>
                <span className="text-xs font-bold text-[#f5efe6]/80">ج.م</span>
              </div>
              {premium?.oldPrice && (
                <span className="rv-old-price rv-price-flash mt-1 block text-center text-sm font-bold text-[#888888]">
                  بدلًا من {premium.oldPrice} ج.م
                </span>
              )}
              <p className="mt-1 font-condensed text-[11px] tracking-[0.3em] text-[#f5efe6]/70 uppercase">
                Premium
              </p>
              <p className="mx-auto mt-1.5 max-w-[180px] text-[11px] leading-relaxed text-[#f5efe6]/80">
                ناعمة ومتوازنة ومش محتاجة سكر — ٥٠٪ أرابيكا ٥٠٪ روبوسيتا ، خليط متوازن من حبوب قهوة كولومبي و جواتيمالي و هندي
              </p>
            </div>

          <FlavorProfileCard profileKey="premium" />

          <button
            onClick={() => add("rovento-premium-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl border-2 border-[#c9a84c]/60 bg-[#0a0a0a]/30 px-5 py-2.5 text-xs font-black text-[#e0c872] opacity-90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 hover:opacity-100 md:text-sm"
          >
            <ShoppingCart className="size-3.5" />
            جرّب الفاخر ←
          </button>
        </motion.div>

        {/* Bar Intenso — second (left in RTL / below on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.85, ease: "easeOut" }}
          className="group flex flex-1 flex-col items-center"
        >
          <Link
            to="/product/rovento-bar-intenso-1kg"
            aria-label="بار إنتنسو — انتقل إلى صفحة المنتج"
            className="animate-levitate-reverse relative block cursor-pointer"
          >
            <img
              src="/images/intenso-bag-front-new.webp"
              alt="ROVENTO بار إنتنسو — الوجه الأمامي"
              fetchPriority="high"
              decoding="async"
              width={400}
              height={600}
              className="h-[190px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
            />
          </Link>

            <div className="mt-5 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-black gold-gradient-text md:text-4xl">
                  {intenso?.price}
                </span>
                <span className="text-xs font-bold text-[#f5efe6]/80">ج.م</span>
              </div>
              {intenso?.oldPrice && (
                <span className="rv-old-price rv-price-flash mt-1 block text-center text-sm font-bold text-[#888888]">
                  بدلًا من {intenso.oldPrice} ج.م
                </span>
              )}
              <p className="mt-1 font-condensed text-[11px] tracking-[0.3em] text-[#f5efe6]/70 uppercase">
                Bar Intenso
              </p>
              <p className="mx-auto mt-1.5 max-w-[180px] text-[11px] leading-relaxed text-[#f5efe6]/80">
                ٧٠٪ روبوسيتا ٣٠٪ ارابيكا ، خليط من حبوب قهوة كولومبي و هندي و جواتيمالي — كريمة غنية وكافيين أعلى
              </p>
            </div>

          <FlavorProfileCard profileKey="intenso" />

          <button
            onClick={() => add("rovento-bar-intenso-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl bg-[#c9a84c] px-5 py-2.5 text-xs font-black text-[#0a0a0a] opacity-90 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:opacity-100 md:text-sm"
          >
            <ShoppingCart className="size-3.5" />
            جرّب القوي ←
          </button>
        </motion.div>
      </div>

      {/* ═══ تلميح المقارنة بين البلندين ═══ */}
      <p className="relative z-30 mx-auto mt-8 max-w-[520px] rounded-full border border-[#c49b34]/20 bg-black/40 px-5 py-2 text-center text-[11px] font-bold leading-relaxed text-[#e0c872]/90 backdrop-blur-sm md:text-xs">
        {FLAVOR_COMPARISON_HINT}
      </p>

      {/* ═══ نقاط التنقل — 24px تحت أزرار CTA ═══ */}
      <div className="relative z-30 mt-6 flex justify-center">
        <HeroDots active={active} onSelect={changeSlide} />
      </div>

      {/* ═══ Mark + seal line ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-30 mt-6 flex flex-col items-center gap-3 pb-14"
      >
        <img
          src="/images/rovento-logo-real.webp"
          alt="ROVENTO"
          loading="lazy"
          decoding="async"
          className="h-12 w-auto opacity-95"
        />
        <span className="text-[10px] tracking-[0.4em] text-[#f5efe6]/60 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Rovento — Mountain Harvest
        </span>
      </motion.div>
    </section>
  );
}
