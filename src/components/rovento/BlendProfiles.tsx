import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { discountedPriceFor2kg } from "@/lib/offer";
import { getProduct } from "@/lib/products";
import { FlavorProfileCard, FLAVOR_COMPARISON_HINT } from "./FlavorProfileCard";

/**
 * BLEND PROFILES — deep, editorial profile for each blend.
 * Numbered chapters (01 / 02): story, origin, roast, ratio, flavor notes,
 * brewing methods, the live 2kg price, and the unified FLAVOR PROFILE card
 * (shared FlavorProfileCard — same 7 metrics, same order, for every blend).
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
  oldPrice?: number;
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
    price: getProduct("rovento-premium-1kg")?.price ?? 850,
    oldPrice: getProduct("rovento-premium-1kg")?.oldPrice ?? 950,
    story:
      "البريميوم: ٥٠٪ أرابيكا ٥٠٪ روبوسيتا ، خليط متوازن من حبوب قهوة كولومبي و جواتيمالي و هندي. بتحميص متوسط بيدّيك نعومة وحلاوة معتدلة ولمسة نهائية طويلة — مش محتاج تفهم في القهوة، أول رشفة هتعرفها لوحدها. إسبريسو يفتح يومك، أو لاتيه وكابتشينو بجودة الكافيهات — من غير ما تحس إنك محتاج سكر.",
    tag: "ناعمة. متوازنة. مش بتحتاج سكر.",
    notes: ["رائحة غنية متوازنة", "جسم ناعم", "حلاوة معتدلة", "لمسة نهائية طويلة"],
    brewing: ["إسبريسو", "لاتيه", "كابتشينو", "فلتر — V60"],
    specs: [
      { label: "النسبة", value: "٥٠٪ أرابيكا / ٥٠٪ روبوسيتا" },
      { label: "المنشأ", value: "كولومبيا · الجواتيمالا · الهند" },
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
    image: "/images/intenso-bag-front-new.webp",
    price: getProduct("rovento-bar-intenso-1kg")?.price ?? 750,
    oldPrice: getProduct("rovento-bar-intenso-1kg")?.oldPrice ?? 790,
    story:
      "البار انتينسو: ٧٠٪ روبوسيتا ٣٠٪ ارابيكا ، خليط من حبوب قهوة كولومبي و هندي و جواتيمالي. اتعمل من فكرة واحدة: إسبريسو يفرض احترامه من أول رشفة — الكريمة دي مش بتتلاشى، بيدّي جسم كثيف وكافيين أعلى. البلند اللي بيخلي الكورتادو والماكياتو تجربة يومية مختلفة بجد.",
    tag: "قوية. كريمة. مش بتتنازل.",
    notes: ["كريمة غنية", "جسم كامل", "شوكولاتة داكنة", "لمسة بهارات"],
    brewing: ["إسبريسو", "كورتوادو", "ماكياتو", "موكا بوت"],
    specs: [
      { label: "النسبة", value: "٣٠٪ ارابيكا / ٧٠٪ روبوسيتا" },
      { label: "المنشأ", value: "كولومبيا · الهند · الجواتيمالا" },
      { label: "التحميص", value: "وسط — Agtron 45-50" },
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
        <Link
          to={`/product/${profile.slug}`}
          aria-label={`ROVENTO ${profile.name} — انتقل إلى صفحة المنتج`}
          className="animate-levitate relative block cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
        >
          <img
            src={profile.image}
            alt={`ROVENTO ${profile.name}`}
            loading="lazy"
            decoding="async"
            width={400}
            height={600}
            className="h-[260px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.75)] sm:h-[320px] md:h-[380px]"
          />
        </Link>
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
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black gold-gradient-text">
                {profile.price}
              </span>
              <span className="text-xs font-bold text-[#888888]">ج.م</span>
            </div>
            {profile.oldPrice && (
              <span className="rv-old-price rv-price-flash mt-0.5 text-xs font-bold text-[#888888]">
                بدلًا من {profile.oldPrice} ج.م
              </span>
            )}
          </div>
          <span className="text-xs text-[#888888]">| كيسان:</span>
          <div className="flex flex-col">
            <span className="text-sm font-black text-[#e0c872]">
              {price2kg * 2} ج.م
            </span>
            <span className="rv-old-price rv-price-flash text-[11px] font-bold text-[#888888]">
              بدلًا من {profile.price * 2} ج.م
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

        {/* بروفايل النكهة الموحّد — أسفل وصف كل بلند */}
        <FlavorProfileCard profileKey={profile.slug.includes("premium") ? "premium" : "intenso"} />
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
            <span className="text-[#f5efe6]">اختار </span>
            <span className="rv-neon-word">شخصيتك</span>
            <span className="text-[#f5efe6]"> — قوي ولا فاخر؟</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] text-sm leading-relaxed text-[#b0a898]">
            مش محتاج تفهم في القهوة — قول مزاجك إيه، واحنا نكمل الباقي
          </p>
          <p className="mx-auto mt-4 max-w-[520px] rounded-full border border-[#c49b34]/20 bg-[#1a1a1a]/60 px-5 py-2 text-[11px] font-bold leading-relaxed text-[#e0c872]/90 md:text-xs">
            {FLAVOR_COMPARISON_HINT}
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
