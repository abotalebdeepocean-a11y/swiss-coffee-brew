import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ChevronDown,
  MapPin,
  Phone,
  User,
  CheckCircle,
} from "lucide-react";
import {
  useCart,
  cartLine,
  cartLineKey,
  WHATSAPP_NUMBER,
  type CartItem,
} from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { blendVariantFor } from "@/components/rovento/CoffeeBag";
import { BagVisual } from "@/components/rovento/BagVisual";
import { WhatsAppIcon } from "@/components/rovento/art";
import { getSupabase } from "@/lib/supabase";

/* ─── محافظات مصر — الـ 27 محافظة ─── */
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
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
  "الإسماعيلية",
  "بورسعيد",
  "السويس",
] as const;

const GOLD = "#c9a84c";
const WHATSAPP_NOTE =
  "سيتم فتح واتساب تلقائياً — أرسل الرسالة كما هي لتأكيد طلبك";

type FieldErrors = Partial<
  Record<"name" | "phone" | "governorate" | "city" | "address", string>
>;

interface ShippingForm {
  name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes: string;
}

const EMPTY_FORM: ShippingForm = {
  name: "",
  phone: "",
  governorate: "",
  city: "",
  address: "",
  notes: "",
};

/** تنقية رقم الهاتف من الأقواس/الشرطات/المسافات قبل التحقق */
const cleanPhone = (phone: string) => phone.replace(/[\s\-()]/g, "");

