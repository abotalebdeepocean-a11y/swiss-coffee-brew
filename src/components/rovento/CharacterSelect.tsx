import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCart } from "@/lib/store";
import { ShoppingCart } from "lucide-react";

const BAGS = [
  {
    id: "intenso",
    slug: "rovento-bar-intenso-1kg",
    image: "/images/intenso-bar-real.webp",
    title: "BAR INTENSO",
    color: "from-blue-900/20 to-blue-950/10",
    accentColor: "#2563eb",
    pills: ["Rich Crema", "Full Body", "Low Acidity"],
    arabic: "مضمّن لعشاق الإسبريسو القوي والكريمة الغنية",
    icons: ["كريمة غنية", "تحميص مثالي", "معبأ بعناية", "مثالي للإسبريسو"],
    price: "700",
    weight: "1 كجم",
  },
  {
    id: "premium",
    slug: "rovento-premium-1kg",
    image: "/images/premium-eagle-real.webp",
    title: "PREMIUM",
    color: "from-emerald-900/20 to-emerald-950/10",
    accentColor: "#059669",
    pills: ["Rich Aroma", "Smooth Body", "Balanced Sweetness"],
    arabic: "مصمّم من أجود أنواع حبوب قهوة الإسبريسو",
    icons: ["MEDIUM ESPRESSO ROAST", "WHOLE BEAN", "100% ARABICA & ROBUSTA", "RICH CREMA"],
    price: "890",
    weight: "1 كجم",
  },
];

function BagCard({ bag, index }: { bag: (typeof BAGS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { add } = useCart();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`group relative flex flex-col items-center rounded-3xl border border-white/5 bg-gradient-to-b ${bag.color} p-6 md:p-10`}
    >
      {/* Bag image with 3D hover */}
      <div className="relative mb-8 perspective-[1200px]">
        <motion.div
          whileHover={{ rotateY: 8, rotateX: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Golden rim on hover */}
          <div className="absolute -inset-4 rounded-3xl border border-rv-gold/0 opacity-0 transition-all duration-500 group-hover:border-rv-gold/30 group-hover:opacity-100 group-hover:shadow-[0_0_60px_rgba(201,168,76,0.1)]" />

          <div className="relative z-10 h-[240px] w-[200px] sm:h-[300px] sm:w-[240px] md:h-[360px] md:w-[280px]">
            <img
              src={bag.image}
              alt={`ROVENTO ${bag.title}`}
              className="h-full w-full object-contain bag-shadow transition-all duration-500 group-hover:bag-shadow-hover"
            />
          </div>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-condensed text-3xl font-bold tracking-wider text-white md:text-4xl">
        {bag.title}
      </h3>

      {/* Pills */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {bag.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-wider text-rv-smoke uppercase"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Arabic description */}
      <p className="mb-6 max-w-[280px] text-center text-sm leading-relaxed text-rv-smoke">
        {bag.arabic}
      </p>

      {/* Feature icons */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {bag.icons.map((icon) => (
          <div
            key={icon}
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
          >
            <div className="size-1.5 rounded-full bg-rv-gold" />
            <span className="text-[10px] font-bold text-rv-smoke uppercase">
              {icon}
            </span>
          </div>
        ))}
      </div>

      {/* Price + CTA */}
      <div className="mt-auto flex w-full items-center justify-between border-t border-white/5 pt-4">
        <div>
          <span className="text-2xl font-black text-white">{bag.price}</span>
          <span className="mr-1 text-xs text-rv-smoke">ج.م</span>
          <span className="mr-2 text-[10px] text-rv-smoke">/ {bag.weight}</span>
        </div>
        <button
          onClick={() => add(bag.slug)}
          className="flex items-center gap-2 rounded-xl bg-rv-gold px-5 py-3 text-sm font-bold text-rv-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-rv-gold-light hover:shadow-[0_8px_24px_rgba(201,168,76,0.3)]"
        >
          <ShoppingCart className="size-4" />
          أضف للسلة
        </button>
      </div>
    </motion.div>
  );
}

export function CharacterSelect() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative overflow-hidden bg-rv-black py-20 md:py-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-rv-black via-rv-dark to-rv-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6">
        {/* Section heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold/60">
            Choose Your Character
          </span>
          <h2 className="font-display text-3xl font-black text-white md:text-5xl">
            اختار <span className="gold-gradient-text">شخصيتك</span>
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
        </motion.div>

        {/* Two bags */}
        <div className="grid gap-8 md:grid-cols-2">
          {BAGS.map((bag, i) => (
            <BagCard key={bag.id} bag={bag} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
