import { useEffect } from "react";

/**
 * RippleFX — يفعّل تأثير الموجة (ripple) على أي زر عليه كلاس `rv-btn`.
 * يستمع مرة واحدة على مستوى الصفحة كلها بدل ما نضيف مستمع لكل زر.
 */
export function RippleFX() {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLElement>(".rv-btn");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const span = document.createElement("span");
      span.className = "rv-ripple-ink";
      span.style.width = `${size}px`;
      span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(span);
      span.addEventListener("animationend", () => span.remove(), { once: true });
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  return null;
}
