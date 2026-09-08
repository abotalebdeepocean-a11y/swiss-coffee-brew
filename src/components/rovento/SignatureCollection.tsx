import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check } from "lucide-react";
import { getProduct, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";

const BAGS = [
  {
    slug: "rovento-bar-intenso-1kg" as const,
    image: IMAGES.products.barIntenso,
    nameEn: "BAR INTENSO",
    nameAr: "بار انتينسو",
    tagline: "توليفة قوية بكافيين أعلى — كريمة غنية، مثالي مع الحليب",
    price: 750,
    weight: "1 كجم",
    accent: "from-blue-900/40 to-blue-950/0",
    glow: "rgba(30,58,95,0.18)",
    borderColor: "border-blue-500/20",
    badgeColor: "bg-blue-500 text-white",
    rating: 4.9,
    reviews: 187,
    animDelay: "0s",
  },
  {
    slug: "rovento-premium-1kg" as const,
    image: IMAGES.products.premium,
    nameEn: "PREMIUM",
    nameAr: "بريميوم",
    tagline: "50% أرابيكا / 50% روبوستا — رائحة غنية، جسم ناعم، تحميص متوسط",
    price: 850,
    weight: "1 كجم",
    accent: "from-teal-900/40 to-teal-950/0",
    glow: "rgba(201,169,97,0.18)",
    borderColor: "border-rv-gold/30",
    badgeColor: "bg-rv-gold text-black",
    rating: 4.9,
    reviews: 214,
    animDelay: "0.5s",
  },
];

const COMPARE_FEATURES = [
  { label: "نسبة الأرابيكا", intenso: "30%", premium: "50%" },
  { label: "نسبة الروبوستا", intenso: "70%", premium: "50%" },
  { label: "درجة التحميص", intenso: "وسط", premium: "متوسط" },
  { label: "النكهات", intenso: "كريمة غنية", premium: "نكهة غنية فاخرة" },
  { label: "الأفضل لـ", intenso: "كورتوادو وإسبريسو قوي", premium: "لاتيه وكابتشينو" },
  { label: "الكريما", intenso: "غنية جدًا (Rich Crema)", premium: "غنية (Rich Crema)" },
];

export function SignatureCollection() {
  const cart = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleAdd = (slug: string) => {
    cart.add(slug, 1);
    setAddedSlug(slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-rv-cream py-20 md:py-28"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rv-gold/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/20 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-rv-gold/80">
            ✦ Choose Your Experience ✦
          </span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
            <span className="gold-gradient-text">اختر تجربتك</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-rv-brown/60 md:text-base">
            اثنان من خلطاتنا المميزة — كلاهما مُحمّص طازج في القاهرة بعناية فائقة
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
        </motion.div>

        {/* Two floating bags — side by side */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-6 lg:gap-10">
          {BAGS.map((bag, i) => {
            const product = getProduct(bag.slug);
            const isAdded = addedSlug === bag.slug;
            return (
              <motion.div
                key={bag.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Badge */}
                <span
                  className={`absolute -top-2 right-6 z-10 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-lg ${bag.badgeColor}`}
                >
                  {i === 0 ? "قوي وجريء" : "الأكثر مبيعًا"}
                </span>

                {/* Floating bag area */}
                <div className="relative mb-8 flex h-[320px] w-full items-center justify-center sm:h-[380px] md:h-[420px]">
                  {/* Glow behind bag */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(280px 260px at 50% 55%, ${bag.glow}, transparent 65%)`,
                    }}
                  />

                  {/* Decorative dots */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <div className="h-1 w-1 rounded-full bg-rv-gold/40" />
                    <div className="h-1 w-6 rounded-full bg-rv-gold/30" />
                    <div className="h-1 w-1 rounded-full bg-rv-gold/40" />
                  </div>

                  {/* The floating bag image — clickable → product page */}
                  <Link to={`/product/${bag.slug}`} className="relative z-10">
                    <motion.img
                      src={`${bag.image}.webp`}
                      alt={product?.name ?? bag.nameEn}
                      className={`h-[260px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:h-[300px] md:h-[340px] ${
                        i === 0 ? "animate-float-bag" : "animate-float-bag-reverse"
                      }`}
                      style={{ animationDelay: bag.animDelay }}
                      whileHover={{ scale: 1.08, y: -10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    />
                  </Link>

                  {/* Shadow on ground */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-40 rounded-[50%] bg-black/40 blur-xl" />
                </div>

                {/* Product info */}
                <div className="w-full max-w-xs space-y-3">
                  {/* Name */}
                  <h3 className="text-xl font-black tracking-wider text-white">
                    {bag.nameEn}
                  </h3>
                  <p className="text-xs text-stone-400">{bag.nameAr}</p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={`h-3 w-3 ${
                          s < Math.round(bag.rating)
                            ? "fill-rv-gold text-rv-gold"
                            : "text-rv-brown/20"
                        }`}
                      />
                    ))}
                    <span className="mr-1 text-xs text-rv-brown/40">
                      {bag.rating} ({bag.reviews})
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs leading-relaxed text-rv-brown/60">
                    {bag.tagline}
                  </p>

                  {/* Price + Weight */}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-2xl font-black text-rv-gold">
                      {formatPrice(bag.price)}
                    </span>
                    <span className="text-xs text-rv-brown/40">/ {bag.weight}</span>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => handleAdd(bag.slug)}
                    className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 ${
                      isAdded
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-gradient-to-r from-rv-gold/90 to-rv-gold text-black hover:from-rv-gold hover:to-[#d4b96a] hover:shadow-[0_8px_30px_rgba(201,169,97,0.3)] hover:-translate-y-0.5"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        تمت الإضافة للسلة
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        أضف للسلة
                      </>
                    )}
                  </button>

                  {/* Free shipping note */}
                  <p className="text-[10px] text-rv-brown/40">🚚 شحن مجاني لكل مصر</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative divider with VS */}
        <div className="relative my-14 md:my-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-rv-cream px-6 py-1">
            <span className="text-xs font-black tracking-[0.3em] text-rv-gold/60">
              VS
            </span>
          </div>
        </div>

        {/* Comparison table — sleek minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-2xl border border-rv-brown/15 bg-white p-4 shadow-md sm:p-6 md:p-8"
        >
          <div className="mb-6 text-center">
            <h3 className="text-lg font-black text-rv-darkBrown sm:text-xl">
              مقارنة سريعة
            </h3>
            <p className="mt-1 text-xs text-rv-brown/50">
              اختار الخلطة الأنسب لطريقتك في التحضير
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-right text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-rv-brown/15">
                  <th className="px-3 py-3 text-xs font-bold text-rv-brown/50 sm:px-4">
                    الميزة
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-blue-400 sm:px-4">
                    BAR INTENSO
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-rv-gold sm:px-4">
                    PREMIUM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/40">
                {COMPARE_FEATURES.map((row) => (
                  <tr key={row.label} className="hover:bg-rv-cream transition-colors">
                    <td className="px-3 py-3.5 text-rv-brown/60 sm:px-4">
                      {row.label}
                    </td>
                    <td className="px-3 py-3.5 text-center font-medium text-stone-200 sm:px-4">
                      {row.intenso}
                    </td>
                    <td className="px-3 py-3.5 text-center font-medium text-rv-darkBrown sm:px-4">
                      {row.premium}
                    </td>
                  </tr>
                ))}
                {/* Price row highlighted */}
                <tr className="bg-rv-gold/5">
                  <td className="px-3 py-3.5 font-bold text-rv-darkBrown/80 sm:px-4">
                    السعر (1 كجم)
                  </td>
                  <td className="px-3 py-3.5 text-center font-black text-blue-400 sm:px-4">
                    750 ج.م
                  </td>
                  <td className="px-3 py-3.5 text-center font-black text-rv-gold sm:px-4">
                    850 ج.م
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-[10px] text-rv-brown/40">
            * كلا المنتجين متوفر في مقاس 1 كجم — يُشحن مطحون أو حبوب كاملة حسب اختياراتك
          </p>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center text-xs tracking-wider text-rv-brown/30"
        >
          ✦ Sourced from the finest coffee beans — Roasted fresh in Egypt ✦
        </motion.p>
      </div>
    </section>
  );
}
