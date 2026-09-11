import { useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { FlipBag } from "./FlipBag";
import { HeroSlider } from "./HeroSlider";

/**
 * Hero — "بتدفع في قهوتك... وبتشرب نص المذاق؟"
 * يبدأ بسؤال يلمس الألم (القهوة المخزّنة) مش بيان يصف المنتج، وبعدين يقدّم الحل:
 * خلفية سلايدر سينمائية (بانران يتغيّران crossfade كل 5 ثوانٍ) + الأكياس
 * العائمة ثابتة فوقها كطبقة مستقلة تمامًا: السلايدر داخل طبقة absolute
 * معزولة، فلا تُعاد render للأكياس ولا تتحرك ولا تهتز مهما تغيّرت الصورة.
 *
 * ترتيب المنتجات (طلب المالك): بريميوم أولًا — الجهة اليمنى/الموقع الأساسي،
 * وبار إنتنسو ثانيًا — الجهة اليسرى. على الموبايل (عمودي): بريميوم فوق.
 *
 * عنوان الهيرو متزامن مع السلايدر: على السلايد الأول سؤال الألم، وعلى
 * السلايد الثاني وعد الفريش — يتبدّلان بتلاشٍ ناعم دون تحريك باقي الطبقات.
 *
 * ترتيب الطبقات (من الخلف للأمام):
 *   1. صورة الخلفية المتغيرة (HeroSlider)
 *   2. طبقة التعتيم الخفيفة + تدرجات الدمج
 *   3. العناصر الزخرفية الثابتة (rv-noise)
 *   4. أكياس القهوة العائمة (مع الأسعار) — ثابتة تمامًا
 *   5. النصوص والأزرار
 * إيقاف السلايدر عند مرور المؤشر فوق الهيرو كله، واستئنافه عند الخروج.
 */

/** ═══ بروفايل مختصر ببارات مضيئة — نفس محاور تفاصيل النكهة بشكل مصغّر ═══ */
const MINI_AXES = [
  { label: "الجسم", intenso: 9, premium: 9 },
  { label: "الكريما", intenso: 9, premium: 8 },
  { label: "الروائح", intenso: 7, premium: 7 },
  { label: "الحلاوة", intenso: 4, premium: 5 },
];

function MiniProfileBars({ blend }: { blend: "intenso" | "premium" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="mt-3 w-full max-w-[250px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 backdrop-blur-sm"
    >
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-white/[0.07] pb-1.5">
        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#c9a84c]/80">
          بروفايل النكهة
        </span>
        <span className="text-[9px] text-[#f5efe6]/40">من 10</span>
      </div>
      <div className="space-y-1.5">
        {MINI_AXES.map((axis, i) => {
          const value = blend === "intenso" ? axis.intenso : axis.premium;
          return (
            <div key={axis.label} className="flex items-center gap-2">
              <span className="w-12 shrink-0 text-[10px] font-bold text-[#b0a898]">
                {axis.label}
              </span>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${value * 10}%` } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.09,
                    ease: "easeOut",
                  }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #a08030 0%, #c9a84c 60%, #e0c872 100%)",
                    boxShadow: "0 0 8px rgba(224,200,114,0.6)",
                  }}
                />
              </div>
              <span className="w-4 text-center font-mono text-[9px] font-bold text-[#888888]">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** ═══ عنوان السلايد الثاني — وعد الفريش ═══ */
const SLIDE2_HEADLINE = "روفينتو بتحافظ على حبوب القهوة فريش لحد ما توصل باب بيتك";

export function LandingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [sliderPaused, setSliderPaused] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const { add } = useCart();
  const intenso = getProduct("rovento-bar-intenso-1kg");
  const premium = getProduct("rovento-premium-1kg");

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-20"
      onMouseEnter={() => setSliderPaused(true)}
      onMouseLeave={() => setSliderPaused(false)}
    >
      {/* ═══ الطبقة 1 — خلفية السلايدر المتغيرة (معزولة تمامًا) ═══ */}
      <HeroSlider paused={sliderPaused} onActiveChange={setSlideIndex} />

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

      {/* ═══ Headline — متزامن مع السلايدر (تلاشٍ ناعم بين العنوانين) ═══ */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="relative z-30 mx-auto mt-6 max-w-[900px] px-4 text-center text-4xl font-black leading-[1.25] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] md:text-6xl lg:text-7xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="inline-block"
          >
            {slideIndex === 1 ? (
              <span className="text-[#f5efe6]">{SLIDE2_HEADLINE}</span>
            ) : (
              <>
                <span className="text-[#f5efe6]">بتدفع في قهوتك... </span>
                <span className="gold-gradient-text">وبتشرب نص المذاق؟</span>
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.h1>

      {/* ═══ Subheadline — فقرة واحدة تلتف طبيعيًا ═══ */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="relative z-30 mx-auto mt-4 max-w-[720px] px-4 text-center text-sm leading-relaxed text-[#f5efe6]/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-base"
      >
        نقدم تجربة الحصول على أفضل أنواع حبوب القهوة في مصر ونعمل على تقديمها
        بأفضل جودة وسعر تستحقونه —{" "}
        <span className="font-bold text-[#e0c872]">
          روفينتو بتحمصلك طلبك مخصوص.. مش من المخزن
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
            <FlipBag
              altFront="ROVENTO بريميوم — الوجه الأمامي"
              altBack="ROVENTO بريميوم — الغلاف الخلفي"
              front={
                <img
                  src="/images/premium-bag.webp"
                  alt=""
                  fetchPriority="high"
                  decoding="async"
                  width={400}
                  height={600}
                  className="h-[190px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
                />
              }
              back={
                <img
                  src="/images/premium-bag-back.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={600}
                  className="h-[190px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] sm:h-[260px] md:h-[320px]"
                />
              }
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
              ناعمة ومتوازنة ومش محتاجة سكر — 50% أرابيكا و50% روبوستا بتحميص وسط
            </p>
          </div>

          <MiniProfileBars blend="premium" />

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
            <FlipBag
              altFront="ROVENTO بار إنتنسو — الوجه الأمامي"
              altBack="ROVENTO بار إنتنسو — الغلاف الخلفي"
              front={
                <img
                  src="/images/intenso-bag-front-new.webp"
                  alt=""
                  fetchPriority="high"
                  decoding="async"
                  width={400}
                  height={600}
                  className="h-[190px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
                />
              }
              back={
                <img
                  src="/images/intenso-bag-back-new.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={600}
                  className="h-[190px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] sm:h-[260px] md:h-[320px]"
                />
              }
            />
          </Link>

          {/* Price tag beneath */}
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
              الكريمة دي مش بتتلاشى — قوي وكافيين أعلى، واتعمل أصلاً للمشروبات اللي بالحليب
            </p>
          </div>

          <MiniProfileBars blend="intenso" />

          <button
            onClick={() => add("rovento-bar-intenso-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl bg-[#c9a84c] px-5 py-2.5 text-xs font-black text-[#0a0a0a] opacity-90 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:opacity-100 md:text-sm"
          >
            <ShoppingCart className="size-3.5" />
            جرّب القوي ←
          </button>
        </motion.div>
      </div>

      {/* ═══ Mark + seal line ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-30 mt-10 flex flex-col items-center gap-3 pb-14"
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
