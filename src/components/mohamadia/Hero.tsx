import { ArrowDown, Phone, Package } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-mh-black via-mh-charcoal to-mh-black" />
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10 grid-editorial" />
        {/* Gold accent glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-mh-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-mh-gold/30 bg-mh-gold/10 mb-8">
          <span className="text-mh-gold text-sm font-medium">
            منذ 2013 | سجل تجاري وبطاقة ضريبية
          </span>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-mh-gold">شركة المحمدية</span>
          <br />
          <span className="text-mh-cream">للمقاولات العامة</span>
          <br />
          <span className="text-mh-cream">والتوريدات العمومية</span>
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-mh-cream/70 max-w-4xl mx-auto mb-12 leading-relaxed">
          شركة استراتيجية في المقاولات والتوريدات والتجارة الدولية، ومتخصصون في توريد
          <span className="text-mh-gold font-semibold"> وتصدير المعادن الثمينة والاستراتيجية </span>
          وفق أعلى المعايير العالمية.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="tel:+201060991949"
            className="flex items-center gap-3 bg-mh-gold text-mh-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-mh-gold-soft transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            تواصل الآن
          </a>
          <a
            href="#minerals"
            className="flex items-center gap-3 border-2 border-mh-gold text-mh-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-mh-gold/10 transition-all"
          >
            <Package className="w-5 h-5" />
            المعادن المطلوبة
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#why-us"
          className="inline-flex flex-col items-center text-mh-cream/50 hover:text-mh-gold transition-colors"
        >
          <span className="text-sm mb-2">اكتشف المزيد</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
