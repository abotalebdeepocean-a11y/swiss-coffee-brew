import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Star, Truck, CreditCard } from "lucide-react";

const TRUST = [
  { value: "4.9 / 5", label: "تقييم العملاء", icon: Star },
  { value: "24-72 ساعة", label: "شحن لكل المحافظات", icon: Truck },
  { value: "+500", label: "عميل سعيد في مصر", icon: ShieldCheck },
  { value: "100%", label: "دفع آمن ومؤكد", icon: CreditCard },
];

const MARQUEE_ITEMS = [
  "شحن مجاني لأي مكان في مصر",
  "•",
  "100% منتج أصلي معتمد",
  "•",
  "+500 عميل سعيد",
  "•",
  "تقييم 4.9/5 على كل الطلبات",
  "•",
  "توصيل سريع 24-72 ساعة",
  "•",
];

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      {/* Marquee strip */}
      <div className="relative overflow-hidden border-y border-rv-gold/20 bg-rv-gold/5 py-3">
        <div className="marquee-track flex w-max animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-4 text-xs font-bold tracking-wide text-rv-gold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main trust bar */}
      <div ref={ref} className="border-b border-rv-brown/10 bg-white py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-6">
          {TRUST.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full border border-rv-gold/20 bg-rv-gold/5">
                <t.icon className="size-5 text-rv-gold" />
              </div>
              <span className="text-lg font-black text-rv-darkBrown">{t.value}</span>
              <span className="text-xs text-rv-brown/50">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
