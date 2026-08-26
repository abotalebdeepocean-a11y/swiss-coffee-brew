import { useState } from "react";
import { Phone, Mail, MapPin, Menu, X, Globe } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useTranslation();

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  const navLinks = [
    { label: t("home"), href: "#hero" },
    { label: t("whyUs"), href: "#why-us" },
    { label: t("minerals"), href: "#minerals" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-mh-charcoal/95 backdrop-blur-sm border-b border-mh-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6 text-mh-cream/70">
            <a href="tel:+201060991949" className="flex items-center gap-2 hover:text-mh-gold transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+20 106 099 1949</span>
            </a>
            <a href="mailto:elmohamadya2030@gmail.com" className="flex items-center gap-2 hover:text-mh-gold transition-colors hidden sm:flex">
              <Mail className="w-3.5 h-3.5" />
              <span>elmohamadya2030@gmail.com</span>
            </a>
            <span className="flex items-center gap-2 hidden md:flex">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t("address")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-mh-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo - Using the correct logo */}
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="/images/mohamadia/logo.png"
              alt="Al Muhamadia Logo"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-mh-cream/80 hover:text-mh-gold transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-mh-gold/30 text-mh-gold hover:bg-mh-gold/10 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{locale === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* CTA Button */}
            <a
              href="tel:+201060991949"
              className="hidden lg:flex items-center gap-2 bg-mh-gold text-mh-black px-6 py-3 rounded-lg font-bold hover:bg-mh-gold-soft transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t("callNow")}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-mh-cream p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-mh-charcoal border-t border-mh-gold/20">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-mh-cream/80 hover:text-mh-gold transition-colors font-medium py-2 border-b border-mh-gold/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+201060991949"
                className="flex items-center justify-center gap-2 bg-mh-gold text-mh-black px-6 py-3 rounded-lg font-bold"
              >
                <Phone className="w-4 h-4" />
                {t("callNow")}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
