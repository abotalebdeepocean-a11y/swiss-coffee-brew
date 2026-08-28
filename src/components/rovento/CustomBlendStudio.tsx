import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  ShoppingCart,
  Sparkles,
  Truck,
  Zap,
  Coffee,
  Bookmark,
  Share2,
  Check,
  Copy,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useCart, whatsappLink } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { useImageCandidates } from "./BagVisual";
import { WhatsAppIcon } from "./art";
import { cn } from "@/lib/utils";

/* ============================================================
   مختبر روفينتو — صمّم خلطتك الخاصة
   ============================================================ */

const ARABICA_GOLD = "#c9a227";
const ROBUSTA_BROWN = "#4a2c1a";

type RoastId = "light" | "medium" | "dark";

const ROASTS: { id: RoastId; label: string; emoji: string; image: string; desc: string }[] = [
  { id: "light", label: "فاتح", emoji: "☀️", image: IMAGES.roastLevels.light, desc: "حموضة مشرقة" },
  { id: "medium", label: "متوسط", emoji: "🔥", image: IMAGES.roastLevels.medium, desc: "التوازن المثالي" },
  { id: "dark", label: "غامق", emoji: "🌑", image: IMAGES.roastLevels.dark, desc: "كاكاو وجسم قوي" },
];

const GRINDS = [
  { id: "turkish", label: "تركي", desc: "ناعم جدًا" },
  { id: "filter", label: "فلتر / V60", desc: "متوسط الخشونة" },
  { id: "espresso", label: "إسبريسو", desc: "ناعم للماكينات" },
  { id: "whole", label: "حبوب كاملة", desc: "للمطحنة المنزلية" },
] as const;

const WEIGHTS = [
  { id: "250g", label: "250 جم", mult: 0.3 },
  { id: "500g", label: "500 جم", mult: 0.55 },
  { id: "1kg", label: "1 كجم", mult: 1 },
] as const;

const PRESETS = [
  { a: 100, label: "أرابيكا 100%", sub: "فاتح/متوسط", star: true },
  { a: 70, label: "بريميوم 70/30", sub: "متوسط-داكن", star: false },
  { a: 50, label: "كلاسيك 50/50", sub: "متوسط", star: false },
  { a: 30, label: "إنتينسو 30/70", sub: "داكن", star: false },
] as const;

const round5 = (n: number) => Math.round(n / 5) * 5;
const round10 = (n: number) => Math.round(n / 10) * 10;
const kgPrice = (a: number) => round5(700 + a * 6);
const clamp10 = (n: number) => Math.min(10, Math.max(1, Math.round(n)));

function blendNotes(a: number, roastId: RoastId): string {
  if (a >= 90)
    return roastId === "light"
      ? "فواكه وزهور وحموضة مشرقة — متعة محبي القهوة المختصة."
      : "أصل فاخر: حلاوة الأرابيكا ونكهات راقية في كل كوب.";
  if (a >= 60)
    return roastId === "dark"
      ? "توازن فاخر: حلاوة الأرابيكا مع كريما غنية وجسم مخملي."
      : "كوب متوازن حلو المذاق غني بالكريما — الخيار المميز الآمن.";
  if (a >= 40) return "جسم أقوى وكافيين أعلى مع كريما كثيفة — قهوة يومية بطابع إسبريسو.";
  return "قوة وكافيين وكريما كثيفة جدًا — لعشاق الإسبريسو الجريء.";
}

