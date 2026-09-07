import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  CreditCard,
  CheckCircle,
  Truck,
  Shield,
  ChevronDown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useCart,
  orderViaWhatsApp,
  cartLine,
  cartLineKey,
  type CartItem,
} from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";
import { blendVariantFor } from "./CoffeeBag";
import { WhatsAppIcon } from "./art";

/* ─── Egyptian Governorates ─── */
const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "الدقهلية",
  "الفيوم",
  "بني سويف",
  "المنياء",
  "أسيوط",
  "الوادي الجديد",
  "البحر الأحمر",
  "الجيزة",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
  "أسوان",
  "قنا",
  "الأقصر",
  "البحر الأحمر",
];

const PAYMENT_METHODS = [
  { id: "cod", label: "الدفع عند الاستلام", icon: Truck },
  { id: "vodafone", label: "فودافون كاش", icon: CreditCard },
  { id: "instapay", label: "إنستاباي", icon: CreditCard },
  { id: "prepay", label: "دفعة مسبقة (-5%)", icon: CreditCard },
];

/* ─── Quantity Controls ─── */
function LineQtyControls({ item }: { item: CartItem }) {
  const { setQty, remove } = useCart();
  const line = cartLine(item);
  if (!line) return null;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center border border-white/15">
        <button
          onClick={() => setQty(item.slug, item.qty + 1, item.variantId)}
          className="grid size-7 place-items-center transition-colors hover:bg-white/10"
          aria-label="زيادة الكمية"
        >
          <Plus className="size-3.5" />
        </button>
        <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
        <button
          onClick={() => setQty(item.slug, item.qty - 1, item.variantId)}
          className="grid size-7 place-items-center transition-colors hover:bg-white/10"
          aria-label="تقليل الكمية"
        >
          <Minus className="size-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold">
          {formatPrice(line.price * item.qty)}
        </span>
        <button
          onClick={() => remove(item.slug, item.variantId)}
          className="text-muted-foreground transition-colors hover:text-rv-red"
          aria-label="حذف المنتج"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Custom Blend Thumbnail ─── */
function CustomBlendThumb({ spec }: { spec: NonNullable<CartItem["custom"]> }) {
  const arabica = spec.arabica ?? 50;
  return (
    <div className="relative grid h-24 w-20 shrink-0 place-items-center overflow-hidden border border-rv-gold/30 bg-gradient-to-b from-rv-gold/15 to-transparent">
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-500"
        style={{
          height: `${arabica}%`,
          background: "linear-gradient(to top, #d4af37, #a16207)",
          opacity: 0.85,
        }}
      />
      <div className="relative z-10 font-mono text-[10px] font-black leading-none text-black">
        {arabica}/{100 - arabica}
      </div>
    </div>
  );
}

/* ─── Step Indicator ─── */
function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2 px-5 py-3">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex size-7 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
              i + 1 <= current
                ? "bg-rv-gold text-black"
                : "border border-white/20 text-muted-foreground"
            }`}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-6 transition-all ${
                i + 1 < current ? "bg-rv-gold" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Trust Badges ─── */
function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-4 border-t border-white/5 px-5 py-2.5">
      <div className="flex items-center gap-1 text-[10px] text-stone-500">
        <Shield className="size-3" />
        <span>دفع آمن</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-stone-500">
        <Truck className="size-3" />
        <span>شحن لكل مصر</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-stone-500">
        <CheckCircle className="size-3" />
        <span>إرجاع سهل</span>
      </div>
    </div>
  );
}

/* ─── MAIN CART DRAWER ─── */
type CheckoutStep = "cart" | "checkout" | "confirmation";

export function CartDrawer() {
  const { items, count, subtotal, totalWeightKg, weightDiscountRate, weightDiscount, isOpen, closeCart, clear } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phone2: "",
    address: "",
    city: "",
    governorate: "",
    paymentMethod: "cod",
    notes: "",
  });

  const resetDrawer = () => {
    setStep("cart");
    setFormData({
      name: "",
      phone: "",
      phone2: "",
      address: "",
      city: "",
      governorate: "",
      paymentMethod: "cod",
      notes: "",
    });
  };

  const handleClose = () => {
    resetDrawer();
    closeCart();
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) handleClose();
  };

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.governorate.trim();

  const shippingCost = subtotal >= 1500 ? 0 : 60;
  const afterWeightDiscount = subtotal - weightDiscount;
  const prepayDiscount = formData.paymentMethod === "prepay" ? Math.round(afterWeightDiscount * 0.05) : 0;
  const total = afterWeightDiscount - prepayDiscount + shippingCost;

  const handleConfirmOrder = () => {
    orderViaWhatsApp(items);
    setStep("confirmation");
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="w-[92%] gap-0 border-e border-white/10 p-0 sm:max-w-md"
      >
        {/* ─── HEADER ─── */}
        <SheetHeader className="border-b border-white/10 px-5 py-4">
          <SheetTitle className="flex items-center justify-between text-start">
            <span className="flex items-center gap-2 text-lg font-bold">
              {step === "confirmation" ? (
                <CheckCircle className="size-4.5 text-green-500" />
              ) : (
                <ShoppingBag className="size-4.5 text-rv-gold" />
              )}
              {step === "cart"
                ? "سلة التسوق"
                : step === "checkout"
                  ? "بيانات الشحن"
                  : "تم تأكيد الطلب"}
            </span>
            {step !== "confirmation" && (
              <span className="rounded-full bg-rv-gold/15 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-rv-gold">
                {count} منتج
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* ─── STEP INDICATOR ─── */}
        {step !== "confirmation" && items.length > 0 && (
          <StepIndicator current={step === "cart" ? 1 : 2} total={2} />
        )}

        <AnimatePresence mode="wait">
          {/* ═══════════════════════════════════════════════════════════
              STEP 1: CART
              ═══════════════════════════════════════════════════════════ */}
          {step === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-1 flex-col"
            >
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                  <BagVisual
                    image={IMAGES.heroBag}
                    variant="premium"
                    alt="ROVENTO Premium Blend"
                    className="h-44 w-auto opacity-60"
                  />
                  <p className="text-lg font-semibold">سلتك فارغة</p>
                  <p className="text-sm text-muted-foreground">
                    ابدأ رحلتك مع قهوة مختصة تُحمَّص طازجة في مصر.
                  </p>
                  <Button asChild className="rounded-none" onClick={handleClose}>
                    <Link to="/shop">تصفح المتجر</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-5">
                    <ul className="divide-y divide-white/5">
                      {items.map((item) => {
                        const line = cartLine(item);
                        if (!line) return null;

                        if (line.custom) {
                          return (
                            <li
                              key={cartLineKey(item)}
                              className="flex gap-4 py-4"
                            >
                              <CustomBlendThumb spec={line.spec} />
                              <div className="flex flex-1 flex-col justify-between py-0.5">
                                <div>
                                  <p className="text-sm font-semibold leading-snug text-rv-gold">
                                    {line.spec.label}
                                  </p>
                                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                                    {line.spec.detail}
                                  </p>
                                </div>
                                <LineQtyControls item={item} />
                              </div>
                            </li>
                          );
                        }

                        const { product: p, variant } = line;
                        return (
                          <li
                            key={cartLineKey(item)}
                            className="flex gap-4 py-4"
                          >
                            <Link
                              to={`/product/${p.slug}`}
                              onClick={handleClose}
                              className="shrink-0"
                            >
                              <div className="grid h-24 w-20 place-items-center border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
                                <BagVisual
                                  image={p.image}
                                  variant={blendVariantFor(p.slug)}
                                  label={p.nameEn.slice(0, 8).toUpperCase()}
                                  alt={p.name}
                                  className="h-20 w-auto"
                                />
                              </div>
                            </Link>
                            <div className="flex flex-1 flex-col justify-between py-0.5">
                              <div>
                                <Link
                                  to={`/product/${p.slug}`}
                                  onClick={handleClose}
                                  className="text-sm font-semibold leading-snug hover:text-rv-gold"
                                >
                                  {p.name}
                                </Link>
                                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                  {variant
                                    ? variant.label
                                    : p.weight ?? p.category}
                                </p>
                              </div>
                              <LineQtyControls item={item} />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      onClick={clear}
                      className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-rv-red hover:underline"
                    >
                      إفراغ السلة
                    </button>
                  </div>

                  {/* Cart Footer */}
                  <div className="border-t border-white/10 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        الإجمالي
                      </span>
                      <span className="text-xl font-black text-rv-gold">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    {weightDiscount > 0 && (
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-400">
                          🎉 خصم {Math.round(weightDiscountRate * 100)}% ({totalWeightKg} كجم)
                        </span>
                        <span className="text-sm font-bold text-emerald-400">
                          -{formatPrice(weightDiscount)}
                        </span>
                      </div>
                    )}
                    {weightDiscount === 0 && totalWeightKg >= 1 && (
                      <p className="mt-1 text-[10px] text-emerald-400">
                        أضف {2 - (totalWeightKg % 2)} كجم إضافيين للحصول على خصم 10%
                      </p>
                    )}
                    {subtotal < 1500 && (
                      <p className="mt-1 text-[10px] text-emerald-400">
                        أضف {formatPrice(1500 - subtotal)} للحصول على شحن مجاني
                      </p>
                    )}
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      الدفع عند الاستلام أو فودافون كاش / إنستاباي · الشحن لكل
                      مصر
                    </p>
                    <Button
                      onClick={() => setStep("checkout")}
                      className="mt-3 h-12 w-full rounded-none bg-rv-gold text-black hover:bg-[#d4b96a]"
                    >
                      <ArrowLeft className="size-4" />
                      إكمال بيانات الشحن
                    </Button>
                    <button
                      onClick={handleClose}
                      className="mt-2 w-full py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      متابعة التسوق
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 2: CHECKOUT (Shipping Form)
              ═══════════════════════════════════════════════════════════ */}
          {step === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-1 flex-col"
            >
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {/* Order Summary Mini */}
                <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-400">
                      ملخص الطلب
                    </span>
                    <button
                      onClick={() => setStep("cart")}
                      className="text-[11px] text-rv-gold hover:underline"
                    >
                      تعديل
                    </button>
                  </div>
                  {items.map((item) => {
                    const line = cartLine(item);
                    if (!line) return null;
                    const name = line.custom
                      ? line.spec.label
                      : line.product.name;
                    return (
                      <div
                        key={cartLineKey(item)}
                        className="flex items-center justify-between py-1 text-xs"
                      >
                        <span className="text-stone-400">
                          {name} × {item.qty}
                        </span>
                        <span className="font-bold text-stone-300">
                          {formatPrice(line.price * item.qty)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="mt-2 border-t border-white/10 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-400">الإجمالي</span>
                      <span className="font-black text-rv-gold">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Form */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-300">
                    📦 بيانات الشحن
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <User className="size-3" />
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="محمد أحمد"
                      className="w-full rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black placeholder-stone-400 outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <Phone className="size-3" />
                      رقم الهاتف
                    </label>
                    <div className="flex gap-2">
                      <span className="flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-3 text-sm text-stone-500">
                        +20
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="01XXXXXXXXX"
                        className="flex-1 rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black placeholder-stone-400 outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                      />
                    </div>
                  </div>

                  {/* Phone 2 (optional) */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <Phone className="size-3" />
                      رقم هاتف إضافي (اختياري)
                    </label>
                    <div className="flex gap-2">
                      <span className="flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-3 text-sm text-stone-500">
                        +20
                      </span>
                      <input
                        type="tel"
                        value={formData.phone2}
                        onChange={(e) =>
                          setFormData({ ...formData, phone2: e.target.value })
                        }
                        placeholder="اختياري"
                        className="flex-1 rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black placeholder-stone-400 outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                      />
                    </div>
                  </div>

                  {/* Governorate */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <MapPin className="size-3" />
                      المحافظة
                    </label>
                    <div className="relative">
                      <select
                        value={formData.governorate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            governorate: e.target.value,
                          })
                        }
                        className="w-full appearance-none rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                      >
                        <option value="" className="bg-white text-black">
                          اختر المحافظة
                        </option>
                        {GOVERNORATES.map((g) => (
                          <option key={g} value={g} className="bg-white text-black">
                            {g}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <MapPin className="size-3" />
                      المنطقة / المدينة
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="مثال: مدينة نصر، المعادي، التجمع الخامس"
                      className="w-full rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black placeholder-stone-400 outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <MapPin className="size-3" />
                      العنوان التفصيلي
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="الشارع، رقم المبنى، العمارة، الدور، الشقة"
                      rows={2}
                      className="w-full resize-none rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black placeholder-stone-400 outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <CreditCard className="size-3" />
                      طريقة الدفع
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PAYMENT_METHODS.map((m) => {
                        const Icon = m.icon;
                        const selected =
                          formData.paymentMethod === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                paymentMethod: m.id,
                              })
                            }
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-bold transition-all ${
                              selected
                                ? "border-rv-gold/50 bg-rv-gold/10 text-rv-gold"
                                : "border-white/10 bg-white/[0.03] text-stone-400 hover:border-white/20"
                            }`}
                          >
                            <Icon className="size-3.5" />
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      ملاحظات إضافية (اختياري)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="وقت التوصيل المفضل، علامة مميزة..."
                      className="w-full rounded-lg border border-white/10 bg-white px-3 py-2.5 text-sm text-black placeholder-stone-400 outline-none focus:border-rv-gold/50 focus:ring-1 focus:ring-rv-gold/30"
                    />
                  </div>
                </div>
              </div>

              {/* Checkout Footer */}
              <div className="border-t border-white/10 px-5 py-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">المنتجات</span>
                    <span className="text-stone-300">{formatPrice(subtotal)}</span>
                  </div>
                  {weightDiscount > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400">🎉 خصم الكمية ({Math.round(weightDiscountRate * 100)}%)</span>
                      <span className="font-bold text-emerald-400">-{formatPrice(weightDiscount)}</span>
                    </div>
                  )}
                  {formData.paymentMethod === "prepay" && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400">💳 خصم الدفع المسبق (5%)</span>
                      <span className="font-bold text-emerald-400">-{formatPrice(Math.round((subtotal - weightDiscount) * 0.05))}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">الشحن</span>
                    <span className={shippingCost === 0 ? "text-emerald-400 font-bold" : "text-stone-300"}>
                      {shippingCost === 0 ? "مجاني ✅" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-stone-300">الإجمالي النهائي</span>
                    <span className="text-xl font-black text-rv-gold">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleConfirmOrder}
                  disabled={!isFormValid}
                  className="h-12 w-full rounded-none bg-[#25d366] text-white hover:bg-[#1fbd5b] disabled:opacity-40 disabled:hover:bg-[#25d366]"
                >
                  <WhatsAppIcon className="size-4" />
                  تأكيد الطلب عبر واتساب
                </Button>
                <button
                  onClick={() => setStep("cart")}
                  className="mt-2 flex w-full items-center justify-center gap-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowRight className="size-3.5" />
                  العودة للسلة
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 3: CONFIRMATION
              ═══════════════════════════════════════════════════════════ */}
          {step === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-1 flex-col items-center justify-center px-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/20"
              >
                <CheckCircle className="size-8 text-green-400" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">
                تم إرسال طلبك بنجاح! 🎉
              </h3>
              <p className="mt-2 text-sm text-stone-400">
                طلبك اتحول على واتساب — هنتواصل معاك خلال دقائق
                <br />
                عشان نأكد العنوان ونجهز طلبك
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] text-stone-500">الإجمالي</p>
                <p className="text-lg font-black text-rv-gold">
                  {formatPrice(total)}
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="mt-6 w-full rounded-none bg-rv-gold text-black hover:bg-[#d4b96a]"
              >
                متابعة التسوق
              </Button>
              <button
                onClick={handleClose}
                className="mt-2 text-xs text-stone-500 hover:text-stone-300"
              >
                أو العودة للموقع
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── TRUST BADGES ─── */}
        {step !== "confirmation" && <TrustBadges />}
      </SheetContent>
    </Sheet>
  );
}
