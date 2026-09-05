import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, ShieldCheck, Award } from "lucide-react";

const PILLARS = [
  {
    icon: Award,
    title: "جودة حقيقية",
    desc: "مصادر بن موثوقة ومحمصة طازة",
  },
  {
    icon: Truck,
    title: "شحن سريع",
    desc: "بيوصلك في أيام معدودة",
  },
  {
    icon: ShieldCheck,
    title: "ضمان استرجاع",
    desc: "مش عاجبك، ترجعه بسهولة",
  },
];

export function TrustPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-[900px] px-4 md:px-6">
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
