import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";

/** المنتجات الرئيسية الخمسة من القائمة */
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
    accent: "from-slate-900/60 to-slate-950/0",
    glow: "rgba(26,26,46,0.25)",
    borderColor: "border-slate-600/30",
    badgeColor: "bg-slate-700 text-white",
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
    accent: "from-blue-900/60 to-blue-950/0",
    glow: "rgba(26,82,118,0.25)",
    borderColor: "border-blue-600/30",
    badgeColor: "bg-blue-600 text-white",
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
    accent: "from-teal-900/60 to-teal-950/0",
    glow: "rgba(201,169,97,0.2)",
    borderColor: "border-rv-gold/30",
    badgeColor: "bg-rv-gold text-black",
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
    accent: "from-purple-900/60 to-purple-950/0",
    glow: "rgba(108,52,131,0.2)",
    borderColor: "border-purple-500/30",
    badgeColor: "bg-purple-600 text-white",
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
    accent: "from-amber-900/60 to-amber-950/0",
    glow: "rgba(139,69,19,0.2)",
    borderColor: "border-amber-700/30",
    badgeColor: "bg-amber-700 text-white",
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
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 md:py-24">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/20 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-rv-gold/80">
            ✦ Our Collections ✦
          </span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
            <span className="gold-gradient-text">قوائم أسعار حبوب الإسبريسو</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-stone-400 md:text-base">
            للبيع بالجملة فقط — خمسة بلندات مميزة من روفينتو لكل نكهة
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
        </motion.div>

        {/* Products grid — 5 products */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {MAIN_PRODUCTS.map((product, i) => {
            const isAdded = addedSlug === product.slug;
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col rounded-2xl border border-stone-800/50 bg-stone-900/30 p-4 text-center transition-all duration-500 hover:border-stone-700/60 hover:bg-stone-900/50 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1"
              >
                {/* Badge */}
                <span
                  className={`absolute -top-2.5 right-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide shadow-lg ${product.badgeColor}`}
                >
                  {product.badge}
                </span>

                {/* Bag image */}
                <div className="relative mx-auto mb-4 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl">
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(180px 160px at 50% 55%, ${product.glow}, transparent 65%)`,
                    }}
                  />
                  <Link to={`/product/${product.slug}`} className="relative z-10">
                    <motion.img
                      src={`${product.image}.webp`}
                      alt={product.nameAr}
                      className="h-[170px] w-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                      whileHover={{ y: -5 }}
                    />
                  </Link>
                </div>

                {/* Product name */}
                <h3 className="text-sm font-black tracking-wider text-white">
                  {product.nameEn}
                </h3>
                <p className="mt-0.5 text-xs text-stone-400">{product.nameAr}</p>

                {/* Rating */}
                <div className="mt-2 flex items-center justify-center gap-0.5">
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
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-xl font-black text-rv-gold">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500">/ {product.weight}</p>

                {/* Add to cart */}
                <button
                  onClick={() => handleAdd(product.slug)}
                  className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all duration-300 ${
                    isAdded
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-gradient-to-r from-rv-gold/90 to-rv-gold text-black hover:from-rv-gold hover:to-[#d4b96a] hover:shadow-[0_6px_20px_rgba(201,169,97,0.25)] hover:-translate-y-0.5"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      تمت الإضافة
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" />
                      أضف للسلة
                    </>
                  )}
                </button>

                {/* Free shipping */}
                <p className="mt-2 text-[9px] text-stone-600">🚚 شحن مجاني</p>
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
          className="mt-10 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-8 py-3 text-sm font-bold text-rv-gold transition-all hover:bg-rv-gold/20 hover:shadow-[0_0_30px_rgba(201,169,97,0.15)]"
          >
            عرض كل المنتجات ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
