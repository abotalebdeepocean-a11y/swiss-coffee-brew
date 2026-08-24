import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check, Coffee, Flame, Droplets } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";

/** المنتجات الرئيسية الخمسة من القائمة الرسمية */
const MAIN_PRODUCTS = [
  {
    slug: "rovento-bar-intenso",
    image: IMAGES.bags.intenso,
    nameEn: "BAR INTENSO",
    nameAr: "بار انتينسو",
    price: 650,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 187,
    badge: "قوي وجريء",
    roast: "تحميص غامق",
    feature1: "Rich Crema",
    feature1Ar: "كريمة غنية",
    feature2: "Dark Roast",
    feature2Ar: "تحميص غامق",
    feature3: "Full Body",
    feature3Ar: "قوة عالية",
    glow: "rgba(30,58,95,0.3)",
    borderColor: "border-blue-500/20",
    accentLine: "from-blue-600 to-blue-400",
  },
  {
    slug: "rovento-classic",
    image: IMAGES.bags.classic,
    nameEn: "CLASSIC",
    nameAr: "كلاسيك",
    price: 750,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 203,
    badge: "التوليفة الذهبية",
    roast: "تحميص متوسط-غامق",
    feature1: "Balanced Crema",
    feature1Ar: "كريمة متوازنة",
    feature2: "Medium-Dark Roast",
    feature2Ar: "تحميص متوسط-غامق",
    feature3: "Balanced Body",
    feature3Ar: "قوة متوازنة",
    glow: "rgba(22,101,52,0.3)",
    borderColor: "border-emerald-500/20",
    accentLine: "from-emerald-600 to-emerald-400",
  },
  {
    slug: "rovento-premium",
    image: IMAGES.bags.premium,
    nameEn: "PREMIUM",
    nameAr: "بريميوم",
    price: 850,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 214,
    badge: "الأكثر مبيعًا",
    roast: "تحميص متوسط",
    feature1: "Rich Crema",
    feature1Ar: "كريمة غنية",
    feature2: "Medium Roast",
    feature2Ar: "تحميص متوسط",
    feature3: "Smooth Body",
    feature3Ar: "قوة متوازنة",
    glow: "rgba(201,169,97,0.25)",
    borderColor: "border-rv-gold/30",
    accentLine: "from-rv-gold to-amber-400",
  },
  {
    slug: "rovento-arabica",
    image: IMAGES.bags.arabica,
    nameEn: "ARABICA",
    nameAr: "أرابيكا",
    price: 950,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 96,
    badge: "100% أرابيكا",
    roast: "تحميص متوسط",
    feature1: "Fruity Notes",
    feature1Ar: "نكهة فاكهية",
    feature2: "Medium Roast",
    feature2Ar: "تحميص متوسط",
    feature3: "Smooth Body",
    feature3Ar: "قوام ناعم",
    glow: "rgba(126,34,206,0.25)",
    borderColor: "border-purple-500/20",
    accentLine: "from-purple-600 to-purple-400",
  },
  {
    slug: "rovento-colombia",
    image: IMAGES.bags.colombia,
    nameEn: "COLOMBIA",
    nameAr: "كولومبيا",
    price: 950,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 74,
    badge: "أصل واحد",
    roast: "تحميص متوسط",
    feature1: "Medium Acidity",
    feature1Ar: "حموضة معتدلة",
    feature2: "Medium Roast",
    feature2Ar: "تحميص متوسط",
    feature3: "Chocolate Notes",
    feature3Ar: "نكهة شوكولاتة",
    glow: "rgba(161,98,7,0.25)",
    borderColor: "border-amber-600/20",
    accentLine: "from-amber-700 to-amber-500",
  },
];

