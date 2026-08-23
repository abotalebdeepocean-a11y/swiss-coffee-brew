import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div dir="rtl" className="min-h-screen bg-coffee-950 text-stone-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* فنجان فارغ */}
        <div className="relative mx-auto mb-6 w-40 h-40">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* الفنجان */}
            <ellipse cx="100" cy="140" rx="60" ry="15" fill="rgba(212,175,55,0.15)" />
            <path
              d="M40 80 Q40 140 100 150 Q160 140 160 80 Z"
              fill="rgba(212,175,55,0.1)"
              stroke="rgba(212,175,55,0.3)"
              strokeWidth="2"
            />
            {/* المقبض */}
            <path
              d="M160 90 Q185 90 185 115 Q185 140 160 140"
              fill="none"
              stroke="rgba(212,175,55,0.3)"
              strokeWidth="2"
            />
            {/* البخار */}
            <g className="animate-pulse" style={{ transformOrigin: "center" }}>
              <path d="M80 70 Q75 50 85 40" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="2" strokeLinecap="round" />
              <path d="M100 65 Q95 45 105 35" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="2" strokeLinecap="round" />
              <path d="M120 70 Q115 50 125 40" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <h1 className="text-6xl font-black text-rv-gold mb-2">404</h1>
        <h2 className="text-xl font-bold mb-3">يبدو أنك بحثت عن نكهة غير موجودة</h2>
        <p className="text-sm text-stone-400 mb-8 leading-relaxed">
          الصفحة اللي بتدور عليها مش موجودة — يمكن اتحذفت أوאוקטובר اتغير رابطها.
          <br />
          بس متقلقش، عندنا نكهات كتير تانية ممكن تجربها!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex h-12 items-center gap-2 rounded-xl bg-rv-gold px-6 text-sm font-black text-black transition-all hover:bg-rv-gold/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Home className="size-4" />
            ارجع للرئيسية
          </Link>
          <Link
            to="/shop"
            className="flex h-12 items-center gap-2 rounded-xl border border-white/15 px-6 text-sm font-bold text-stone-300 transition-all hover:border-rv-gold/50 hover:text-rv-gold"
          >
            <ShoppingBag className="size-4" />
            تسوق الآن
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
