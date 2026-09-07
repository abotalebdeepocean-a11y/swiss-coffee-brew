import { Link } from "react-router";
import { MessageCircle, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/store";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center">
              <img
                src="/images/rovento-logo-real.webp"
                alt="ROVENTO"
                className="h-14 w-auto"
              />
            </div>
            <p className="max-w-[280px] text-sm leading-relaxed text-[#888888]">
              روفينتو — محمصة قهوة مختصة في مصر. تحميص طازج يومياً. شحن
              مجاني لكل المحافظات.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-condensed text-sm font-bold tracking-wider text-[#f5efe6] uppercase">
              تواصل معانا
            </h4>
            <div className="space-y-3">
              {["01033012381", "01042324842", "01042320848"].map((num) => (
                <a
                  key={num}
                  href={`https://wa.me/20${num}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#b0a898] transition-colors hover:text-[#c9a84c]"
                >
                  <Phone className="size-3.5 text-[#c9a84c]" />
                  {num}
                </a>
              ))}
              <a
                href="mailto:info@rovento.site"
                className="text-sm text-[#b0a898] transition-colors hover:text-[#c9a84c]"
              >
                info@rovento.site
              </a>
              <Link
                to="/about"
                className="flex items-center gap-2 text-sm text-[#b0a898] transition-colors hover:text-[#c9a84c]"
              >
                <span className="text-[#c9a84c]">→</span>
                من نحن — ملف الشركة
              </Link>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h4 className="mb-4 font-condensed text-sm font-bold tracking-wider text-[#f5efe6] uppercase">
              طرق الدفع
            </h4>
            <div className="flex flex-wrap gap-2">
              {["الدفع عند الاستلام", "فودافون كاش", "Instapay"].map(
                (method) => (
                  <span
                    key={method}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-[#b0a898] uppercase"
                  >
                    {method}
                  </span>
                ),
              )}
            </div>

            <a
              href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#1fbd5b]"
            >
              <MessageCircle className="size-4" />
              تواصل واتساب
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-[#888888]/50">
            © 2026 ROVENTO Coffee. All rights reserved. www.rovento.site
          </p>
        </div>
      </div>
    </footer>
  );
}
