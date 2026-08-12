import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES } from "./Banners";
import { SlideVisual, useImageCandidates } from "./BagVisual";
import { cn } from "@/lib/utils";

const DURATION = 6500;

export function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, DURATION);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = SLIDES[index];
  const Scene = slide.Scene;

  // Whether the real banner photo is showing (vs. the SVG fallback scene).
  const { src, onError } = useImageCandidates(slide.image);
  const photoActive = src !== null;
  // Ready-made ads carry their own headline + CTA — keep the screen clean.
  const baked = slide.baked === true && photoActive;

  return (
    <section
      id="story"
      className="relative overflow-hidden border-b border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[540px] w-full sm:h-[600px] md:h-[640px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <SlideVisual
              src={src}
              onError={onError}
              fallback={Scene}
              scrim={baked ? "soft" : "auto"}
            />
          </motion.div>
        </AnimatePresence>

        {/* overlay copy — hidden while a baked ad banner is showing */}
        {!baked && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
            <div className="mx-auto w-full max-w-[1200px] px-5 pb-12 md:pb-16 md:px-6">
              <motion.div
                key={`text-${slide.id}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="max-w-2xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-rv-gold">
                    {slide.kicker}
                  </span>
                  <span className="h-px w-10 bg-rv-gold/60" />
                </div>
                <h3 className="text-3xl font-bold leading-[1.35] text-balance md:text-[44px] md:leading-[1.3]">
                  {slide.title}
                </h3>
                <p className="mt-3 text-sm text-white/60 md:text-base">{slide.sub}</p>
                <Link
                  to={slide.href}
                  className="pointer-events-auto mt-7 inline-flex h-11 items-center gap-2 bg-rv-gold px-6 text-sm font-black text-black transition hover:brightness-110"
                >
                  {slide.ctaLabel}
                  <ChevronLeft className="size-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        )}

        {/* floating CTA — the baked ad's button is a picture, this one works */}
        {baked && (
          <Link
            to={slide.href}
            className="absolute bottom-6 start-6 z-10 inline-flex h-11 items-center gap-2 border border-white/25 bg-black/45 px-6 text-sm font-bold text-white backdrop-blur transition-colors hover:border-rv-gold hover:bg-rv-gold hover:text-black"
          >
            {slide.ctaLabel}
            <ChevronLeft className="size-4" />
          </Link>
        )}

        {/* progress bar */}
        <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-white/10">
          <motion.div
            key={`progress-${slide.id}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: DURATION / 1000, ease: "linear" }}
            className="h-full bg-rv-gold"
          />
        </div>

        {/* controls — at the vertical center of the edges, away from the
            baked ad's bottom-left CTA and feature icons */}
        <div className="absolute inset-y-0 start-5 z-10 hidden items-center md:flex">
          <button
            onClick={prev}
            className="grid size-11 place-items-center border border-white/20 bg-black/40 text-white backdrop-blur transition-colors hover:border-rv-gold hover:bg-rv-gold hover:text-black"
            aria-label="السابق"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 end-5 z-10 hidden items-center md:flex">
          <button
            onClick={next}
            className="grid size-11 place-items-center border border-white/20 bg-black/40 text-white backdrop-blur transition-colors hover:border-rv-gold hover:bg-rv-gold hover:text-black"
            aria-label="التالي"
          >
            <ChevronLeft className="size-5" />
          </button>
        </div>

        {/* counter + dots (top row, away from the floating WhatsApp button) */}
        <div className="absolute start-5 top-6 z-10 flex items-center gap-5">            <span className="hidden font-mono text-xs tracking-[0.3em] text-white/70 sm:block">
              <span className="text-rv-gold">0{index + 1}</span> / 0{SLIDES.length}
            </span>
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  i === index ? "w-9 bg-rv-gold" : "w-4 bg-white/25 hover:bg-white/50",
                )}
                aria-label={`الانتقال إلى الشريحة ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