export function ProductsGrid() {
  const cart = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleAdd = (slug: string) => {
    cart.add(slug, 1);
    setAddedSlug(slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/20 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* Section header — catalog style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-rv-gold/70">
            ✦ Premium Espresso Blends & Single Origin ✦
          </span>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            <span className="gold-gradient-text">قائمة أسعار حبوب الإسبريسو</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-stone-400 md:text-base">
            للبيع بالجملة فقط — خمسة بلندات مميزة من روفينتو
          </p>
          <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-rv-gold/40 to-transparent" />
        </motion.div>

        {/* Products grid — catalog-inspired cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {MAIN_PRODUCTS.map((product, i) => {
            const isAdded = addedSlug === product.slug;
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative flex flex-col rounded-2xl border ${product.borderColor} bg-stone-900/20 backdrop-blur-sm transition-all duration-500 hover:bg-stone-900/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 overflow-hidden`}
              >
                {/* Top accent line */}
                <div className={`h-[2px] w-full bg-gradient-to-r ${product.accentLine}`} />

                {/* Badge */}
                <span className="absolute top-4 right-3 z-10 rounded-full bg-rv-gold/90 px-2.5 py-0.5 text-[10px] font-black text-black shadow-lg">
                  {product.badge}
                </span>

                {/* Bag image — clean, centered */}
                <div className="relative mx-auto flex h-[220px] w-full items-center justify-center overflow-hidden px-4 pt-6">
                  {/* Subtle glow behind bag */}
                  <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                    style={{
                      background: `radial-gradient(160px 140px at 50% 55%, ${product.glow}, transparent 65%)`,
                    }}
                  />
                  <Link to={`/product/${product.slug}`} className="relative z-10">
                    <motion.img
                      src={`${product.image}.webp`}
                      alt={product.nameAr}
                      className="h-[180px] w-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ y: -8 }}
                    />
                  </Link>
                </div>

                {/* Product name — bilingual */}
                <div className="px-4 text-center">
                  <h3 className="text-lg font-black tracking-wider text-white">
                    {product.nameEn}
                  </h3>
                  <p className="mt-0.5 text-sm text-stone-400">{product.nameAr}</p>
                </div>

                {/* Features — catalog style */}
                <div className="mx-auto mt-3 flex flex-col gap-1.5 px-4">
                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-300">
                    <Coffee className="h-3 w-3 text-rv-gold/70" />
                    <span>{product.feature1Ar}</span>
                    <span className="text-stone-600">|</span>
                    <span className="text-stone-500">{product.feature1}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-300">
                    <Flame className="h-3 w-3 text-rv-gold/70" />
                    <span>{product.feature2Ar}</span>
                    <span className="text-stone-600">|</span>
                    <span className="text-stone-500">{product.feature2}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-300">
                    <Droplets className="h-3 w-3 text-rv-gold/70" />
                    <span>{product.feature3Ar}</span>
                    <span className="text-stone-600">|</span>
                    <span className="text-stone-500">{product.feature3}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center justify-center gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${
                        s < Math.round(product.rating)
                          ? "fill-rv-gold text-rv-gold"
                          : "text-stone-700"
                      }`}
                    />
                  ))}
                  <span className="mr-1 text-[10px] text-stone-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price — prominent */}
                <div className="mt-4 border-t border-white/5 pt-4 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-stone-500">السعر</p>
                  <p className="mt-1 text-2xl font-black text-rv-gold">
                    {product.price.toLocaleString("en-US")}
                  </p>
                  <p className="text-xs text-stone-500">جنيه / {product.weight}</p>
                </div>

                {/* Add to cart */}
                <div className="p-4 pt-3">
                  <button
                    onClick={() => handleAdd(product.slug)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
                      isAdded
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-gradient-to-r from-rv-gold to-[#d4b96a] text-black hover:from-[#d4b96a] hover:to-rv-gold hover:shadow-[0_6px_24px_rgba(201,169,97,0.3)] hover:-translate-y-0.5"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        تمت الإضافة ✓
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        أضف للسلة
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center text-[10px] text-stone-600">🚚 شحن مجاني لكل مصر</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-10 py-3.5 text-sm font-bold text-rv-gold transition-all hover:bg-rv-gold/20 hover:shadow-[0_0_40px_rgba(201,169,97,0.15)]"
          >
            عرض كل المنتجات ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
