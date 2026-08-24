import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Droplets,
  Flame,
  ShieldCheck,
  Check,
  Clock,
  Zap,
  MessageCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";
import { useImageCandidates } from "./BagVisual";
import { WhatsAppIcon } from "./art";

/** مقارنة القيمة — المكنة لوحدها vs الباقة */
const VALUE_COMPARISON = [
  { item: "موكا بوت Brikka الأصلية",单独: 1800 },
  { item: "كيس ROVENTO Premium 1 كجم",单独: 1200 },
];

/** لماذا بريكا — 4 نقاط قوية */
const WHY_BRIKKA = [
  {
    icon: Droplets,
    title: "كريمة حقيقية (Crema)",
    desc: "المكنة الوحيدة في العالم اللي بتعمل طبقة كريما ذهبية كثيفة — بدون ماكنة كهربائية.",
    highlight: true,
  },
  {
    icon: Clock,
    title: "3 دقايق بس",
    desc: "من الحبة للفنجان — إسبريسو احترافي في مطبخك في أقل من 3 دقائق.",
  },
  {
    icon: ShieldCheck,
    title: "إيطالي أصلي 100%",
    desc: "Bialetti من 1933 — الجودة الإيطالية الأصيلة اللي بي.conf她全世界.",
  },
  {
    icon: Flame,
    title: "بدون ماكنة بـ 20 ألف",
    desc: "إسبريسو بكريمة حقيقية من غير ماكينة باهظة — على البوتاجاز العادي.",
  },
];

