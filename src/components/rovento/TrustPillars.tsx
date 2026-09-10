import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, ShieldCheck, Award } from "lucide-react";

const PILLARS = [
  {
    icon: Award,
    title: "بتتحمص لطلبك",
    desc: "كل كيس بيتحمص بعد ما تطلبه — مش من مخزن من زمان",
  },
  {
    icon: Truck,
    title: "مش محتاج تثق فينا الأول",
    desc: "ادفع لما يوصّلك — وشوف الكيس بإيدك قبل ما تدفع",
  },
  {
    icon: ShieldCheck,
    title: "مش عجبك؟ ارجعه. خلاص.",
    desc: "14 يوم استرجاع بدون أسئلة وبدون تعقيد",
  },
];

export function TrustPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-[900px] px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center md:mb-14"
        >
          <h2 className="text-2xl font-black md:text-3xl">
            <span className="text-[#f5efe6]">ليه </span>
            <span className="gold-gradient-text">روفينتو؟</span>
          </h2>
          <div className="rv-divider mt-5">
            <span className="text-xs text-[#c9a84c]/40">◆</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 grid size-14 place-items-center rounded-2xl border border-[#c9a84c]/15 bg-[#c9a84c]/[0.06]">
                  <Icon className="size-6 text-[#c9a84c]" />
                </div>
                <h3 className="mb-1.5 text-base font-black text-[#f5efe6]">
                  {pillar.title}
                </h3>
                <p className="max-w-[200px] text-sm leading-relaxed text-[#888888]">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
