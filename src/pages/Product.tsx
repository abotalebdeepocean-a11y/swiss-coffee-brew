import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Heart,
  Share2,
  Camera,
} from "lucide-react";
import { Header } from "@/components/rovento/Header";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { OfferBanner } from "@/components/rovento/OfferBanner";
import { ProductCard } from "@/components/rovento/ProductCard";
import { BagVisual } from "@/components/rovento/BagVisual";
import { blendVariantFor } from "@/components/rovento/CoffeeBag";
import { IntensityMeter, Stars, WhatsAppIcon, Bean } from "@/components/rovento/art";
import {
  getProduct,
  PRODUCTS,
  CATEGORY_MAP,
  formatPrice,
  discountPercent,
  variantOf,
} from "@/lib/products";
import { useCart, whatsappLink } from "@/lib/store";
import { cn } from "@/lib/utils";

/* ─── صور المعرض الافتراضية لكل منتج — أمامي وخلفي لكل كيس ─── */
const DEFAULT_GALLERY = [
  "/images/intenso-bag-front-new",
  "/images/intenso-bag-back-new",
  "/images/premium-bag",
  "/images/premium-bag-back",
];

/* ─── تعليقات افتراضية ─── */
const DEFAULT_TESTIMONIALS = [
  { name: "سارة ك.", text: "الطعم متوازن وحلو من غير سكر. بستخدمها في اللاتيه كل صبح.", rating: 5, date: "2026-08-05" },
  { name: "محمد ع.", text: "شفت الإعلان وجرّبتها. الكريما حلوة جدًا والتحميص طازج. هفضل أطلبها.", rating: 4, date: "2026-07-28" },
  { name: "نور ه.", text: "هديتها لأبويا وقال أحلى قهوة جربها. التغليف فخم والتوصيل سريع.", rating: 5, date: "2026-07-20" },
  { name: "ياسر ب.", text: "من أحسن الحبوب اللي جربتها. الكريما بتبان فورًا والكيس يكفي أكتر من أسبوع.", rating: 5, date: "2026-07-15" },
];

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id);
  const [prevSlug, setPrevSlug] = useState(slug);
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setQty(1);
    setVariantId(product?.variants?.[0]?.id);
    setActiveImg(0);
  }

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | روڤينتو ROVENTO`;
    }
  }, [product]);

  const related = useMemo(
    () =>
      product
        ? PRODUCTS.filter(
            (p) => p.slug !== product.slug && p.category === product.category,
          ).slice(0, 8)
        : [],
    [product],
  );

  const gallery = product?.gallery ?? DEFAULT_GALLERY;
  const testimonials = product?.testimonials ?? DEFAULT_TESTIMONIALS;

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-4 py-32 text-center">
          <p className="text-2xl font-bold">المنتج غير موجود</p>
          <Link to="/" className="bg-rv-red px-6 py-3 text-sm font-bold text-white">
            العودة إلى الرئيسية
          </Link>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  const cat = CATEGORY_MAP[product.category];
  const discount = discountPercent(product);
  const variant = blendVariantFor(product.slug);
  const activeVariant = variantOf(product, variantId);
  const price = activeVariant?.price ?? product.price;
  const oldPrice = activeVariant?.oldPrice ?? product.oldPrice;
  const waMessage = `مرحبًا ROVENTO 👋 أرغب في طلب:\n• ${product.name} (${activeVariant?.label ?? product.weight ?? ""}) × ${qty} — ${formatPrice(price * qty)}`;

  const scrollRelated = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = 260;
    sliderRef.current.scrollBy({ left: dir === "left" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-10">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground md:mb-8">
            <Link to="/" className="transition-colors hover:text-foreground">الرئيسية</Link>
            <ChevronLeft className="size-3" />
            <Link to="/#products" className="transition-colors hover:text-foreground">
              {cat.name}
            </Link>
            <ChevronLeft className="size-3" />
            <span className="font-bold text-foreground">{product.nameEn}</span>
          </nav>

          {/* ═══════════════════ القسم الرئيسي ═══════════════════ */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">

            {/* ─── معرض الصور ─── */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {/* Thumbnails */}
              <div className="flex gap-2 sm:flex-col">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all sm:h-20 sm:w-20",
                      activeImg === i
                        ? "border-rv-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                        : "border-white/10 hover:border-white/30",
                    )}
                  >
                    <BagVisual
                      image={img}
                      variant={variant}
                      className="h-full w-full object-contain p-1"
                    />
                    {activeImg === i && (
                      <div className="absolute inset-0 bg-rv-gold/10" />
                    )}
                  </button>
                ))}
              </div>

              {/* الصورة الرئيسية — خلفية بيضاء خلف صورة المنتج فقط لإخفاء عيوب الظلال */}
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(500px 450px at 50% 45%, ${product.accent}12, transparent 70%)`,
                  }}
                />
                <Bean
                  color="#4a3523"
                  className="absolute start-6 top-8 w-12 animate-float opacity-30"
                  style={{ "--rot": "-14deg" } as CSSProperties}
                />
                <Bean
                  color="#241a10"
                  className="absolute bottom-10 end-6 w-14 animate-float-slow opacity-25"
                  style={{ "--rot": "18deg", animationDelay: "1s" } as CSSProperties}
                />

                <div className="relative flex min-h-[340px] items-center justify-center p-6 sm:min-h-[400px] md:min-h-[500px]">
                  <BagVisual
                    image={gallery[activeImg]}
                    variant={variant}
                    eager
                    alt={product.name}
                    className="h-full max-h-[460px] w-auto object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.22)] transition-all duration-500"
                  />
                </div>

                {/* أزرار التنقل */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((a) => (a > 0 ? a - 1 : gallery.length - 1))}
                      className="absolute start-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                    <button
                      onClick={() => setActiveImg((a) => (a < gallery.length - 1 ? a + 1 : 0))}
                      className="absolute end-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                  </>
                )}

                {/* عداد الصور */}
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        activeImg === i ? "w-5 bg-rv-gold" : "w-1.5 bg-white/40 hover:bg-white/60",
                      )}
                    />
                  ))}
                </div>

                {/* Badges */}
                {discount !== null && (
                  <span className="absolute end-4 top-4 z-10 rounded-lg bg-rv-red px-3 py-1.5 font-mono text-xs font-bold text-white shadow-lg">
                    خصم {discount}٪
                  </span>
                )}
                {product.badge && !discount && (
                  <span className="absolute end-4 top-4 z-10 rounded-lg bg-rv-gold px-3 py-1.5 font-mono text-xs font-bold text-black shadow-lg">
                    {product.badge}
                  </span>
                )}

                {/* أزرار جانبية */}
                <div className="absolute start-4 top-4 z-10 flex flex-col gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={cn(
                      "grid size-9 place-items-center rounded-full backdrop-blur-sm transition",
                      liked ? "bg-rv-red/90 text-white" : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white",
                    )}
                  >
                    <Heart className={cn("size-4", liked && "fill-current")} />
                  </button>
                  <button className="grid size-9 place-items-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition hover:bg-black/60 hover:text-white">
                    <Share2 className="size-4" />
                  </button>
                  <button className="grid size-9 place-items-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition hover:bg-black/60 hover:text-white">
                    <Camera className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ─── معلومات المنتج ─── */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.26em]" style={{ color: product.accent }}>
                  {cat.name}
                </span>
                {product.weight && (
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground">{product.weight}</span>
                )}
              </div>

              <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl md:text-[2rem]">{product.name}</h1>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.nameEn}</p>

              {/* التقييم */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex text-rv-gold">
                  <Stars value={product.rating} />
                </div>
                <span className="text-sm font-bold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">· {product.reviews} تقييم</span>
                {product.bestseller && (
                  <span className="flex items-center gap-1 rounded-lg bg-rv-gold/15 px-2 py-0.5 text-[10px] font-bold text-rv-gold">
                    <Star className="size-3 fill-rv-gold" />
                    الأكثر مبيعًا
                  </span>
                )}
              </div>

              {/* السعر */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-black text-foreground md:text-4xl">{formatPrice(price)}</span>
                {oldPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(oldPrice)}</span>
                    <span className="rounded-lg bg-rv-red/15 px-2 py-0.5 text-xs font-bold text-rv-red">
                      وفّر {formatPrice(oldPrice - price)}
                    </span>
                  </>
                )}
              </div>

              {/* اختيار المقاس/الطحن */}
              {product.variants && product.variants.length > 1 && (
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">اختار</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVariantId(v.id)}
                        className={cn(
                          "h-11 rounded-xl border px-4 text-sm font-semibold transition-all",
                          v.id === activeVariant?.id
                            ? "border-rv-gold bg-rv-gold/10 text-rv-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                            : "border-white/15 text-muted-foreground hover:border-white/30 hover:text-foreground",
                        )}
                      >
                        {v.label}
                        <span className="me-2 font-mono text-[10px]">{formatPrice(v.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{product.description}</p>

              {/* أزرار الشراء */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl border border-white/15">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center transition-colors hover:bg-white/10" aria-label="تقليل">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center font-mono text-lg font-semibold">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid size-11 place-items-center transition-colors hover:bg-white/10" aria-label="زيادة">
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  onClick={() => add(product.slug, qty, activeVariant?.id)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-rv-red text-sm font-bold text-white shadow-lg shadow-rv-red/20 transition-all hover:-translate-y-0.5 hover:bg-[#b53219] hover:shadow-rv-red/30 sm:flex-none sm:px-8"
                >
                  <ShoppingBag className="size-4" />
                  {product.slug === "rovento-bar-intenso-1kg" ? "جرّب القوي" : "جرّب الفاخر"} ←
                  <span className="font-mono text-xs opacity-75">— {formatPrice(price * qty)}</span>
                </button>
              </div>

              {/* واتساب */}
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#25d366]/40 bg-[#25d366]/10 text-sm font-bold text-[#25d366] transition-colors hover:bg-[#25d366] hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
                اطلب واتساب — من غير تعقيد
              </a>

              {/* شريط الثقة */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { icon: Truck, t: "بيوصلك بسرعة", s: "24-72 ساعة" },
                  { icon: ShieldCheck, t: "ادفع لما يوصّلك", s: "مش محتاج تثق فينا الأول" },
                  { icon: RotateCcw, t: "مش عجبك؟ ارجعه", s: "خلال 14 يوم — خلاص" },
                ].map((x) => (
                  <div key={x.t} className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/[0.02] p-2.5 text-center">
                    <x.icon className="size-3.5 text-rv-gold" />
                    <p className="text-[10px] font-bold">{x.t}</p>
                    <p className="text-[9px] text-muted-foreground">{x.s}</p>
                  </div>
                ))}
              </div>

              {/* المواصفات */}
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {product.roast && (
                  <div className="bg-background p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">التحميص</p>
                    <p className="mt-1 text-sm font-bold">{product.roast}</p>
                  </div>
                )}
                {product.arabica !== undefined && (
                  <div className="bg-background p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">أرابيكا</p>
                    <p className="mt-1 text-sm font-bold">{product.arabica}٪</p>
                  </div>
                )}
                {product.robusta !== undefined && (
                  <div className="bg-background p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">روبوستا</p>
                    <p className="mt-1 text-sm font-bold">{product.robusta}٪</p>
                  </div>
                )}
                {product.intensity !== undefined && (
                  <div className="col-span-2 bg-background p-3 sm:col-span-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">الشدة</p>
                      <span className="font-mono text-xs text-muted-foreground">{product.intensity}/5</span>
                    </div>
                    <IntensityMeter value={product.intensity} color={product.accent} className="mt-2" />
                  </div>
                )}
              </div>

              {/* النكهات */}
              {product.notes.length > 0 && (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">النكهات</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.notes.map((n) => (
                      <span key={n} className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: product.accent + "55", color: product.accent }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* طرق التحضير */}
              {product.brewing && (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">طرق التحضير</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.brewing.map((b) => (
                      <span key={b} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════ عرض الكيسين ووفّر أكتر — بدل عرض المكنة ═══════════════════ */}
          <OfferBanner />

          {/* ═══════════════════ قسم التعليقات ═══════════════════ */}
          {testimonials.length > 0 && (
            <section className="mt-16 md:mt-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-rv-gold">
                  <Stars value={product.rating} />
                </div>
                <h2 className="text-xl font-bold md:text-2xl">
                  الناس اللي جربتها <span className="text-rv-gold">بتقول إيه</span>
                </h2>
                <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/15 hover:bg-white/[0.04]"
                  >
                    <Quote className="absolute start-4 top-4 size-8 text-rv-gold/10" />
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex text-rv-gold">
                        <Stars value={t.rating} />
                      </div>
                      <span className="text-xs text-muted-foreground">{t.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-stone-300">{t.text}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rv-gold/15 text-[10px] font-bold text-rv-gold">
                        {t.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-foreground">{t.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════ منتجات مشابهة — Slider أفقي ═══════════════════ */}
          {related.length > 0 && (
            <section className="mt-14 md:mt-16">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold md:text-xl">
                  أو جرّب <span className="text-rv-gold">كمان</span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <button
                      onClick={() => scrollRelated("right")}
                      className="grid size-8 place-items-center rounded-full border border-white/15 text-muted-foreground transition hover:border-rv-gold hover:text-rv-gold"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                    <button
                      onClick={() => scrollRelated("left")}
                      className="grid size-8 place-items-center rounded-full border border-white/15 text-muted-foreground transition hover:border-rv-gold hover:text-rv-gold"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {related.map((p, i) => (
                  <div key={p.slug} className="w-[220px] flex-shrink-0 snap-start sm:w-[240px]">
                    <ProductCard product={p} index={i} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
