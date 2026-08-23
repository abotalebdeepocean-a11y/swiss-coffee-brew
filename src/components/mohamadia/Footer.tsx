import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-mh-charcoal border-t border-mh-gold/20">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none">
                <defs>
                  <linearGradient id="goldGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c8943e" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#a67c2e" />
                  </linearGradient>
                </defs>
                <path d="M40 8 L60 60 L52 60 L40 25 L28 60 L20 60 Z" fill="url(#goldGradientFooter)" />
                <path d="M40 15 L52 55 L48 55 L40 30 L32 55 L28 55 Z" fill="#1a1a1a" />
                <path d="M15 55 L25 55 L23 65 L17 65 Z" fill="url(#goldGradientFooter)" />
                <path d="M55 55 L65 55 L63 65 L57 65 Z" fill="url(#goldGradientFooter)" />
                <rect x="15" y="65" width="50" height="4" fill="url(#goldGradientFooter)" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-mh-gold">المحمدية</h3>
                <p className="text-sm text-mh-cream/60">للمقاولات العامة والتوريدات العمومية</p>
              </div>
            </div>
            <p className="text-mh-cream/60 leading-relaxed mb-6 max-w-md">
              شركة استراتيجية في المقاولات والتوريدات والتجارة الدولية، متخصصون في توريد وتصدير المعادن الثمينة والاستراتيجية وفق أعلى المعايير العالمية.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-bold text-mh-gold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-mh-cream/60 hover:text-mh-gold transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-mh-cream/60 hover:text-mh-gold transition-colors">
                  لماذا المحمدية
                </a>
              </li>
              <li>
                <a href="#minerals" className="text-mh-cream/60 hover:text-mh-gold transition-colors">
                  المعادن المطلوبة
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-mh-cream/60 hover:text-mh-gold transition-colors">
                  سابقة الأعمال
                </a>
              </li>
              <li>
                <a href="#contact" className="text-mh-cream/60 hover:text-mh-gold transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-bold text-mh-gold mb-6">تواصل معنا</h4>
            <div className="space-y-4">
              <a
                href="tel:+201060991949"
                className="flex items-center gap-3 text-mh-cream/60 hover:text-mh-gold transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">+20 106 099 1949</span>
              </a>
              <a
                href="mailto:elmohamadya2030@gmail.com"
                className="flex items-center gap-3 text-mh-cream/60 hover:text-mh-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>elmohamadya2030@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-mh-cream/60">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>13 شارع أبو بكر الصديق - مدينة نصر أول - القاهرة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-mh-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-mh-cream/40 text-sm">
            © {new Date().getFullYear()} شركة المحمدية للمقاولات العامة والتوريدات العمومية. جميع الحقوق محفوظة.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-mh-cream/40 hover:text-mh-gold transition-colors"
          >
            <span className="text-sm">العودة للأعلى</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
