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
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Parallax background — blurred building from bag artwork */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-cover bg-center blur-sm scale-110" style={{ backgroundImage: "url(/images/intenso-bar-real.webp)" }} />
        <div className="absolute inset-0 bg-rv-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-rv-black via-transparent to-rv-black" />
      </motion.div>

      {/* Content */}
      <motion.div
        ref={textRef}
        style={{ opacity }}
        className="relative z-10 flex h-full items-center justify-center px-4"
      >
        <div className="mx-auto max-w-[800px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold/60">
              Our Roastery
            </span>
            <h2 className="font-display text-3xl font-black text-white md:text-5xl lg:text-6xl">
              من <span className="gold-gradient-text">المحمصة</span> لبيتك
            </h2>
            <div className="mx-auto my-6 h-[1px] w-20 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-rv-smoke md:text-base">
              كل كيس بيتحمص في نفس يوم الشحن مباشرة — مش مخزّن من زمان.
              <br />
              من أجود المزارع في كولومبيا وإثيوبيا والبرازيل —
              <br />
              لحد ما يوصلك الكيس طازج في بيتك.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            {[
              { val: "+500", label: "عميل سعيد" },
              { val: "24-72", label: "ساعة توصيل" },
              { val: "100%", label: "تحميص طازج" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-condensed text-3xl font-bold text-rv-gold md:text-4xl">
                  {stat.val}
                </div>
                <div className="mt-1 text-xs text-rv-smoke">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
