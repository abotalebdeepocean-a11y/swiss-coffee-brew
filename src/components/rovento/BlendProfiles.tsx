import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { discountedPriceFor2kg } from "@/lib/offer";

/**
 * BLEND PROFILES — deep, editorial profile for each blend.
 * Numbered chapters (01 / 02): story, origin, roast, ratio, flavor notes,
 * brewing methods, and the live 2kg price — the sales-funnel deep dive.
 */

interface ProfileSpec {
  label: string;
  value: string;
}

interface BlendProfile {
  index: string;
  slug: string;
  name: string;
  nameEn: string;
  image: string;
  price: number;
  story: string;
  tag: string;
  notes: string[];
  brewing: string[];
  specs: ProfileSpec[];
}

const PROFILES: BlendProfile[] = [
  {
    index: "01",
    slug: "rovento-premium-1kg",
    name: "بريميوم",
    nameEn: "PREMIUM",
    image: "/images/premium-bag.webp",
    price: 890,
    story:
      "بريميوم هو الجواب لللي بيدور على توازن راقي بنعومة كاملة. بلند مصنوع من 40% أرابيكا من مرتفعات الجواتيمالا و60% روبوستا من الهند، محمص تحميص متوسط — رائحة غنية متوازنة، جسم ناعم، ولمسة نهائية طويلة مميزة. إسبريسو ناعم يفتح يومك — أو لاتيه وكابتشينو بجودة الكافيهات.",
    tag: "ناعمة • متوازنة • فاخرة",
    notes: ["رائحة غنية متوازنة", "جسم ناعم", "حلاوة معتدلة", "لمسة نهائية طويلة"],
    brewing: ["إسبريسو", "لاتيه", "كابتشينو", "فلتر — V60"],
    specs: [
      { label: "النسبة", value: "40% أرابيكا / 60% روبوستا" },
      { label: "المنشأ", value: "الجواتيمالا · الهند" },
      { label: "التحميص", value: "متوسط — Medium Roast" },
      { label: "الطحن", value: "حبوب كاملة" },
      { label: "الكافيين", value: "متوسط - عالي" },
      { label: "الوزن", value: "1 كجم" },
    ],
  },
  {
    index: "02",
    slug: "rovento-bar-intenso-1kg",
    name: "بار إنتنسو",
    nameEn: "BAR INTENSO",
    image: "/images/intenso-bag.webp",
    price: 690,
    story:
      "ولد بار إنتنسو من فكرة واحدة: إسبريسو يفرض احترامه من أول رشفة. روبوستا كولومبي فاخر بتدي الجسم والكريمة الكثيفة، وأرابيكا من مرتفعات الجواتيمالا بتدي العمق. البلند اللي بيخلي الكورتادو والماكياتو تجربة يومية مختلفة.",
    tag: "قوية • غنية • جريئة",
    notes: ["كريمة غنية", "جسم كامل", "شوكولاتة داكنة", "لمسة بهارات"],
    brewing: ["إسبريسو", "كورتوادو", "ماكياتو", "موكا بوت"],
    specs: [
      { label: "النسبة", value: "30% أرابيكا / 70% روبوستا" },
      { label: "المنشأ", value: "الجواتيمالا · كولومبيا" },
      { label: "التحميص", value: "متوسط + متوسط-غامق — Agtron 45-50" },
      { label: "الطحن", value: "حبوب كاملة" },
      { label: "الكافيين", value: "عالي" },
      { label: "الوزن", value: "1 كجم" },
    ],
  },
];

function ProfileBlock({ profile }: { profile: BlendProfile }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();
  const price2kg = discountedPriceFor2kg(profile.price);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      {/* Bag side */}
      <div className="relative flex justify-center">
        <div className="pointer-events-none absolute inset-0 -m-10 bg-[radial-gradient(circle_at_50%_45%,rgba(201,168,76,0.08)_0%,transparent_68%)]" />
        <div className="animate-levitate relative">
          <img
            src={profile.image}
            alt={`ROVENTO ${profile.name}`}
            className="h-[260px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.75)] sm:h-[320px] md:h-[380px]"
          />
        </div>
      </div>

      {/* Text side */}
      <div>
        {/* Chapter number + name */}
        <div className="mb-2 flex items-baseline gap-4">
          <span className="font-condensed text-5xl font-black text-[#c9a84c]/15 md:text-6xl">
            {profile.index}
          </span>
          <div>
            <p className="font-condensed text-[11px] tracking-[0.35em] text-[#888888] uppercase">
              {profile.nameEn}
            </p>
            <h3 className="text-2xl font-black text-[#f5efe6] md:text-3xl">
              {profile.name}
            </h3>
          </div>
        </div>

        <p className="mb-5 text-sm font-bold text-[#c9a84c]">{profile.tag}</p>

        {/* Story */}
        <p className="mb-6 text-sm leading-loose text-[#b0a898] md:text-base">
          {profile.story}
        </p>

        {/* Flavor notes */}
        <div className="mb-6">
          <p className="mb-2.5 text-[10px] font-bold tracking-[0.25em] text-[#888888] uppercase">
            نوتات النكهة
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/[0.05] px-3 py-1 text-xs font-bold text-[#e0c872]"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Spec grid */}
        <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-white/[0.06] bg-[#111111] p-5">
          {profile.specs.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] tracking-wide text-[#888888]">
                {s.label}
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#f5efe6]">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Brewing */}
        <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-[#888888] uppercase">
          طرق التحضير
        </p>
        <p className="mb-6 text-sm text-[#b0a898]">
          {profile.brewing.join(" · ")}
        </p>

        {/* Price + CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black gold-gradient-text">
              {profile.price}
            </span>
            <span className="text-xs font-bold text-[#888888]">ج.م</span>
            <span className="mr-2 text-xs text-[#888888]">| كيسين:</span>
            <span className="text-sm font-black text-[#e0c872]">
              {price2kg * 2} ج.م
            </span>
          </div>
          <button
            onClick={() => add(profile.slug)}
            className="rv-btn flex items-center gap-2 rounded-xl bg-[#c9a84c] px-6 py-3 text-sm font-black text-[#0a0a0a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-lg hover:shadow-[#c9a84c]/20"
          >
            <ShoppingCart className="size-4" />
            أضف للسلة
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function BlendProfiles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center md:mb-24"
        >
          <span className="font-condensed text-xs tracking-[0.4em] text-[#c9a84c]/60 uppercase">
            The Blends
          </span>
          <h2 className="mt-3 text-3xl font-black leading-snug md:text-5xl">
            <span className="text-[#f5efe6]">اعرف نوع </span>
            <span className="rv-neon-word">الحبوب</span>
            <span className="text-[#f5efe6]"> اللي يناسب مزاجك</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] text-sm leading-relaxed text-[#b0a898]">
            قصة كل بلند، منشأ حبوبه، تحميصه، ونوتاته — عشان تختار وعي كامل
          </p>
          <div className="rv-divider mt-6">
            <span className="text-xs text-[#c9a84c]/40">◆</span>
          </div>
        </motion.div>

        {/* Profiles — alternating */}
        <div className="space-y-20 md:space-y-28">
          {PROFILES.map((p, i) => (
            <div
              key={p.slug}
              className={i % 2 === 1 ? "[&>*:first-child]:md:order-2" : ""}
            >
              <ProfileBlock profile={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
