import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Clock,
  Truck,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { formatPrice, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/store";

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  const target = useMemo(() => {
    const d = new Date();
    const daysToSunday = (7 - d.getDay()) % 7 || 7;
    const t = new Date(d);
    t.setDate(t.getDate() + daysToSunday);
    t.setHours(23, 59, 59, 0);
    return t.getTime();
  }, []);

  const diff = Math.max(0, target - now);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    minutes: pad(Math.floor((diff % 3_600_000) / 60_000)),
  };
}

function TimeBox({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-rv-red/30 bg-[#111] px-3 py-3 sm:px-5 sm:py-4 md:min-w-[100px]">
      <span className="block text-3xl font-black text-rv-red sm:text-5xl">
        {value}
      </span>
      <span className="mt-1 block text-[10px] font-bold uppercase text-stone-500 sm:text-xs">
        {unit}
      </span>
    </div>
  );
}

/* كيس منتج في العرض */
function OfferProductCard({
  slug,
  quantity,
  onQuantityChange,
}: {
  slug: string;
  quantity: number;
  onQuantityChange: (q: number) => void;
}) {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#111] p-4 transition-all duration-300 hover:border-rv-red/40 hover:shadow-lg hover:shadow-rv-red/10 sm:p-5"
    >
      {/* Product image */}
      <div className="relative flex h-40 items-center justify-center sm:h-48">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-contain drop-shadow-[0_8px_30px_rgba(208,59,30,0.15)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product name */}
      <h3 className="text-center text-base font-bold text-white sm:text-lg">
        {product.name}
      </h3>

      {/* Price */}
      <div className="text-center">
        <span className="text-2xl font-black text-rv-red">
          {formatPrice(product.price)}
        </span>
        <span className="ms-1 text-xs text-stone-500">ج.م</span>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5">
        <button
          onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
          className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-rv-red/20 hover:text-rv-red"
          aria-label="减持"
        >
          <Minus className="size-4" />
        </button>
        <span className="min-w-[32px] text-center text-lg font-bold text-white">
          {quantity}
        </span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-rv-red/20 hover:text-rv-red"
          aria-label="增加"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function OfferSection() {
  const { items, add, setQty } = useCart();
  const { days, hours, minutes } = useCountdown();

  // Get current quantities from cart
  const getIntensoQty = () => {
    const item = items.find((i) => i.slug === "bar-intenso-1kg");
    return item?.qty ?? 0;
  };
  const getPremiumQty = () => {
    const item = items.find((i) => i.slug === "premium-1kg");
    return item?.qty ?? 0;
  };

  const intensoQty = getIntensoQty();
  const premiumQty = getPremiumQty();
  const totalQty = intensoQty + premiumQty;
  const hasDiscount = totalQty >= 2;

  // Calculate 5% discount
  const intensoTotal = intensoQty * 700;
  const premiumTotal = premiumQty * 890;
  const subtotal = intensoTotal + premiumTotal;
  const discountAmount = hasDiscount ? Math.round(subtotal * 0.05) : 0;

  return (
    <section
      id="deal"
      className="relative overflow-hidden border-y-2 border-rv-red bg-gradient-to-br from-[#111] via-[#0d0808] to-[#111] py-12 md:py-16"
    >
      {/* Red glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(208,59,30,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center md:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-rv-red/30 bg-rv-red/10 px-5 py-1.5 text-sm font-bold uppercase tracking-wider text-rv-red"
        >
          <Flame className="size-4" />
          عرض الأسبوع
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mb-1 text-2xl font-black text-white sm:text-4xl md:text-5xl"
        >
          اشترِ 2 كجم من قهوة روفينتو
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mb-6 max-w-2xl text-lg font-bold text-rv-red sm:text-2xl"
        >
          واحصل على خصم 5%
        </motion.p>

        {/* Savings badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-rv-red/30 bg-rv-red/10 px-6 py-3"
        >
          <Truck className="size-5 text-rv-red" />
          <span className="text-base font-bold text-rv-red">
            توصيل مجاني لكل المحافظات
          </span>
        </motion.div>

        {/* Product cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <OfferProductCard
            slug="bar-intenso-1kg"
            quantity={intensoQty}
            onQuantityChange={(q) => setQty("bar-intenso-1kg", q)}
          />
          <OfferProductCard
            slug="premium-1kg"
            quantity={premiumQty}
            onQuantityChange={(q) => setQty("premium-1kg", q)}
          />
        </div>

        {/* Discount summary (when eligible) */}
        {hasDiscount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 rounded-2xl border border-rv-red/40 bg-rv-red/10 px-6 py-4"
          >
            <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-center sm:gap-6">
              <div>
                <span className="text-xs text-stone-500">المجموع قبل الخصم</span>
                <span className="ms-2 text-lg font-bold text-white line-through">
                  {formatPrice(subtotal)} ج.م
                </span>
              </div>
              <div className="text-2xl font-black text-rv-red">
                -{discountAmount} ج.م
              </div>
              <div>
                <span className="text-xs text-stone-500">الإجمالي</span>
                <span className="ms-2 text-2xl font-black text-rv-red">
                  {formatPrice(subtotal - discountAmount)} ج.م
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Countdown */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-rv-red">
            <Clock className="size-4" />
            <span>ينتهي العرض خلال:</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <TimeBox value={days} unit="يوم" />
            <span className="text-2xl font-bold text-rv-red sm:text-3xl">:</span>
            <TimeBox value={hours} unit="ساعة" />
            <span className="text-2xl font-bold text-rv-red sm:text-3xl">:</span>
            <TimeBox value={minutes} unit="دقيقة" />
          </div>
        </div>

        {/* Main CTA */}
        <button
          onClick={() => {
            if (intensoQty === 0 && premiumQty === 0) {
              add("bar-intenso-1kg", 1);
              add("premium-1kg", 1);
            }
          }}
          className="inline-flex items-center gap-3 rounded-2xl bg-rv-red px-8 py-4 text-base font-black text-white shadow-2xl shadow-rv-red/20 transition-all duration-300 hover:-translate-y-1 hover:bg-rv-red-light hover:shadow-rv-red/30 sm:px-10 sm:py-5 sm:text-lg"
        >
          <ShoppingCart className="size-5 sm:size-6" />
          اطلب الآن — شحن مجاني
        </button>

        {/* Trust notes */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-500">
          <span>العرض ساري حتى نفاد الكمية</span>
          <span className="hidden sm:inline">·</span>
          <span>الدفع عند الاستلام</span>
          <span className="hidden sm:inline">·</span>
          <span>شحن مجاني</span>
        </div>
      </div>
    </section>
  );
}
