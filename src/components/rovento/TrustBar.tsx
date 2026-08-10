const TRUST = [
  { value: "4.9 / 5", label: "تقييم العملاء الموثق" },
  { value: "+5,000 كجم", label: "تم بيعها واستخلاصها في مصر" },
  { value: "27 محافظة", label: "شحن لكل أنحاء مصر" },
  { value: "100% آمن", label: "دفع آمن وضمان استرجاع" },
];

export function TrustBar() {
  return (
    <section className="border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 py-10">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 md:px-6">
        {TRUST.map((t) => (
          <div key={t.label} className="p-2">
            <span className="block text-2xl font-black text-rv-gold sm:text-3xl">
              {t.value}
            </span>
            <span className="mt-1 block text-xs font-bold text-stone-300 sm:text-sm">
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
