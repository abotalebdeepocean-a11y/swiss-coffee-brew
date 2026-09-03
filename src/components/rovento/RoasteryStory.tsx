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
          style={{ backgroundImage: "url(/images/intenso-bar-real.webp)" }}
        />
        <div className="absolute inset-0 bg-rv-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-rv-black via-transparent to-rv-black" />
      </motion.div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 px-4 md:grid-cols-2 md:px-6"
      >
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold/60">
            Our Roastery
          </span>
          <h2 className="font-display text-3xl font-black text-white md:text-5xl">
            من <span className="gold-gradient-text">المحمصة</span> لبيتك
          </h2>
          <div className="my-6 h-[1px] w-20 bg-gradient-to-r from-rv-gold to-transparent" />
          <p className="max-w-md text-sm leading-relaxed text-rv-smoke md:text-base">
            كل كيس بيتحمص في نفس يوم الشحن مباشرة — مش مخزّن من زمان. من
            أجود المزارع في كولومبيا وإثيوبيا والبرازيل — لحد ما يوصلك الكيس
            طازج في بيتك.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
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

        {/* Fresh beans image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-rv-gold/[0.06] blur-[60px]" />
            <img
              src="/images/fresh-beans.webp"
              alt="Freshly roasted coffee beans"
              className="relative w-[260px] rounded-2xl sm:w-[300px] md:w-[360px]"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-rv-gold/30 bg-rv-black px-4 py-2 text-xs font-bold text-rv-gold">
              Fresh Roasted Daily
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
