import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Footer() {
  const { t, locale } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: t("home"), href: "#hero" },
    { label: t("whyUs"), href: "#why-us" },
    { label: t("minerals"), href: "#minerals" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-mh-charcoal border-t border-mh-gold/20">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/images/mohamadia/company-profile.png"
                alt="Al Muhamadia Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-mh-gold">
                  {locale === "ar" ? "المحمدية" : "Al Muhamadia"}
                </h3>
                <p className="text-sm text-mh-cream/60">
                  {locale === "ar" ? "للمقاولات العامة والتوريدات العمومية" : "General Contracting & Supplies"}
                </p>
              </div>
            </div>
            <p className="text-mh-cream/60 leading-relaxed mb-6 max-w-md">
              {t("footerDesc")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-bold text-mh-gold mb-6">{t("quickLinks")}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-mh-cream/60 hover:text-mh-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-bold text-mh-gold mb-6">{t("contactInfoFooter")}</h4>
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
                <span>{t("address")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-mh-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-mh-cream/40 text-sm">
            © {new Date().getFullYear()} {locale === "ar" ? "شركة المحمدية للمقاولات العامة والتوريدات العمومية" : "Al Muhamadia for General Contracting & General Supplies"}. {t("copyright")}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-mh-cream/40 hover:text-mh-gold transition-colors"
          >
            <span className="text-sm">{t("backToTop")}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