export function MokaSpotlight() {
  const { add } = useCart();
  const { src: brikaSrc, onError: brikaError } = useImageCandidates(
    IMAGES.banners.brika,
  );
  const { src: premiumSrc, onError: premiumError } = useImageCandidates(
    IMAGES.bags.premium,
  );
  const [dismissed, setDismissed] = useState(false);

  const BUNDLE_PRICE = 2999;
  const ORIGINAL_PRICE =
    VALUE_COMPARISON.reduce((s, v) => s + v.单独, 0);
  const SAVINGS = ORIGINAL_PRICE - BUNDLE_PRICE;

  return (
    <section
      id="brikka"
      className="relative overflow-hidden border-b border-stone-800 py-16 md:py-24"
    >
      {/* خلفية سينمائية */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B2E26] via-coffee-950 to-[#0A0A0A]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/8 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-emerald-900/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* شريط علوي — Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-4 py-2 text-xs font-bold text-rv-gold">
            <TrendingUp className="size-3.5" />
            الأكثر مبيعاً هذا الشهر
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-stone-400">
            <div className="flex text-rv-gold">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-3 fill-rv-gold text-rv-gold" />
              ))}
            </div>
            +320 عميل اشترى الباقة
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* النص — اليسار */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center lg:text-start"
          >
            {/* شارة العرض */}
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-black text-white shadow-lg shadow-red-600/30">
              <Zap className="size-3.5" />
              خصم {Math.round((SAVINGS / ORIGINAL_PRICE) * 100)}٪ — عرض محدود
            </div>

            {/* العنوان الرئيسي */}
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              إسبريسو احترافي
              <br />
              <span className="text-rv-gold">بكريمة ذهبية…</span>
              <br />
              <span className="text-2xl text-stone-300 sm:text-3xl">
                في 3 دقايق بس
              </span>
            </h2>

            {/* الوصف */}
            <p className="mx-auto max-w-lg text-base leading-relaxed text-stone-300 md:text-lg lg:mx-0">
              موكا بوت بريكا الإيطالي الأصلي هي{" "}
              <strong className="text-white">المكنة الوحيدة في العالم</strong>{" "}
              اللي بتعمل كريمة حقيقية (Crema) من غير ماكنة كهربائية. مع كيس
              ROVENTO Premium 1KG، هتحصل على كوب فاخر كل صباح في بيتك.
            </p>

            {/* 4 نقاط قوية */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {WHY_BRIKKA.map((w) => (
                <div
                  key={w.title}
                  className={`flex items-start gap-3 rounded-xl border p-4 ${
                    w.highlight
                      ? "border-rv-gold/40 bg-rv-gold/10"
                      : "border-stone-800 bg-coffee-900/60"
                  }`}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full ${
                      w.highlight
                        ? "bg-rv-gold text-black"
                        : "bg-rv-gold/15 text-rv-gold"
                    }`}
                  >
                    <w.icon className="size-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{w.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* مقارنة القيمة — أبرز عنصر */}
            <div className="rounded-2xl border-2 border-rv-gold/40 bg-gradient-to-br from-rv-gold/10 to-transparent p-5">
              <h4 className="mb-3 text-sm font-black text-rv-gold">
                💰 مقارنة القيمة
              </h4>
              <div className="space-y-2">
                {VALUE_COMPARISON.map((v) => (
                  <div
                    key={v.item}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-stone-300">
                      <Check className="size-3.5 text-emerald-400" />
                      {v.item}
                    </span>
                    <span className="font-mono text-stone-400">
                      {formatPrice(v.单独)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-stone-700 pt-2">
                  <div className="flex items-center justify-between text-sm text-stone-500">
                    <span>السعر منفصل</span>
                    <span className="line-through">
                      {formatPrice(ORIGINAL_PRICE)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-rv-gold">
                      سعر الباقة
                    </span>
                    <div className="text-start">
                      <span className="text-3xl font-black text-rv-gold">
                        {formatPrice(BUNDLE_PRICE)}
                      </span>
                      <span className="mr-2 inline-block rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">
                        وفّر {formatPrice(SAVINGS)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => add("machine-moka")}
                className="inline-flex h-13 items-center gap-3 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] px-8 text-base font-black text-black shadow-xl shadow-rv-gold/20 transition hover:-translate-y-0.5 hover:shadow-rv-gold/30"
              >
                اشتري الباقة الآن — {formatPrice(BUNDLE_PRICE)}
                <ChevronLeft className="size-5" />
              </button>
              <a
                href="https://wa.me/201109600543?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20ROVENTO%20%F0%9F%91%8B%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D9%8A%D9%83%D8%A7%20%C3%97%20%D9%83%D9%8A%D8%B3%20%D8%B1%D9%88%D9%81%D9%8A%D9%86%D8%AA%D9%88"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center gap-2 rounded-xl border-2 border-[#25d366]/50 bg-[#25d366]/10 px-6 text-sm font-bold text-[#25d366] transition-colors hover:bg-[#25d366] hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
                استشرنا على واتساب
              </a>
            </div>

            {/* ملاحظات ثقة */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 lg:justify-start">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-emerald-400" /> ضمان سنة
                على المكنة
              </span>
              <span className="flex items-center gap-1">
                🚚 توصيل مجاني للباقة
              </span>
              <span className="flex items-center gap-1">
                🔄 استرجاع خلال 7 أيام
              </span>
            </div>
          </motion.div>

          {/* الصورة — اليمين */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* توهج أخضر + ذهبي */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-rv-gold/15 to-emerald-500/10 blur-[80px]" />

            <div className="relative rounded-3xl border border-stone-700/50 bg-coffee-900/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              {/* الصورة الرئيسية */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={brikaSrc ?? `${IMAGES.machines.moka}.webp`}
                  onError={brikaError}
                  alt="موكا بوت Bialetti بريكا + كيس ROVENTO Premium"
                  loading="lazy"
                  className="mx-auto h-64 w-auto object-contain sm:h-72 md:h-[360px]"
                />
                {/* بادج الخصم */}
                <div className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black text-white shadow-lg">
                  خصم {Math.round((SAVINGS / ORIGINAL_PRICE) * 100)}٪
                </div>
              </div>

              {/* السعر تحت الصورة */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-rv-gold/30 bg-rv-gold/10 px-4 py-3">
                <div>
                  <p className="text-xs text-stone-400">باقة Bialetti × ROVENTO</p>
                  <p className="mt-0.5 text-[11px] text-stone-500">
                    موكا بوت + كيس Premium 1 كجم
                  </p>
                </div>
                <div className="text-start">
                  <span className="text-2xl font-black text-rv-gold">
                    {formatPrice(BUNDLE_PRICE)}
                  </span>
                  <span className="block text-[10px] text-stone-400 line-through">
                    {formatPrice(ORIGINAL_PRICE)}
                  </span>
                </div>
              </div>

              {/* تقييمات سريعة */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <div className="flex text-rv-gold">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="size-2.5 fill-rv-gold text-rv-gold" />
                    ))}
                  </div>
                  4.9
                </span>
                <span>•</span>
                <span>+320 تقييم</span>
                <span>•</span>
                <span className="text-emerald-400">✓ متوفر</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
