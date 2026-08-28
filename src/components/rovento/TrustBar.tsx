import { ShieldCheck, Star, Truck, CreditCard, Zap, Coffee } from "lucide-react";

const TRUST = [
  { value: "4.9 / 5", label: "تقييم العملاء", icon: Star },
  { value: "24-72 ساعة", label: "شحن لكل المحافظات", icon: Truck },
  { value: "+500", label: "عميل سعيد في مصر", icon: ShieldCheck },
  { value: "100%", label: "دفع آمن ومؤكد", icon: CreditCard },
];

const MARQUEE_ITEMS = [
  "★ شحن مجاني لأي مكان في مصر",
  "•",
  "★ 100% منتج أصلي معتمد",
  "•",
  "★ +500 عميل سعيد",
  "•",
  "★ تقييم 4.9/5 على كل الطلبات",
  "•",
  "★ توصيل سريع 24-72 ساعة",
  "•",
];

export function TrustBar() {
  return (
    <>
      {/* شريط Marquee المتحرك */}
      <div className="relative overflow-hidden border-y border-rv-gold/20 bg-rv-gold/5 py-3">
        <div className="marquee-track flex w-max animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-4 text-xs font-bold tracking-wide text-rv-gold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* شريط الثقة الرئيسي */}
      <div className="border-b border-white/10 bg-coffee-950 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-6">
          {TRUST.map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full border border-rv-gold/20 bg-rv-gold/10">
                <t.icon className="size-5 text-rv-gold" />
              </div>
              <span className="text-lg font-black text-rv-gold">{t.value}</span>
              <span className="text-xs text-stone-400">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
