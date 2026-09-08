import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * FlipBag — تبديل سلو موشن بين وجهي الكيس (أمامي/خلفي).
 *
 * حركة CSS خالصة (بدون JS في الإطارات): rotateY على طبقة واحدة
 * `transform-style: preserve-3d` — الحركة كلها مركّبة على GPU، لا layout
 * ولا paint أثناء الدوران. الوجهان صوران بنفس مقاس الملف بالضبط، فلا
 * يقفز الحجم عند الانقلاب.
 *
 * التصميم:
 * - الدورة 16 ثانية (18 على الموبايل): ثبات أمامي ~5.8ث ← انقلاب بطيء
 *   1.6ث ← ثبات خلفي ~6.4ث ← عودة بطيئة. حركة فاخرة بطيئة لا تشتت.
 * - الكيسان ينقلبان بالتناوب (stagger 1.2ث) — حيّة بلا ازدواج صاخب.
 * - الوقفة عند الماوس (hover pause) تتيح للزائر تفحّص الوجه.
 * - `prefers-reduced-motion`: الحركة تتوقف تمامًا ويظهر الوجه الأمامي.
 * - لا تمرير تسبب layer explosion: طبقة واحدة فقط لكل كيس مع will-change.
 */
export function FlipBag({
  front,
  back,
  altFront,
  altBack,
  frontExtras,
  backExtras,
  stagger = false,
}: {
  /** مسار/عنصر الوجه الأمامي */
  front: ReactNode;
  /** عنصر الوجه الخلفي */
  back: ReactNode;
  altFront: string;
  altBack: string;
  /** عناصر إضافية فوق الوجه الأمامي (شارة سعر مثلًا) */
  frontExtras?: ReactNode;
  backExtras?: ReactNode;
  /** إزاحة زمنية للكيس الثاني ليتناوب الانقلاب */
  stagger?: boolean;
}) {
  return (
    <div className="rv-flip-scene relative inline-block">
      <div className={cn("relative", stagger && "rv-flip-inner--stagger")}>
        {/* ── الوجه الأمامي ── */}
        <div className="rv-flip-inner rv-flip-face-host relative">
          <div className="rv-flip-face relative" role="img" aria-label={altFront}>
            {front}
            {frontExtras}
          </div>
          {/* ── الوجه الخلفي (مُدار 180° مسبقًا) ── */}
          <div
            className="rv-flip-face rv-flip-face--back absolute inset-0 flex items-center justify-center"
            role="img"
            aria-label={altBack}
          >
            {back}
            {backExtras}
          </div>
        </div>
      </div>
    </div>
  );
}
