import { MessageCircle, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/store";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-rv-black">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <img src="/images/rovento-logo-final.webp" alt="ROVENTO" className="mb-4 h-10 w-auto" />
            <p className="max-w-[280px] text-sm leading-relaxed text-rv-smoke">
              روفينتو — محمصة قهوة مختصة في مصر. تحميص طازج يومياً. شحن مجاني لكل المحافظات.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-condensed text-sm font-bold tracking-wider text-white uppercase">
              تواصل معانا
            </h4>
            <div className="space-y-3">
              {["01033012381", "01042324842", "01042320848"].map((num) => (
                <a
                  key={num}
                  href={`https://wa.me/20${num}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-rv-smoke transition-colors hover:text-rv-gold"
                >
                  <Phone className="size-3.5 text-rv-gold" />
                  {num}
                </a>
              ))}
              <a
                href="mailto:info@rovento.site"
                className="text-sm text-rv-smoke transition-colors hover:text-rv-gold"
              >
                info@rovento.site
              </a>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h4 className="mb-4 font-condensed text-sm font-bold tracking-wider text-white uppercase">
              طرق الدفع
            </h4>
            <div className="flex flex-wrap gap-2">
              {["الدفع عند الاستلام", "فودافون كاش", "Instapay"].map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-rv-smoke uppercase"
                >
                  {method}
                </span>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-green-500"
            >
              <MessageCircle className="size-4" />
              تواصل واتساب
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-rv-smoke/50">
            © 2026 ROVENTO Coffee. All rights reserved. www.rovento.site
          </p>
        </div>
      </div>
    </footer>
  );
}
