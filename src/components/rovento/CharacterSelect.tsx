import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { RoventoMark } from "./RoventoMark";

interface CharacterCard {
  slug: string;
  name: string;
  nameEn: string;
  image: string;
  price: number;
  pills: string[];
  tag: string;
  accent: string;
  glowColor: string;
}

const CHARACTERS: CharacterCard[] = [
  {
    slug: "rovento-bar-intenso-1kg",
    name: "بار إنتنسو",
    nameEn: "BAR INTENSO",
    image: "/images/intenso-bag.webp",
    price: 690,
    pills: ["Rich Crema", "Full Body", "Low Acidity"],
    tag: "قوية • غنية • جريئة",
    accent: "#1a3a5c",
    glowColor: "rgba(26,58,92,0.3)",
  },
  {
    slug: "rovento-premium-1kg",
    name: "بريميوم",
    nameEn: "PREMIUM",
    image: "/images/premium-bag.webp",
    price: 890,
    pills: ["Rich Aroma", "Smooth Body", "Balanced Sweetness"],
    tag: "ناعمة • متوازنة • فاخرة",
    accent: "#1a3c2a",
    glowColor: "rgba(26,60,42,0.3)",
  },
];

function CharacterCardComponent({
  character,
  index,
}: {
  character: CharacterCard;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative flex flex-col items-center rounded-2xl border border-white/[0.06] bg-[#111111] p-6 text-center transition-all duration-500 hover:border-[#c9a84c]/20 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)] md:p-8"
    >
      {/* Bag */}
      <div className="relative mb-6">
        {/* Accent glow behind bag */}
        <div
          className="absolute inset-0 -m-8 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: character.glowColor }}
        />
        <div className="animate-levitate relative z-10">
          <img
            src={character.image}
            alt={character.name}
            className="mx-auto h-[260px] w-[190px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105 sm:h-[300px] sm:w-[220px]"
          />
        </div>
      </div>

      {/* English name */}
      <p className="mb-1 font-condensed text-xs tracking-[0.3em] text-[#888888] uppercase">
        {character.nameEn}
      </p>

      {/* Arabic name */}
      <h3 className="mb-3 text-xl font-black text-[#f5efe6] md:text-2xl">
        {character.name}
      </h3>

      {/* Tag */}
      <p className="mb-4 text-sm font-bold text-[#c9a84c]">{character.tag}</p>

      {/* Pills */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {character.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold tracking-wide text-[#b0a898] uppercase"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl font-black gold-gradient-text">
          {character.price}
        </span>
        <span className="mr-1 text-sm font-bold text-[#888888]">ج.م</span>
      </div>

      {/* CTA */}
      <button
        onClick={() => add(character.slug)}
        className="rv-btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a84c] py-3.5 text-sm font-black text-[#0a0a0a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-lg hover:shadow-[#c9a84c]/20"
      >
        <ShoppingCart className="size-4" />
        اطلب الآن
      </button>
    </motion.div>
  );
}

export function CharacterSelect() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-[1000px] px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <RoventoMark size={36} />
          </div>
          <h2 className="mb-3 text-2xl font-black md:text-3xl">
            <span className="gold-gradient-text">اختار شخصيتك</span>
          </h2>
          <p className="text-sm text-[#888888]">
            شخصيتان مختلفتان، جودة واحدة
          </p>
          <div className="rv-divider mt-4">
            <span className="text-xs text-[#c9a84c]/40">◆</span>
          </div>
        </motion.div>

        {/* Two columns */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {CHARACTERS.map((char, i) => (
            <CharacterCardComponent key={char.slug} character={char} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