export default function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    setQty,
    remove,
    clear,
  } = useCart();

  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<{ subtotal: number; shipping: number; total: number; items?: { product_name: string; size: number; qty: number; unit_price: number }[] } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const total = subtotal;
  const isFreeShipping = false;
  const shippingFee = orderSummary?.shipping ?? 100;
  const finalTotal = orderSummary?.total ?? total + shippingFee;

  const lines = useMemo(
    () =>
      items
        .map((item) => ({ item, line: cartLine(item) }))
        .filter((x): x is { item: CartItem; line: NonNullable<ReturnType<typeof cartLine>> } => !!x.line),
    [items],
  );

  /* ─── Validation ─── */
  const validate = (f: ShippingForm): FieldErrors => {
    const e: FieldErrors = {};
    if (!f.name.trim()) e.name = "من فضلك اكتب اسمك الكامل";
    const phone = cleanPhone(f.phone);
    if (!phone) {
      e.phone = "من فضلك اكتب رقم الهاتف";
    } else if (!/^01[0125]\d{8}$/.test(phone)) {
      e.phone = "رقم الهاتف لازم يكون رقم موبايل مصري صحيح من 11 رقم";
    }
    if (!f.governorate) e.governorate = "من فضلك اختر المحافظة";
    if (!f.city.trim()) e.city = "من فضلك اكتب المدينة / المركز";
    if (!f.address.trim()) e.address = "من فضلك اكتب العنوان بالتفصيل";
    return e;
  };

  const setField = (key: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (submitAttempted) {
      const next = { ...form, [key]: value };
      setErrors(validate(next));
    }
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    setSubmissionError(null);
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    if (lines.some(({ line }) => line.custom)) {
      setSubmissionError("الخلطات المخصصة غير متاحة للطلب الإلكتروني حاليًا؛ اختار منتجًا معتمدًا من الكتالوج.");
      return;
    }
    setIsSubmitting(true);
    try {
      const rpcItems = lines.map(({ item, line }) => {
        if (line.custom) throw new Error("الخلطات المخصصة غير مدعومة في الطلب الإلكتروني حاليًا.");
        const slug = line.product.slug;
        const id = slug.includes("bar-intenso") ? "bar-intenso" : slug.includes("premium") ? "premium" : slug.includes("jawad-18") ? "gold-18" : slug.includes("jawad-24") ? "gold-24" : slug.includes("gold-21") ? "gold-21" : "";
        if (!id) throw new Error("تعذر مطابقة المنتج مع كتالوج Supabase.");
        const label = line.variant?.label ?? line.label ?? line.product.weight ?? "";
        const size = /250/.test(label) ? 250 : /500/.test(label) ? 500 : 1000;
        return { id, size, qty: item.qty };
      });
      const { data, error } = await getSupabase().rpc("create_order", {
        p_name: form.name.trim(),
        p_phone: cleanPhone(form.phone),
        p_governorate: form.governorate,
        p_address: `${form.city.trim()} — ${form.address.trim()}`,
        p_notes: form.notes.trim(),
        p_items: rpcItems,
      });
      if (error) throw error;
      if (!data || !data.order_no || typeof data.total !== "number") throw new Error("لم تُرجع قاعدة البيانات رقم الطلب والإجمالي المتوقعين.");
      setOrderSummary({ subtotal: Number(data.subtotal), shipping: Number(data.shipping), total: Number(data.total), items: Array.isArray(data.items) ? data.items : [] });
      setOrderNumber(`RV-${String(data.order_no).padStart(6, "0")}`);
    } catch (error) {
      console.error("Supabase order creation failed:", error);
      setSubmissionError(error instanceof Error ? `لم يتم حفظ الطلب في قاعدة البيانات: ${error.message}` : "لم يتم حفظ الطلب. حاول مرة أخرى بعد قليل.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── WhatsApp message — exact required structure ─── */
  const whatsappUrl = useMemo(() => {
    if (!orderNumber) return "#";
    const itemLines = orderSummary?.items?.length
      ? orderSummary.items.map((item) => `- ${item.qty}x ${item.product_name} (${item.size} جم) — ${formatPrice(item.unit_price * item.qty)} ج.م`).join("\\n")
      : lines.map(({ item, line }) => {
          if (line.custom) return `- ${item.qty}x ${line.spec.label} — ${formatPrice(line.price * item.qty)} ج.م`;
          const name = line.variant ? `${line.product.name} (${line.variant.label})` : line.product.name;
          return `- ${item.qty}x ${name} — ${formatPrice(line.price * item.qty)} ج.م`;
        }).join("\\n");

    const message = [
      "🛒 *طلب جديد — روفينتو*",
      "━━━━━━━━━━━━━━━━━━",
      `📋 *رقم الطلب:* ${orderNumber}`,
      "",
      "👤 *بيانات العميل:*",
      `- الاسم: ${form.name.trim()}`,
      `- الهاتف: ${cleanPhone(form.phone)}`,
      `- المحافظة: ${form.governorate}`,
      `- المدينة: ${form.city.trim()}`,
      `- العنوان: ${form.address.trim()}`,
      `- ملاحظات: ${form.notes.trim() || "لا يوجد"}`,
      "",
      "🛍️ *تفاصيل الطلب:*",
      itemLines,
      "",
      `المنتجات قبل الشحن: ${formatPrice(orderSummary?.subtotal ?? subtotal)}`,
      `🚚 *الشحن:* ${formatPrice(shippingFee)}`,
      `💰 *الإجمالي النهائي شامل الشحن:* ${formatPrice(finalTotal)}`,
      "💳 *الدفع:* عند الاستلام",
      "━━━━━━━━━━━━━━━━━━",
      "✅ يرجى التأكيد على هذا الطلب",
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [orderNumber, form, lines, subtotal, orderSummary, shippingFee, finalTotal]);

  /* ─── Empty cart (only before order placed) ─── */
  if (items.length === 0 && !orderNumber) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0b0b] px-6 text-center text-white">
        <ShoppingBag className="size-12 text-rv-gold" />
        <h1 className="text-2xl font-bold">سلتك فارغة</h1>
        <p className="text-sm text-stone-400">
          اختار قهوتك الأول وبعدين كمّل بيانات الشحن هنا.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-lg bg-rv-gold px-6 py-3 text-sm font-bold text-black transition-colors hover:brightness-110"
        >
          تصفح المنتجات ←
        </Link>
      </div>
    );
  }

  /* ─── Confirmation screen (replaces the form, same container) ─── */
  if (orderNumber) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] px-4 py-12 text-white" dir="rtl">
        <div className="mx-auto w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
              className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-green-500/15"
            >
              <CheckCircle className="size-9 text-green-400" />
            </motion.div>

            <h1 className="text-2xl font-black">طلبك جاهز للإرسال</h1>

            <div className="mx-auto mt-5 w-fit rounded-xl border border-rv-gold/30 bg-rv-gold/10 px-5 py-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                رقم الطلب
              </p>
              <p className="mt-1 font-mono text-xl font-black text-rv-gold">
                {orderNumber}
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              لم يتم إرسال الطلب بعد. افتح واتساب من الزر التالي وأرسل الرسالة لتأكيد الطلب.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSubmitAttempted(true)}
              className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-lg text-base font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.99]"
              style={{ backgroundColor: GOLD }}
            >
              <WhatsAppIcon className="size-5" />
              📲 أرسل طلبك على واتساب
            </a>
            <p className="mt-2 text-xs text-stone-500">{WHATSAPP_NOTE}</p>

            <button
              onClick={() => {
                clear();
                navigate("/");
              }}
              className="mt-6 w-full rounded-lg border border-white/15 py-3 text-sm font-bold text-stone-300 transition-colors hover:border-white/30 hover:text-white"
            >
              متابعة التسوق
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Checkout form — the page scrolls, the form doesn't ─── */
  const inputBase =
    "w-full rounded-lg bg-white px-3 py-3 text-sm text-black placeholder-stone-400 outline-none transition-colors focus:border-rv-gold";
  const borderFor = (hasError: boolean) =>
    hasError ? "border border-red-500" : "border border-white/10 focus:border-rv-gold";
  const inputClass = (hasError: boolean) => `${inputBase} ${borderFor(hasError)}`;

  return (
    <div className="min-h-screen bg-[#0b0b0b] px-4 py-8 text-white" dir="rtl">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-2xl font-black">إتمام الطلب</h1>
        <p className="mt-1 text-sm text-stone-400">
          الدفع عند الاستلام — رسوم الشحن الحالية 100 ج.م
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* ─── Shipping form ─── */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold">
              <MapPin className="size-4 text-rv-gold" />
              بيانات الشحن
            </h2>

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-5"
            >
              {/* 1. الاسم الكامل */}
              <div>
                <label htmlFor="co-name" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-300">
                  <User className="size-3.5 text-rv-gold" />
                  الاسم الكامل <span className="text-red-400">*</span>
                </label>
                <input
                  id="co-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="مثال: محمد أحمد"
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-bold text-red-400">{errors.name}</p>
                )}
              </div>

              {/* 2. رقم الهاتف */}
              <div>
                <label htmlFor="co-phone" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-300">
                  <Phone className="size-3.5 text-rv-gold" />
                  رقم الهاتف <span className="text-red-400">*</span>
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className={inputClass(!!errors.phone)}
                />
                {errors.phone ? (
                  <p className="mt-1 text-xs font-bold text-red-400">{errors.phone}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-stone-500">
                    11 رقم — يبدأ بـ 01 (مثال: 01012345678)
                  </p>
                )}
              </div>

              {/* 3. المحافظة */}
              <div>
                <label htmlFor="co-gov" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-300">
                  <MapPin className="size-3.5 text-rv-gold" />
                  المحافظة <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="co-gov"
                    value={form.governorate}
                    onChange={(e) => setField("governorate", e.target.value)}
                    className={`${inputClass(!!errors.governorate)} appearance-none ${form.governorate ? "text-black" : "text-stone-400"}`}
                  >
                    <option value="" disabled className="bg-white text-stone-400">
                      المحافظة
                    </option>
                    {GOVERNORATES.map((g) => (
                      <option key={g} value={g} className="bg-white text-black">
                        {g}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
                </div>
                {errors.governorate && (
                  <p className="mt-1 text-xs font-bold text-red-400">{errors.governorate}</p>
                )}
              </div>

              {/* 4. المدينة / المركز */}
              <div>
                <label htmlFor="co-city" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-300">
                  <MapPin className="size-3.5 text-rv-gold" />
                  المدينة / المركز <span className="text-red-400">*</span>
                </label>
                <input
                  id="co-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  placeholder="مثال: مدينة نصر"
                  className={inputClass(!!errors.city)}
                />
                {errors.city && (
                  <p className="mt-1 text-xs font-bold text-red-400">{errors.city}</p>
                )}
              </div>

              {/* 5. العنوان بالتفصيل */}
              <div>
                <label htmlFor="co-address" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-300">
                  <MapPin className="size-3.5 text-rv-gold" />
                  العنوان بالتفصيل <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="co-address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  placeholder="الشارع، رقم المبنى، الدور، الشقة..."
                  className={`${inputClass(!!errors.address)} resize-none`}
                />
                {errors.address && (
                  <p className="mt-1 text-xs font-bold text-red-400">{errors.address}</p>
                )}
              </div>

              {/* 6. ملاحظات إضافية (اختياري) */}
              <div>
                <label htmlFor="co-notes" className="mb-1.5 block text-xs font-bold text-stone-300">
                  ملاحظات إضافية <span className="font-normal text-stone-500">(اختياري)</span>
                </label>
                <textarea
                  id="co-notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  placeholder="وقت التوصيل المفضل، علامة مميزة للعنوان..."
                  className={`${inputBase} border border-white/10 focus:border-rv-gold resize-none`}
                />
              </div>
            </form>
          </section>

          {/* ─── Order summary ─── */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
              <ShoppingBag className="size-4 text-rv-gold" />
              طلبك ({items.length} {items.length === 1 ? "منتج" : "منتجات"})
            </h2>

            <ul className="divide-y divide-white/5">
              {lines.map(({ item, line }) => {
                if (line.custom) {
                  return (
                    <li key={cartLineKey(item)} className="flex gap-3 py-3">
                      <div className="grid h-20 w-16 shrink-0 place-items-center border border-rv-gold/30 bg-gradient-to-b from-rv-gold/15 to-transparent text-[10px] font-black">
                        {line.spec.arabica}/{100 - line.spec.arabica}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <p className="text-xs font-bold text-rv-gold">{line.spec.label}</p>
                        <QtyRow item={item} price={line.price} setQty={setQty} remove={remove} />
                      </div>
                    </li>
                  );
                }
                const { product: p, variant } = line;
                return (
                  <li key={cartLineKey(item)} className="flex gap-3 py-3">
                    <Link
                      to={`/product/${p.slug}`}
                      className="grid h-20 w-16 shrink-0 place-items-center border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent"
                    >
                      <BagVisual
                        image={p.image}
                        variant={blendVariantFor(p.slug)}
                        label={p.nameEn.slice(0, 8).toUpperCase()}
                        alt={p.name}
                        className="h-16 w-auto"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <p className="text-xs font-bold leading-snug">{p.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                        {variant ? variant.label : p.weight ?? p.category}
                      </p>
                      <QtyRow item={item} price={line.price} setQty={setQty} remove={remove} />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">المنتجات</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">الشحن</span>
                <span className={isFreeShipping ? "font-bold text-emerald-400" : ""}>
                  {formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <span className="font-bold">الإجمالي النهائي</span>
                <span className="text-xl font-black text-rv-gold">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {submissionError && (
              <p role="alert" className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{submissionError}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-lg text-base font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
              style={{ backgroundColor: GOLD }}
            >
              <WhatsAppIcon className="size-5" />
              {isSubmitting ? "جارٍ حفظ الطلب..." : "حفظ الطلب والمتابعة إلى واتساب"}
            </button>
<p className="mt-2 text-center text-[11px] text-stone-500">
              💳 الدفع عند الاستلام — مش محتاج تثق فينا الأول
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ─── Quantity + remove row ─── */
function QtyRow({
  item,
  price,
  setQty,
  remove,
}: {
  item: CartItem;
  price: number;
  setQty: (slug: string, qty: number, variantId?: string) => void;
  remove: (slug: string, variantId?: string) => void;
}) {
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
        <span className="text-sm font-bold">{formatPrice(price * item.qty)}</span>
        <button
          onClick={() => remove(item.slug, item.variantId)}
          className="text-stone-500 transition-colors hover:text-red-400"
          aria-label="حذف المنتج"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
