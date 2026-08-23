import { useState } from "react";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "لماذا المحمدية", href: "#why-us" },
  { label: "المعادن المطلوبة", href: "#minerals" },
  { label: "سابقة الأعمال", href: "#portfolio" },
  { label: "تواصل معنا", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
              <span>13 شارع أبو بكر الصديق - مدينة نصر أول - القاهرة</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-mh-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-4">
            <div className="relative">
              {/* Logo icon - pyramid/arch shape */}
              <svg viewBox="0 0 80 80" className="w-14 h-14" fill="none">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c8943e" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#a67c2e" />
                  </linearGradient>
                </defs>
                {/* Main pyramid structure */}
                <path d="M40 8 L60 60 L52 60 L40 25 L28 60 L20 60 Z" fill="url(#goldGradient)" />
                <path d="M40 15 L52 55 L48 55 L40 30 L32 55 L28 55 Z" fill="#0a0a0a" />
                {/* Side columns */}
                <path d="M15 55 L25 55 L23 65 L17 65 Z" fill="url(#goldGradient)" />
                <path d="M55 55 L65 55 L63 65 L57 65 Z" fill="url(#goldGradient)" />
                {/* Base */}
                <rect x="15" y="65" width="50" height="4" fill="url(#goldGradient)" />
              </svg>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-mh-gold">المحمدية</h1>
              <p className="text-xs text-mh-cream/60">للمقاولات العامة والتوريدات العمومية</p>
            </div>
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

          {/* CTA Button */}
          <a
            href="tel:+201060991949"
            className="hidden lg:flex items-center gap-2 bg-mh-gold text-mh-black px-6 py-3 rounded-lg font-bold hover:bg-mh-gold-soft transition-colors"
          >
            <Phone className="w-4 h-4" />
            تواصل الآن
          </a>

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
                تواصل الآن
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