/* --- حبة بن SVG --- */
function BeanSvg({ color, className, style }: { color: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <ellipse cx="24" cy="24" rx="15" ry="20" fill={color} />
      <ellipse cx="24" cy="24" rx="15" ry="20" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
      <path d="M24 4 C 18 13, 18 35, 24 44" stroke="rgba(0,0,0,0.4)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* --- صورة حبة في دائرة --- */
function RoastBeanImage({ src, label, isActive }: { src: string; label: string; isActive: boolean }) {
  const { src: imgSrc, onError } = useImageCandidates(src);
  const sz = isActive ? 64 : 48;
  return imgSrc ? (
    <img src={imgSrc} onError={onError} alt={label} className="rounded-full object-cover" style={{ width: sz, height: sz }} />
  ) : (
    <div className="grid place-items-center rounded-full bg-amber-900/30" style={{ width: sz, height: sz }}>
      <Coffee className="text-rv-gold/40" style={{ width: sz * 0.4, height: sz * 0.4 }} />
    </div>
  );
}

/* --- رادار 6 محاور SVG --- */
const RADAR_AXES = [
  { key: "acidity", label: "الحموضة", angle: -90 },
  { key: "sweetness", label: "الحلاوة", angle: -30 },
  { key: "body", label: "الجسم", angle: 30 },
  { key: "crema", label: "الكريما", angle: 90 },
  { key: "caffeine", label: "الكافيين", angle: 150 },
  { key: "bitterness", label: "المرارة", angle: 210 },
] as const;

function FlavorRadar({ values }: { values: Record<string, number> }) {
  const cx = 140, cy = 140, maxR = 110;
  const levels = [2, 4, 6, 8, 10];

  function polarToXY(angleDeg: number, r: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function polygonPoints(scale: number) {
    return RADAR_AXES
      .map((axis) => {
        const pt = polarToXY(axis.angle, (scale / 10) * maxR);
        return `${pt.x},${pt.y}`;
      })
      .join(" ");
  }

  // Data polygon
  const dataPoints = RADAR_AXES.map((axis) => {
    const val = values[axis.key] ?? 5;
    return polarToXY(axis.angle, (val / 10) * maxR);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg viewBox="0 0 280 280" className="w-full" aria-label="رادار النكهة">
      {/* خلفية الدوائر */}
      {levels.map((lv) => (
        <polygon
          key={lv}
          points={polygonPoints(lv)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* المحاور */}
      {RADAR_AXES.map((axis) => {
        const end = polarToXY(axis.angle, maxR);
        return (
          <line
            key={axis.key}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* المنطقة الملونة */}
      <motion.path
        d={dataPath}
        fill="rgba(201,162,39,0.2)"
        stroke="#C9A227"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={false}
        animate={{ d: dataPath }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* النقاط + التسميات */}
      {RADAR_AXES.map((axis) => {
        const val = values[axis.key] ?? 5;
        const pt = polarToXY(axis.angle, (val / 10) * maxR);
        const labelPt = polarToXY(axis.angle, maxR + 18);
        return (
          <g key={axis.key}>
            <circle cx={pt.x} cy={pt.y} r="4" fill="#C9A227" stroke="#0d0b09" strokeWidth="2" />
            <text
              x={labelPt.x}
              y={labelPt.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#a8a29e"
              fontSize="10"
              fontWeight="700"
              fontFamily="Cairo, sans-serif"
            >
              {axis.label}
            </text>
            <text
              x={pt.x}
              y={pt.y - 10}
              textAnchor="middle"
              fill="#C9A227"
              fontSize="9"
              fontWeight="900"
              fontFamily="monospace"
            >
              {val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* --- النكهات البارزة مع إيموجي --- */
function prominentFlavors(a: number, roastId: RoastId): { label: string; emoji: string }[] {
  const flavors: { label: string; emoji: string }[] = [];
  if (a >= 90) {
    if (roastId === "light") {
      flavors.push({ label: "ليمون", emoji: "🍋" });
      flavors.push({ label: "عسل", emoji: "🍯" });
      flavors.push({ label: "زهور بيضاء", emoji: "🌸" });
      flavors.push({ label: "توت", emoji: "🫐" });
      flavors.push({ label: "حموضة مشرقة", emoji: "✨" });
    } else if (roastId === "medium") {
      flavors.push({ label: "شوكولاتة", emoji: "🍫" });
      flavors.push({ label: "كراميل", emoji: "🍬" });
      flavors.push({ label: "فواكه مجففة", emoji: "🍑" });
      flavors.push({ label: "زهور", emoji: "🌸" });
    } else {
      flavors.push({ label: "شوكولاتة غنية", emoji: "🍫" });
      flavors.push({ label: "مكسرات محمصة", emoji: "🥜" });
      flavors.push({ label: "كراميل داكن", emoji: "🍮" });
      flavors.push({ label: "نُكَة مُحمّصة", emoji: "🔥" });
    }
  } else if (a >= 65) {
    if (roastId === "light") {
      flavors.push({ label: "كراميل", emoji: "🍬" });
      flavors.push({ label: "شوكولاتة خفيفة", emoji: "🍫" });
      flavors.push({ label: "فواكه", emoji: "🍑" });
      flavors.push({ label: "حموضة", emoji: "🍋" });
    } else if (roastId === "medium") {
      flavors.push({ label: "شوكولاتة", emoji: "🍫" });
      flavors.push({ label: "كراميل", emoji: "🍬" });
      flavors.push({ label: "جوز", emoji: "🥜" });
      flavors.push({ label: "توت", emoji: "🫐" });
    } else {
      flavors.push({ label: "شوكولاتة داكنة", emoji: "🍫" });
      flavors.push({ label: "مكسرات", emoji: "🥜" });
      flavors.push({ label: "جسم كثيف", emoji: "💪" });
      flavors.push({ label: "نُكَة مُحمّصة", emoji: "🔥" });
    }
  } else if (a >= 40) {
    if (roastId === "dark") {
      flavors.push({ label: "كاكاو", emoji: "🍫" });
      flavors.push({ label: "مُرّ خفيف", emoji: "🌿" });
      flavors.push({ label: "توابل", emoji: "🌶️" });
      flavors.push({ label: "كراميل مُحمّص", emoji: "🍮" });
    } else {
      flavors.push({ label: "كاكاو", emoji: "🍫" });
      flavors.push({ label: "قهوة مركزة", emoji: "☕" });
      flavors.push({ label: "كراميل", emoji: "🍬" });
      flavors.push({ label: "توابل", emoji: "🌶️" });
    }
  } else {
    if (roastId === "dark") {
      flavors.push({ label: "كاكاو مركّز", emoji: "🍫" });
      flavors.push({ label: "شوكولاتة داكنة", emoji: "🍫" });
      flavors.push({ label: "فحم معتدل", emoji: "🔥" });
      flavors.push({ label: "قوة عالية", emoji: "💪" });
    } else {
      flavors.push({ label: "كاكاو", emoji: "🍫" });
      flavors.push({ label: "قهوة قوية", emoji: "☕" });
      flavors.push({ label: "توابل خفيفة", emoji: "🌶️" });
      flavors.push({ label: "كراميل مُحمّص", emoji: "🍮" });
    }
  }
  return flavors;
}

/* --- وعاء الحبوب الدائري --- */
function BeanBowl({ arabica, robusta, roastId }: { arabica: number; robusta: number; roastId: RoastId }) {
  // لون الحبوب يتدرج حسب النسبة والتحميص
  const roastDark = { light: 0.3, medium: 0.6, dark: 1 }[roastId] ?? 0.5;
  const arabicaColor = `rgb(${Math.round(180 - roastDark * 120)}, ${Math.round(130 - roastDark * 80)}, ${Math.round(60 - roastDark * 40)})`;
  const robustaColor = `rgb(${Math.round(74 - roastDark * 40)}, ${Math.round(44 - roastDark * 25)}, ${Math.round(26 - roastDark * 15)})`;
  const bowlBg = `rgb(${Math.round(30 - roastDark * 15)}, ${Math.round(20 - roastDark * 10)}, ${Math.round(15 - roastDark * 8)})`;

  // عدد الحبوب في كل قسم
  const totalBeans = 24;
  const arabicaCount = Math.round((arabica / 100) * totalBeans);
  const robustaCount = totalBeans - arabicaCount;

  // توزيع عشوائي لكن ثابت
  const beans = useMemo(() => {
    const arr: { x: number; y: number; color: string; size: number; rot: number }[] = [];
    for (let i = 0; i < totalBeans; i++) {
      const angle = (i / totalBeans) * Math.PI * 2 + (i % 3) * 0.15;
      const r = 28 + (i % 4) * 12;
      arr.push({
        x: 75 + r * Math.cos(angle),
        y: 75 + r * Math.sin(angle),
        color: i < arabicaCount ? arabicaColor : robustaColor,
        size: 6 + (i % 3) * 1.5,
        rot: (i * 37) % 360,
      });
    }
    return arr;
  }, [arabicaCount, arabicaColor, robustaColor]);

  return (
    <div className="relative">
      <svg viewBox="0 0 150 150" className="w-full" aria-label="وعاء الحبوب">
        {/* خلفية الوعاء */}
        <circle cx="75" cy="75" r="68" fill={bowlBg} stroke="rgba(201,162,39,0.3)" strokeWidth="1.5" />
        {/* توهج داخلي */}
        <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(201,162,39,0.08)" strokeWidth="0.5" />
        {/* الحبوب */}
        {beans.map((b, i) => (
          <ellipse
            key={i}
            cx={b.x}
            cy={b.y}
            rx={b.size * 0.6}
            ry={b.size}
            fill={b.color}
            transform={`rotate(${b.rot} ${b.x} ${b.y})`}
            opacity={0.85}
          />
        ))}
        {/* حافة الوعاء */}
        <circle cx="75" cy="75" r="68" fill="none" stroke="rgba(201,162,39,0.2)" strokeWidth="2" />
      </svg>
      {/* صمام أحادي */}
      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full border border-stone-600/50 bg-stone-900/80 px-2 py-1 backdrop-blur-sm">
        <svg viewBox="0 0 16 16" className="size-3" aria-label="صمام أحادي">
          <circle cx="8" cy="8" r="6" fill="none" stroke="#C9A227" strokeWidth="1.5" />
          <path d="M6 5 L10 8 L6 11" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[8px] font-bold text-stone-400">صمام أحادي</span>
      </div>
    </div>
  );
}

/* --- نص الخلطة المتحرك --- */
function BlendSummaryText({ arabica, robusta, roast, grind }: { arabica: number; robusta: number; roast: string; grind: string }) {
  return (
    <motion.p
      key={`${arabica}-${roast}-${grind}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="text-center text-xs leading-relaxed text-stone-300"
    >
      خلطتك: <span className="font-black text-rv-gold">{arabica}% أرابيكا</span> —
      تحميص <span className="font-black text-rv-gold">{roast}</span> —
      طحن <span className="font-black text-rv-gold">{grind}</span>
    </motion.p>
  );
}

/* --- QR Code SVG for Blend Cards --- */
function QRCodeSvg({ blendKey, size = 80 }: { blendKey: string; size?: number }) {
  const matrix = useMemo(() => {
    const s = 21;
    const m: boolean[][] = Array.from({ length: s }, () => Array(s).fill(false));
    const set = (r: number, c: number, v = true) => { if (r >= 0 && r < s && c >= 0 && c < s) m[r][c] = v; };
    // Finders
    for (let i = 0; i < 7; i++) { set(0, i); set(6, i); set(i, 0); set(i, 6); set(0, s - 1 - i); set(6, s - 1 - i); set(s - 7, i); set(s - 1, i); }
    for (let i = 0; i < 5; i++) { set(2, i + 2); set(4, i + 2); set(i + 2, 2); set(i + 2, 4); set(2, s - 3 - i); set(4, s - 3 - i); set(s - 3, i + 2); set(s - 1, i + 2); }
    // Data from hash
    let h = 0;
    for (let i = 0; i < blendKey.length; i++) { h = ((h << 5) - h + blendKey.charCodeAt(i)) | 0; }
    let seed = Math.abs(h) || 1;
    const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let r = 0; r < s; r++) for (let c = 0; c < s; c++) {
      if (r < 9 && c < 9) continue;
      if (r < 9 && c > s - 9) continue;
      if (r > s - 9 && c < 9) continue;
      if ((r === 6) || (c === 6)) { m[r][c] = (r + c) % 2 === 0; continue; }
      m[r][c] = rng() > 0.5;
    }
    return m;
  }, [blendKey]);
  const s = 21;
  const cell = size / s;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-label="QR Code">
      <rect width={size} height={size} fill="white" rx="4" />
      {matrix.flatMap((row, r) => row.map((v, c) => v ? (
        <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#0d0b09" rx={cell * 0.12} />
      ) : null))}
      <rect x={size * 0.38} y={size * 0.38} width={size * 0.24} height={size * 0.24} fill="#C9A227" rx="3" />
      <text x={size * 0.5} y={size * 0.53} textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">R</text>
    </svg>
  );
}

/* --- نموذج حفظ الخلطة --- */
interface SavedBlend { id: string; name: string; description: string; maker: string; arabica: number; robusta: number; roastId: RoastId; grindId: string; weightId: string; date: string; price: number; }

function SaveBlendModal({ open, onClose, onSave, blendKey, arabica, robusta, roastId, grindId, weightId, price }: {
  open: boolean; onClose: () => void; onSave: (blend: SavedBlend) => void;
  blendKey: string; arabica: number; robusta: number; roastId: RoastId; grindId: string; weightId: string; price: number;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maker, setMaker] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-rv-gold/30 bg-[#0d0b09] p-6 shadow-2xl">
        <div className="mb-5 flex items-center gap-2">
          <Bookmark className="size-5 text-rv-gold" />
          <h3 className="text-lg font-black">احفظ خلطتك</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-stone-400">اسم الخلطة *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: خلطة الصباحية"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-white placeholder:text-stone-600 focus:border-rv-gold focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-stone-400">وصف قصير (اختياري)</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="وصف للخلطة..."
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-white placeholder:text-stone-600 focus:border-rv-gold focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-stone-400">اسم صانع الخلطة *</label>
            <input type="text" value={maker} onChange={(e) => setMaker(e.target.value)} placeholder="اسمك..."
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-white placeholder:text-stone-600 focus:border-rv-gold focus:outline-none" />
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-bold text-stone-400 transition hover:text-white">إلغاء</button>
          <button onClick={() => { if (name.trim() && maker.trim()) { onSave({ id: blendKey, name: name.trim(), description: description.trim(), maker: maker.trim(), arabica, robusta, roastId, grindId, weightId, date: new Date().toISOString(), price }); onClose(); } }}
            className="flex-1 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] py-2.5 text-sm font-black text-black transition hover:brightness-110">احفظ ✓</button>
        </div>
      </motion.div>
    </div>
  );
}

/* --- كرت الخلطة --- */
function BlendCard({ blend, onClose }: { blend: SavedBlend; onClose: () => void }) {
  const roast = ROASTS.find((r) => r.id === blend.roastId)!;
  const grind = GRINDS.find((g) => g.id === blend.grindId)!;
  const flavors = prominentFlavors(blend.arabica, blend.roastId);
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/#blend-lab?blend=${blend.id}`;

  async function handleDownload() {
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600">
      <rect width="400" height="600" rx="24" fill="#0d0b09"/>
      <rect x="1" y="1" width="398" height="598" rx="23" fill="none" stroke="#C9A227" stroke-width="2"/>
      <text x="200" y="50" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="900" fill="#C9A227">ROVENTO</text>
      <text x="200" y="72" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a8a29e">BLEND LAB</text>
      <line x1="40" y1="88" x2="360" y2="88" stroke="#C9A227" stroke-width="1" opacity="0.3"/>
      <text x="200" y="125" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="900" fill="white">${blend.name}</text>
      <text x="200" y="148" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a8a29e">${blend.description || "خلطة مخصصة"}</text>
      <text x="200" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#C9A227">صانع الخلطة: ${blend.maker}</text>
      <rect x="30" y="195" width="340" height="60" rx="12" fill="rgba(201,162,39,0.08)" stroke="rgba(201,162,39,0.2)"/>
      <text x="115" y="218" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="900" fill="#C9A227">${blend.arabica}%</text>
      <text x="115" y="240" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a8a29e">أرابيكا</text>
      <text x="285" y="218" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="900" fill="#a8a29e">${blend.robusta}%</text>
      <text x="285" y="240" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a8a29e">روبوستا</text>
      <text x="200" y="218" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="900" fill="white">×</text>
      <text x="200" y="290" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">${roast.emoji} تحميص ${roast.label}  ·  ⚙️ طحن ${grind.label}</text>
      <text x="200" y="310" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a8a29e">النكهات: ${flavors.join(" · ")}</text>
      <text x="200" y="370" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a8a29e">${new Date(blend.date).toLocaleDateString("ar-EG")}</text>
      <text x="200" y="565" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#a8a29e">rovento.site</text>
    </svg>`;
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 800; canvas.height = 1200;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 800, 1200);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => { if (b) { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `${blend.name}.png`; a.click(); URL.revokeObjectURL(a.href); } }, "image/png");
    };
    img.src = url;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-rv-gold/25 bg-[#0d0b09] p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">كرت الخلطة</p>
        <button onClick={onClose} className="text-xs text-stone-500 hover:text-white">✕</button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-black text-white">{blend.name}</p>
        {blend.description && <p className="mt-1 text-xs text-stone-400">{blend.description}</p>}
        <p className="mt-1 text-[11px] text-rv-gold">صانع الخلطة: {blend.maker}</p>
      </div>
      <div className="mt-4 flex items-center gap-4 rounded-xl border border-rv-gold/15 bg-rv-gold/[0.05] p-3">
        <div className="flex-1 text-center"><p className="text-xl font-black text-rv-gold">{blend.arabica}%</p><p className="text-[10px] text-stone-400">أرابيكا</p></div>
        <span className="text-lg text-stone-600">×</span>
        <div className="flex-1 text-center"><p className="text-xl font-black text-stone-300">{blend.robusta}%</p><p className="text-[10px] text-stone-400">روبوستا</p></div>
      </div>
      <p className="mt-3 text-center text-xs text-stone-300">{roast.emoji} تحميص {roast.label} · ⚙️ طحن {grind.label}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">{flavors.map((f) => (
        <span key={f.label} className="inline-flex items-center gap-1 rounded-full border border-rv-gold/20 bg-rv-gold/[0.06] px-2.5 py-0.5 text-[10px] font-bold text-rv-gold/80"><span>{f.emoji}</span>{f.label}</span>
      ))}</div>
      <div className="mt-4 flex justify-center"><QRCodeSvg blendKey={blend.id} size={80} /></div>
      <div className="mt-4 flex gap-2">
        <button onClick={async () => { await navigator.clipboard.writeText(shareUrl); }} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-[11px] font-bold text-stone-300 transition hover:border-rv-gold/40 hover:text-rv-gold"><Copy className="size-3" />نسخ رابط</button>
        <a href={whatsappLink(`خلطة ${blend.name}: ${blend.arabica}% أرابيكا · تحميص ${roast.label} · طحن ${grind.label}\n${shareUrl}`)} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 py-2.5 text-[11px] font-bold text-emerald-400 transition hover:bg-emerald-500/10"><WhatsAppIcon className="size-3" />مشاركة واتساب</a>
        <button onClick={handleDownload} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-[11px] font-bold text-stone-300 transition hover:border-rv-gold/40 hover:text-rv-gold"><Sparkles className="size-3" />تحميل صورة</button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   المكون الرئيسي
   ============================================================ */

export function CustomBlendStudio() {
  const { add } = useCart();
  const [arabica, setArabica] = useState(70);
  const [roastId, setRoastId] = useState<RoastId>("medium");
  const [grindId, setGrindId] = useState<string>("espresso");
  const [weightId, setWeightId] = useState<string>("1kg");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedBlend, setSavedBlend] = useState<SavedBlend | null>(null);

  const robusta = 100 - arabica;
  const roast = ROASTS.find((r) => r.id === roastId)!;
  const weight = WEIGHTS.find((w) => w.id === weightId)!;
  const grind = GRINDS.find((g) => g.id === grindId)!;

  const price = useMemo(() => round10(kgPrice(arabica) * weight.mult), [arabica, weight.mult]);
  const closestPreset = PRESETS.find((p) => p.a === arabica);

  const radarValues = useMemo(() => {
    const ri = { light: -1, medium: 0, dark: 1 }[roastId] ?? 0;
    return {
      acidity: clamp10(arabica / 10 + (ri < 0 ? 2 : ri < 1 ? 0.5 : -0.5)),
      sweetness: clamp10(arabica / 12 + (ri < 0 ? 1 : ri < 1 ? 1.5 : 0.5)),
      body: clamp10(robusta / 10 + (ri < 0 ? -1 : ri < 1 ? 0.5 : 1.5)),
      crema: clamp10(robusta / 6 + (ri < 0 ? -1 : ri < 1 ? 0 : 1)),
      caffeine: clamp10(robusta / 7),
      bitterness: clamp10(robusta / 8 + (ri < 0 ? -0.5 : ri < 1 ? 0.5 : 1.5)),
    };
  }, [arabica, robusta, roastId]);

  const intensity = useMemo(
    () => Math.min(5, Math.max(1, Math.round(1 + robusta / 30 + ({ light: 0, medium: 0.5, dark: 1.5 }[roastId] ?? 0)))),
    [robusta, roastId],
  );

  const suggestedRoast = useMemo<RoastId>(() => {
    if (arabica >= 80) return "medium";
    if (arabica >= 45) return "dark";
    return "dark";
  }, [arabica]);

  const recipeKey = `cb-${arabica}-${roastId}-${grindId}-${weightId}`;
  const spec = {
    label: `خلطة مخصصة ${arabica}/${robusta} — ${weight.label}`,
    detail: `${arabica}٪ أرابيكا · ${robusta}٪ روبوستا · تحميص ${roast.label} · ${grind.label}`,
    price,
    arabica,
  };

  function handleAdd() {
    add("custom-blend", 1, recipeKey, spec);
  }

  const waLink = whatsappLink(
    `مرحبًا ROVENTO ☕ عايز أطلب خلطتي المخصصة:\n${spec.label}\n${spec.detail}\nالسعر: ${formatPrice(price)}`,
  );

  return (
    <section id="blend-lab" aria-label="مختبر روفينتو — صمّم خلطتك الخاصة" className="border-b border-white/10 bg-coffee-950">
      {/* === البانر === */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0d0b09] via-coffee-950 to-[#0d0b09]">
        {/* توهج ذهبي خفيف */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/6 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-12 text-center md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.4em] text-rv-gold backdrop-blur-sm">
              <FlaskConical className="size-3.5" />
              ROVENTO · Blend Lab
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              🧪 مختبر روفينتو —{" "}
              <span className="gold-gradient-text">صمّم خلطتك الخاصة</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
              حدد نسب الأرابيكا والروبوستا، اختار التحميص والطحن — واحنا نحمّصها طازج ونوصلها لك
            </p>

            <button
              type="button"
              onClick={() => document.getElementById("blend-studio")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-rv-gold to-[#b89728] px-8 text-sm font-black text-black shadow-lg shadow-rv-gold/20 transition hover:-translate-y-0.5 hover:shadow-rv-gold/40"
            >
              <Zap className="size-4" />
              ابدأ الخلط دلوقتي
            </button>
          </motion.div>
        </div>
      </div>

      {/* === خطوات الخدمة === */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: Coffee, title: "حدد نسبك", desc: "اسحب المؤشر واختار التحميص والطحن" },
            { icon: Zap, title: "نحمّصها طازج", desc: "على دفعات صغيرة في نفس يوم الطلب" },
            { icon: FlaskConical, title: "ندمجها بدقة", desc: "خلط يدوي بالنسب المطلوبة بالضبط" },
            { icon: Truck, title: "نوصلها ليك", desc: "تغليف + شحن لكل مصر 24-72 ساعة" },
          ].map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-rv-gold/30 md:p-4">
              <div className="flex items-center justify-between">
                <s.icon className="size-4 text-rv-gold" />
                <span className="font-mono text-[10px] tracking-widest text-stone-600">0{i + 1}</span>
              </div>
              <p className="mt-2 text-sm font-black">{s.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-stone-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === الاستوديو التفاعلي === */}
      <div id="blend-studio" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 pb-12 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* === عمود التحكم === */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:p-6">

            {/* --- 01: النسب --- */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">01 · النسب</p>
              <h3 className="mt-1 text-lg font-black md:text-xl">
                أرابيكا × روبوستا — <span className="text-rv-gold">{arabica}/{robusta}</span>
              </h3>

              {/* بطاقتا الحبوب */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {/* أرابيكا */}
                <div className="relative flex flex-col items-center gap-2 rounded-xl border border-rv-gold/40 bg-rv-gold/[0.06] p-3 text-center">
                  <div className="grid size-16 place-items-center overflow-hidden rounded-full bg-rv-gold/10">
                    <BeanSvg color={ARABICA_GOLD} className="size-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-black leading-none text-rv-gold">{arabica}%</p>
                    <p className="mt-1 text-xs font-bold text-stone-200">أرابيكا</p>
                    <p className="mt-0.5 text-[10px] text-stone-500">حلاوة، حموضة، نكهات راقية</p>
                  </div>
                </div>
                {/* روبوستا */}
                <div className="relative flex flex-col items-center gap-2 rounded-xl border border-stone-600/40 bg-stone-800/30 p-3 text-center">
                  <div className="grid size-16 place-items-center overflow-hidden rounded-full bg-black/30">
                    <BeanSvg color={ROBUSTA_BROWN} className="size-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-black leading-none text-stone-200">{robusta}%</p>
                    <p className="mt-1 text-xs font-bold text-stone-300">روبوستا</p>
                    <p className="mt-0.5 text-[10px] text-stone-500">كريما كثيفة، قوة، كافيين</p>
                  </div>
                </div>
              </div>

              {/* السلايدر */}
              <div className="mt-5" dir="ltr">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={arabica}
                  onChange={(e) => setArabica(Number(e.target.value))}
                  aria-label="نسبة الأرابيكا في الخلطة"
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-[#4a2c1a] via-stone-600 to-[#c9a227] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-rv-gold [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.7)] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rv-gold [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-stone-400">روبوستا</span>
                  <span className="font-mono text-[10px] tracking-widest text-stone-600">0% ← أرابيكا → 100%</span>
                  <span className="text-rv-gold">أرابيكا</span>
                </div>
              </div>

              {/* وصفات جاهزة */}
              <div className="mt-4 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.a}
                    type="button"
                    onClick={() => setArabica(p.a)}
                    className={cn(
                      "group flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition-all",
                      arabica === p.a
                        ? "border-rv-gold bg-rv-gold/15 text-rv-gold shadow-[0_0_18px_rgba(212,175,55,0.2)]"
                        : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-rv-gold/50",
                    )}
                  >
                    {p.star && <Sparkles className="size-3 text-rv-gold" />}
                    {p.label}
                    <span className="text-[10px] text-stone-500">({p.sub})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* --- 02: التحميص --- */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">02 · التحميص</p>
                {suggestedRoast !== roastId && (
                  <button
                    type="button"
                    onClick={() => setRoastId(suggestedRoast)}
                    className="flex items-center gap-1 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-2.5 py-1 text-[10px] font-bold text-rv-gold transition hover:bg-rv-gold/20"
                  >
                    <Sparkles className="size-2.5" />
                    نوصي بـ {ROASTS.find((r) => r.id === suggestedRoast)?.label}
                  </button>
                )}
              </div>

              {/* 3 أزرار التحميص مع صور */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {ROASTS.map((r) => {
                  const isActive = roastId === r.id;
                  const isSuggested = suggestedRoast === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoastId(r.id)}
                      className={cn(
                        "group relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all",
                        isActive
                          ? "border-rv-gold bg-rv-gold/10 shadow-[0_0_20px_rgba(201,162,39,0.15)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25",
                      )}
                    >
                      {/* الدائرة */}
                      <div
                        className={cn(
                          "relative flex items-center justify-center rounded-full transition-all duration-300",
                          isActive ? "scale-110" : "scale-100",
                        )}
                        style={{
                          width: isActive ? 72 : 56,
                          height: isActive ? 72 : 56,
                          border: isActive ? `3px solid ${ARABICA_GOLD}` : "2px solid rgba(255,255,255,0.12)",
                          background: `radial-gradient(circle, ${r.id === "light" ? "#c4956a" : r.id === "medium" ? "#8B5E3C" : "#3D1F0D"}22, transparent)`,
                        }}
                      >
                        <RoastBeanImage src={r.image} label={r.label} isActive={isActive} />
                        {isActive && (
                          <motion.div
                            layoutId="roast-ring"
                            className="absolute -inset-1 rounded-full border-2 border-rv-gold/40"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </div>

                      <div>
                        <span className="text-lg">{r.emoji}</span>
                        <p className={cn("text-sm font-black", isActive ? "text-rv-gold" : "text-stone-300")}>
                          {r.label}
                        </p>
                        <p className="text-[10px] text-stone-500">{r.desc}</p>
                      </div>

                      {isSuggested && !isActive && (
                        <span className="absolute top-2 left-2 flex items-center gap-0.5 rounded-full bg-rv-gold/20 px-1.5 py-0.5 text-[8px] font-bold text-rv-gold">
                          <Sparkles className="size-2" />
                          مقترح
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- 03: الطحن --- */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">03 · الطحن</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {GRINDS.map((g) => {
                  const isActive = grindId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrindId(g.id)}
                      className={cn(
                        "rounded-xl border p-3 text-center transition-all",
                        isActive
                          ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                          : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                      )}
                    >
                      <span className="block text-sm font-black">{g.label}</span>
                      <span className="mt-0.5 block text-[10px] text-stone-500">{g.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- 04: الوزن --- */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">04 · الوزن</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {WEIGHTS.map((w) => {
                  const isActive = weightId === w.id;
                  const wPrice = round10(kgPrice(arabica) * w.mult);
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWeightId(w.id)}
                      className={cn(
                        "rounded-xl border p-3 text-center transition-all",
                        isActive
                          ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                          : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                      )}
                    >
                      <span className="block text-sm font-black">{w.label}</span>
                      <span className="mt-1 block font-mono text-[11px] font-bold text-stone-500">
                        {formatPrice(wPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* === عمود المعاينة === */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-rv-gold/20 bg-gradient-to-b from-coffee-800/50 to-coffee-950/80 shadow-[0_0_50px_rgba(212,175,55,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">خليطتك الحية</p>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  جاهزة للطلب
                </span>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                {/* وعاء الحبوب + النسب */}
                <div className="relative mx-auto w-full max-w-[220px]">
                  <BeanBowl arabica={arabica} robusta={robusta} roastId={roastId} />
                  {/* النسب في المركز */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="font-mono text-2xl font-black text-rv-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl">{arabica}/{robusta}</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">أرابيكا/روبوستا</p>
                  </div>
                </div>

                {/* نص الخلطة المتحرك */}
                <div className="mt-4">
                  <BlendSummaryText arabica={arabica} robusta={robusta} roast={roast.label} grind={grind.label} />
                </div>

                {/* رادار الملف التذوقي */}
                <div className="mt-5">
                  <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-stone-500">الملف التذوقي</p>
                  <FlavorRadar values={radarValues} />
                </div>

                {/* النكهات البارزة مع إيموجي وحركة */}
                <div className="mt-4">
                  <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-stone-500">النكهات البارزة</p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <AnimatePresence mode="popLayout">
                      {prominentFlavors(arabica, roastId).map((f, i) => (
                        <motion.span
                          key={`${f.label}-${roastId}`}
                          initial={{ opacity: 0, scale: 0.8, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -8 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="inline-flex items-center gap-1 rounded-full border border-rv-gold/25 bg-rv-gold/[0.08] px-3 py-1 text-[11px] font-bold text-rv-gold/80"
                        >
                          <span className="text-xs">{f.emoji}</span>
                          {f.label}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* شدة القهوة */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="text-xs font-bold">شدة القهوة</span>
                  <div className="flex gap-1.5" aria-label={`شدة ${intensity} من 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={cn("size-2 rounded-full transition-colors", i < intensity ? "bg-rv-gold" : "bg-white/15")} />
                    ))}
                  </div>
                </div>

                {/* توقعات النكهة */}
                <p className="mt-4 rounded-xl border border-rv-gold/15 bg-rv-gold/[0.06] p-3 text-xs leading-relaxed text-stone-200">
                  <span className="font-black text-rv-gold">توقعات الكوب: </span>
                  {blendNotes(arabica, roastId)}
                </p>

                {closestPreset && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-400">
                    <Sparkles className="size-3 text-rv-gold" />
                    نسبك مطابقة لـ<span className="font-bold text-rv-gold">{closestPreset.label}</span>
                  </p>
                )}

                {/* السعر + الأزرار */}
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] text-stone-500">سعر {weight.label}</p>
                      <p className="mt-0.5 text-2xl font-black text-rv-gold sm:text-3xl">{formatPrice(price)}</p>
                      <p className="mt-1 font-mono text-[10px] text-stone-500">{formatPrice(kgPrice(arabica))} / كجم</p>
                    </div>
                  </div>

                  {/* حفظ + مشاركة */}
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowSaveModal(true)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-[11px] font-bold text-stone-300 transition-all hover:border-rv-gold/40 hover:text-rv-gold">
                      <Bookmark className="size-3.5" />
                      احفظ خلطتي
                    </button>
                    <button type="button" onClick={async () => { await navigator.clipboard.writeText(`${window.location.origin}/#blend-lab?blend=${recipeKey}`); }} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-[11px] font-bold text-stone-300 transition-all hover:border-rv-gold/40 hover:text-rv-gold">
                      <Copy className="size-3.5" />
                      نسخ رابط
                    </button>
                  </div>

                  {/* كرت الخلطة المحفوظة */}
                  {savedBlend && (
                    <div className="mt-3">
                      <BlendCard blend={savedBlend} onClose={() => setSavedBlend(null)} />
                    </div>
                  )}

                  <button type="button" onClick={handleAdd} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] text-sm font-black text-black transition hover:brightness-110">
                    <ShoppingCart className="size-4.5" />
                    ضيف خلطتك للسلة
                  </button>

                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 text-sm font-bold text-emerald-400 transition-colors hover:bg-emerald-500/10">
                    <WhatsAppIcon className="size-4" />
                    اطلبها عبر واتساب
                  </a>

                  <p className="mt-2 text-center text-[10px] leading-relaxed text-stone-500">
                    تحميص طازج يوم الطلب · تغليف بصمام أحادي · شحن لكل مصر
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نموذج حفظ الخلطة */}
      <SaveBlendModal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={(blend) => {
          setSavedBlend(blend);
          try {
            const saved = JSON.parse(localStorage.getItem("rovento-saved-blends") || "[]") as SavedBlend[];
            const exists = saved.findIndex((s) => s.id === blend.id);
            if (exists >= 0) saved[exists] = blend; else saved.unshift(blend);
            localStorage.setItem("rovento-saved-blends", JSON.stringify(saved.slice(0, 20)));
          } catch { /* تجاهل */ }
        }}
        blendKey={recipeKey}
        arabica={arabica}
        robusta={robusta}
        roastId={roastId}
        grindId={grindId}
        weightId={weightId}
        price={price}
      />
    </section>
  );
}
