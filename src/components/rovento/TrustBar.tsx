import { ShieldCheck, Star, Truck, CreditCard } from "lucide-react";

const TRUST = [
  { value: "4.9 / 5", label: "تقييم العملاء", icon: Star },
  { value: "24-72 ساعة", label: "شحن لكل المحافظات", icon: Truck },
  { value: "+5,000", label: "عميل سعيد في مصر", icon: ShieldCheck },
  { value: "100%", label: "دفع آمن ومؤكد", icon: CreditCard },
];

export function TrustBar() {
  return (
    <section className="border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 py-8 md:py-10">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-4 px-4 text-center md:grid-cols-4 md:gap-6 md:px-6">
        {TRUST.map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-2 p-2">
            <t.icon className="size-5 text-rv-gold" />
            <span className="text-xl font-black text-rv-gold sm:text-2xl md:text-3xl">
              {t.value}
            </span>
            <span className="text-[11px] font-bold text-stone-300 sm:text-xs md:text-sm">
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
