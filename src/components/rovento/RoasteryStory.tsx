import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function RoasteryStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-32">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
          style={{ backgroundImage: "url(/images/intenso-bag-front-new.webp)" }}
        />
        <div className="absolute inset-0 bg-rv-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-rv-black via-transparent to-rv-black" />
      </motion.div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 mx-auto max-w-[1200px] px-4 text-center md:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold/60">
            Our Roastery
          </span>
          <h2 className="font-display text-3xl font-black text-white md:text-5xl">
            من <span className="gold-gradient-text">المحمصة</span> لبيتك
          </h2>
          <div className="mx-auto my-6 h-[1px] w-20 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-rv-smoke md:text-base">
            كل كيس بيتحمص في نفس يوم الشحن مباشرة — مش مخزّن من زمان. من
            أجود المزارع في كولومبيا وإثيوبيا والبرازيل — لحد ما يوصلك الكيس
            طازج في بيتك.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { val: "+500", label: "عميل سعيد" },
              { val: "24-72", label: "ساعة توصيل" },
              { val: "100%", label: "تحميص طازج" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-condensed text-2xl font-bold text-rv-gold md:text-3xl">
                  {stat.val}
                </div>
                <div className="mt-1 text-[10px] text-rv-smoke md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}