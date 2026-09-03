import { motion } from "framer-motion";
import { ShoppingCart, ArrowDown } from "lucide-react";
import { GoldParticles } from "./GoldParticles";

/**
 * LandingHero — القسم الأول من اللاندينج.
 * خلفية داكنة (بني عميق) + نويز + إضاءة ذهبية، منتج رئيسي طافٍ،
 * عنوان وعرض "اكتشف مذاق الفخامة الحقيقية" وزرا CTA.
 */
export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[#1a0f0a] rv-corners">
      {/* تدرج بني غامق سينمائي */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#2d1810] via-[#1a0f0a] to-[#050505]" />
      {/* نويز خفيف */}
      <div className="rv-noise pointer-events-none absolute inset-0" />
      {/* حدود ذهبية زخرفية على الحواف */}
      <div className="pointer-events-none absolute inset-x-4 inset-y-4 rounded-xl border border-rv-gold/[0.08]" />
      {/* زخرفة علوية مزدوجة */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/30 to-transparent" />
      <div className="pointer-events-none absolute top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/15 to-transparent" />

      {/* حركة إضاءة ذهبية عائمة في الخلفية */}
      <motion.div
        animate={{ x: [0, 50, -25, 0], y: [0, -35, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 right-[6%] size-[460px] rounded-full bg-rv-gold/[0.05] blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -40, 25, 0], y: [0, 25, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-[4%] size-[380px] rounded-full bg-[#d4a574]/[0.04] blur-[120px]"
      />
      <GoldParticles count={26} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-8 px-4 pb-20 pt-28 md:grid-cols-2 md:gap-6 md:px-6 md:pt-36 md:pb-24">
        {/* ───── النصوص (يمين في RTL) ───── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="text-center md:text-right"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-4 py-1.5 text-xs font-bold text-rv-gold">
            ☕ ROVENTO — محمصة إسبريسو مصرية
          </span>

          {/* فاصل زخرفي فوق العنوان */}
          <div className="rv-divider mb-5 mt-6 text-rv-gold/40">◆</div>
          <h1 className="text-[2.6rem] font-black leading-[1.15] text-white sm:text-6xl lg:text-[4.1rem] lg:leading-[1.1]">
            <span className="gold-gradient-text-light">اكتشف مذاق</span>
            <br />
            <span className="text-rv-cream">الفخامة </span>
            <span className="gold-gradient-text">الحقيقية</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[460px] text-base font-semibold leading-relaxed text-white/60 md:mx-0 md:text-lg">
            تجربة قهوة استثنائية من أفضل مزارع العالم
            <br />
            <span className="text-rv-gold-light">
              مع شحن مجاني لمدة شهر واحد فقط
            </span>
          </p>

          {/* الأزرار */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#products"
              className="rv-btn group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-[10px] bg-gradient-to-b from-[#f0d488] via-rv-gold to-rv-gold-dark px-9 text-base font-black text-rv-black shadow-[0_8px_30px_-8px_rgba(212,165,116,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_14px_44px_-8px_rgba(224,200,114,0.7)]"
            >
              <ShoppingCart className="size-5" />
              اشتري الآن
              {/* لمعة عند الـ hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <a
              href="#features"
              className="rv-btn inline-flex h-[56px] items-center justify-center gap-2 rounded-[10px] border-2 border-rv-gold/60 px-9 text-base font-black text-rv-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-rv-gold hover:bg-rv-gold/10 hover:text-rv-gold-light"
            >
              تعرف على المزيد
              <ArrowDown className="size-4" />
            </a>
          </div>

          {/* فاصل زخرفي تحت النصوص */}
          <div className="rv-divider mt-8 text-rv-gold/30">◆</div>
          {/* شريط ثقة صغير */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold text-white/45 md:justify-start">
            {["الدفع عند الاستلام", "توصيل 24-72 ساعة"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="text-rv-gold">✓</span>
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ───── صورة المنتج الرئيسية الطافية ───── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto h-[330px] w-full max-w-[430px] sm:h-[420px] lg:h-[470px]"
        >
          {/* هالة ذهبية + حلقة + دخان */}
          <div className="absolute left-1/2 top-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,165,116,0.25)_0%,transparent_62%)] blur-2xl" />
          <div className="absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,165,116,0.06)_0%,transparent_50%)] blur-3xl" />
          <div className="absolute left-1/2 top-[55%] h-20 w-[80%] -translate-x-1/2 rounded-full bg-rv-gold/[0.04] blur-2xl animate-smoke" />
          <div className="absolute left-1/2 top-1/2 size-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-rv-gold/12 animate-spin-slow" />

          {/* المنتج طافٍ */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 bottom-8 top-0 flex items-center justify-center"
          >
            <img
              src="/images/premium-bag.webp"
              alt="ROVENTO Premium — 1 كجم"
              className="h-full w-full object-contain select-none bag-shadow"
              draggable={false}
            />
          </motion.div>

          {/* ظل أرضي */}
          <div className="absolute bottom-1 left-1/2 h-4 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-lg" />

          {/* شارات عائمة */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-2 flex items-center gap-1.5 rounded-full border border-rv-gold/30 bg-black/50 px-3.5 py-2 text-[11px] font-black text-rv-gold-light backdrop-blur-md sm:right-0 sm:text-xs"
          >
            ⭐ الأكثر مبيعاً
          </motion.div>
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3.5 py-2 text-[11px] font-bold text-white/70 backdrop-blur-md sm:left-0 sm:text-xs"
          >
            🌱 1 كجم · 100% أرابيكا
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
