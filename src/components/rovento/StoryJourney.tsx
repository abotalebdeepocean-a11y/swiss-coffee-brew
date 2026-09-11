import { useEffect, useRef, useState } from "react";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/store";

/* ------------------------------------------------------------------ */
/*  helpers                                                            */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/*  Energy bar — one bar spanning all three sections (3 → 85 → 100)    */
/* ------------------------------------------------------------------ */

function EnergyBar({ level, tone }: { level: 3 | 85 | 100; tone: string }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className="mx-auto flex w-full max-w-[220px] items-center gap-3">
      <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-[1600ms] ease-out"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: reduced ? "0ms" : "250ms",
            background: tone,
            boxShadow: "0 0 12px rgba(201,168,76,0.45)",
          }}
        />
      </div>
      <span className="w-10 text-left text-[11px] font-black tabular-nums text-[#c9a84c]">
        {inView ? `${level}%` : ""}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flavor bar — glassmorphism sensory row                             */
/* ------------------------------------------------------------------ */

function FlavorRow({ label, value, animate }: { label: string; value: number; animate: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-[12px] font-bold text-white/55">{label}</span>
      <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 right-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${value * 10}%` : "0%",
            background: "linear-gradient(to left, #c9a84c, #f0dfa0)",
          }}
        />
      </div>
      <span className="w-5 text-left text-[12px] font-black tabular-nums text-white/80">
        {value}
      </span>
    </div>
  );
}

function FlavorCard({ title, rows, animate }: { title: string; rows: { label: string; value: number }[]; animate: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-black tracking-[0.18em] text-white/50">{title}</span>
        <span className="rounded-full border border-[#c9a84c]/25 bg-[#c9a84c]/10 px-2 py-0.5 text-[9px] font-bold text-[#c9a84c]">
          مقياس 10
        </span>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <FlavorRow key={r.label} label={r.label} value={r.value} animate={animate} />
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SECTION 1 — القهر (Burnout) — gray                                 */
/* ================================================================== */

function SectionBurnout() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const { add } = useCart();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#141414] py-24 md:py-32"
    >
      {/* gray minimal office vibe — dim window light + desk gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b1b1b] via-[#141414] to-[#101010]" />
        <div className="absolute left-[8%] top-0 h-[55%] w-[26%] rotate-6 bg-gradient-to-b from-[#2e2e2e]/70 via-[#242424]/30 to-transparent blur-2xl" />
        <div className="absolute right-[12%] top-[10%] h-[40%] w-[18%] bg-gradient-to-b from-[#262626]/60 to-transparent blur-2xl" />
        {/* faint gray blinds stripes */}
        <div
          className="absolute inset-x-0 top-0 h-[60%] opacity-[0.05]"
          style={{
            background:
              "repeating-linear-gradient(180deg, #9a9a9a 0 3px, transparent 3px 42px)",
          }}
        />
        {/* transition to gold for next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#c49b34]/10" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        {/* gold kicker */}
        <div
          className={`flex items-center justify-center gap-3 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="h-px w-10 bg-gradient-to-l from-[#c49b34]/70 to-transparent" />
          <span className="text-[12px] font-bold tracking-[0.25em] text-[#c49b34] md:text-[13px]">
            من مزارع الجبال — إلى فنجانك
          </span>
          <span className="h-px w-10 bg-gradient-to-r from-[#c49b34]/70 to-transparent" />
        </div>

        {/* headline */}
        <h1
          className={`mt-7 text-center text-[40px] font-black leading-[1.05] text-white transition-all delay-100 duration-700 md:text-[72px] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          انقل حصاد <span className="text-[#c49b34]">الجبل</span> لبيتك!
        </h1>

        <p
          className={`mx-auto mt-6 max-w-[560px] text-center text-[14px] leading-[1.9] text-[#9a9a9a] transition-all delay-200 duration-700 md:text-[16px] ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          كل يوم بنفس الفنجان.. وبنفس النتيجة. يومك يبدأ محتاج شيء واحد يكسر
          الروتين.
        </p>

        {/* single small Intenso bag — realistic scale */}
        <div
          className={`mt-12 transition-all delay-300 duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="group mx-auto w-[180px] md:w-[220px]">
            <img
              src="/images/intenso-bag-front-new.webp"
              alt="بار إنتنسو — كيس قهوة روفينتو"
              loading="lazy"
              decoding="async"
              className="w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:-translate-y-1"
            />
            <div className="mx-auto mt-3 h-3 w-[45%] rounded-full bg-black/60 blur-md" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => add("rovento-bar-intenso-1kg")}
            className="flex h-[52px] items-center gap-2 rounded-full bg-[#c49b34] px-9 text-[15px] font-black text-black shadow-[0_10px_30px_rgba(196,155,52,0.3)] transition-all hover:bg-[#d9b34a] active:scale-[0.98]"
          >
            <ShoppingCart className="size-4" />
            اطلب بريميوم
          </button>
        </div>

        {/* energy 3% */}
        <div className="mt-14">
          <EnergyBar level={3} tone="linear-gradient(to left, #9a9a9a, #cfcfcf)" />
          <p className="mt-2 text-center text-[11px] tracking-wide text-[#9a9a9a]/70">
            الطاقة.. قبل أول رشفة
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 2 — البعثة (Awakening) — gold + black void                 */
/* ================================================================== */

function CupWithCrema() {
  return (
    <div className="relative mx-auto w-[230px] md:w-[290px]" aria-hidden>
      {/* volumetric golden rays */}
      <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-full w-[8px] -translate-x-1/2 -translate-y-1/2 rotate-0 bg-gradient-to-b from-[#f0dfa0]/40 to-transparent blur-md" />
        <div className="absolute left-1/2 top-1/2 h-full w-[6px] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] bg-gradient-to-b from-[#c49b34]/35 to-transparent blur-md" />
        <div className="absolute left-1/2 top-1/2 h-full w-[6px] -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] bg-gradient-to-b from-[#c49b34]/35 to-transparent blur-md" />
        <div className="absolute left-1/2 top-1/2 h-[90%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,155,52,0.35)_0%,transparent_65%)] blur-xl" />
      </div>

      {/* matte black cup — side view with glowing golden crema */}
      <div className="relative">
        <div className="relative mx-auto h-[120px] w-[210px] rounded-b-[100px] rounded-t-[26px] border border-white/15 bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] shadow-[0_30px_70px_rgba(0,0,0,0.85)] md:h-[140px] md:w-[250px]">
          {/* golden crema glow at the rim */}
          <div className="absolute -top-[7px] left-1/2 h-[14px] w-[92%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,#ffd97a_0%,#c49b34_45%,#6b4f12_75%,transparent_100%)] shadow-[0_0_34px_rgba(255,215,120,0.55)]" />
          {/* golden rim light on the body */}
          <div className="absolute inset-x-4 top-2 h-px bg-gradient-to-r from-transparent via-[#c49b34]/60 to-transparent" />
        </div>
        {/* handle */}
        <div className="absolute right-[-26px] top-[26px] h-[54px] w-[34px] rounded-r-full border-[7px] border-r-0 border-[#1c1c1c] shadow-[inset_0_2px_6px_rgba(255,215,120,0.15)]" />
        {/* saucer + reflection */}
        <div className="mx-auto mt-1 h-[10px] w-[240px] rounded-full bg-black/70 blur-[6px]" />
      </div>

      {/* Ahmed — character in white galabeya, eyes closed, bliss (stylized, lightweight) */}
      <div className="mt-10 flex flex-col items-center">
        <div className="relative">
          {/* halo of light behind head */}
          <div className="absolute left-1/2 top-1/2 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,223,160,0.4)_0%,transparent_70%)] blur-md" />
          <div className="relative flex h-[110px] w-[86px] flex-col items-center">
            {/* head */}
            <div className="relative h-[46px] w-[46px] rounded-full bg-gradient-to-b from-[#e8c89a] to-[#c9a06e] shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
              {/* closed blissful eyes — two soft arcs */}
              <span className="absolute left-[9px] top-[24px] h-[3px] w-[8px] rounded-full bg-black/60" style={{ borderRadius: "999px 999px 0 0" }} />
              <span className="absolute right-[9px] top-[24px] h-[3px] w-[8px] rounded-full bg-black/60" style={{ borderRadius: "999px 999px 0 0" }} />
              {/* serene smile */}
              <span className="absolute bottom-[9px] left-1/2 h-[2px] w-[12px] -translate-x-1/2 rounded-full bg-black/40" />
            </div>
            {/* white galabeya body */}
            <div className="mt-[-4px] h-[68px] w-[86px] rounded-t-[34px] bg-gradient-to-b from-white to-[#e9e4d8] shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
              <div className="mx-auto mt-3 h-px w-10 bg-[#c49b34]/50" />
            </div>
          </div>
        </div>
        <span className="mt-3 text-[11px] tracking-[0.2em] text-[#c49b34]/80">أحمد.. بعد أول رشفة</span>
      </div>
    </div>
  );
}

function SectionAwakening() {
  const { ref, inView } = useInView<HTMLElement>(0.25);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black py-24 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* gold field bleeding from above, black void below — chiaroscuro */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#c49b34_0%,#6b4f12_30%,#0a0a0a_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_45%,rgba(255,215,120,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#1b2f48]/25" />
      </div>

      <div className="relative mx-auto max-w-[820px] px-5 text-center md:px-8">
        <h2
          className={`text-[46px] font-black leading-[1.15] text-white transition-all duration-700 md:text-[76px] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          ده مش مزاج.
          <span className="mt-1 block text-[#1a1a1a] drop-shadow-[0_1px_0_rgba(255,255,255,0.08)]">
            <span className="text-white" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.2)" }}>
              ده إفاقة.
            </span>
          </span>
        </h2>

        <p
          className={`mx-auto mt-5 max-w-[520px] text-[14px] leading-[1.9] text-black/70 transition-all delay-150 duration-700 md:text-[16px] ${inView ? "opacity-100" : "opacity-0"}`}
        >
          أول رشفة بتوصل.. والعالم بتتقلب. الكريما الدهبي، الريحة اللي بتملي
          المكان — اللحظة دي بس هي اللي بتفرق.
        </p>

        <div
          className={`mt-14 transition-all delay-200 duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <CupWithCrema />
        </div>

        {/* energy 85% */}
        <div className="mt-16">
          <EnergyBar level={85} tone="linear-gradient(to left, #6b4f12, #ffd97a)" />
          <p className="mt-2 text-center text-[11px] tracking-wide text-black/60">
            أول رشفة.. الإفاقة بدأت
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 3 — المجد (Glory) — navy + gold                            */
/* ================================================================== */

function SectionGlory() {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const { add } = useCart();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1b2f48] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* navy depth + gold summit glow */}
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,rgba(201,168,76,0.16)_0%,transparent_55%)]" />
        {/* minimalist line-art mountain summit */}
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[45%] w-full"
        >
          <path
            d="M0 340 L340 160 L520 260 L760 90 L980 240 L1200 170 L1440 300 L1440 420 L0 420 Z"
            fill="none"
            stroke="rgba(201,168,76,0.35)"
            strokeWidth="2"
          />
          <path
            d="M560 210 L760 90 L920 205"
            fill="none"
            stroke="rgba(201,168,76,0.8)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M0 400 L1440 400" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <h2
          className={`text-center text-[38px] font-black leading-tight text-white transition-all duration-700 md:text-[60px] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          وصلت <span className="text-[#c9a84c]">القمة</span>
        </h2>
        <p
          className={`mx-auto mt-4 max-w-[540px] text-center text-[14px] leading-[1.9] text-white/60 transition-all delay-100 duration-700 md:text-[15px] ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          من القهر للبعثة للمجد — اختار الفنجان اللي يستاهل يومك.
        </p>

        <div
          className={`mt-14 grid grid-cols-1 items-center gap-10 transition-all delay-200 duration-700 lg:grid-cols-2 lg:gap-14 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* products column — realistic scale bags */}
          <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-end sm:justify-center sm:gap-8">
            {/* PREMIUM — eagle bag */}
            <div className="group w-[190px] md:w-[215px]">
              <img
                src="/images/premium-bag.webp"
                alt="روفينتو بريميوم — كيس القهوة بالنسر"
                loading="lazy"
                decoding="async"
                className="w-full drop-shadow-[0_26px_44px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:-translate-y-1.5"
              />
              <div className="mx-auto mt-2 h-3 w-[42%] rounded-full bg-black/50 blur-md" />
              <div className="mt-4 text-center">
                <div className="text-[13px] font-black tracking-wide text-white">بريميوم</div>
                <div className="mt-1 text-[22px] font-black text-[#c9a84c]">
                  850 <span className="text-[13px]">ج.م</span>
                </div>
                <button
                  onClick={() => add("rovento-premium-1kg")}
                  className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#c9a84c] text-[14px] font-black text-black transition-all hover:bg-[#d9b34a] active:scale-[0.98]"
                >
                  <ShoppingCart className="size-4" />
                  اطلب بريميوم
                </button>
              </div>
            </div>

            {/* BAR INTENSO — parrot bag + mascot */}
            <div className="group w-[190px] md:w-[215px]">
              <div className="relative">
                <img
                  src="/images/intenso-bag-front-new.webp"
                  alt="بار إنتنسو — كيس القهوة بالببغاء"
                  loading="lazy"
                  decoding="async"
                  className="w-full drop-shadow-[0_26px_44px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:-translate-y-1.5"
                />
                {/* small parrot mascot on the table edge — looking confused */}
                <div className="absolute -bottom-1 -right-4 flex flex-col items-center" aria-hidden>
                  <div className="relative h-[30px] w-[22px]">
                    {/* body */}
                    <div className="absolute inset-x-0 top-[6px] h-[24px] rounded-[45%_55%_50%_50%/60%_60%_40%_40%] bg-[#1a1a1a] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                    {/* red head */}
                    <div className="absolute left-1/2 top-0 h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-[#d13b2e]" />
                    {/* confused eye + tilted beak */}
                    <span className="absolute left-[5px] top-[4px] size-[4px] rounded-full bg-white" />
                    <span className="absolute left-[4px] top-[3px] size-[2px] rounded-full bg-black" />
                    <span className="absolute -right-[2px] top-[7px] h-[6px] w-[7px] rotate-[18deg] rounded-[60%_40%_40%_60%] bg-[#e8a13c]" />
                    {/* wing slightly raised (confused gesture) */}
                    <span className="absolute -left-[3px] top-[11px] h-[8px] w-[7px] rounded-[60%_40%_40%_60%] bg-[#0d0d0d] -rotate-12" />
                  </div>
                  {/* tiny feet on the table line */}
                  <div className="mt-[1px] flex gap-[5px]">
                    <span className="h-[3px] w-[1.5px] bg-[#e8a13c]" />
                    <span className="h-[3px] w-[1.5px] bg-[#e8a13c]" />
                  </div>
                  <span className="mt-1 h-px w-14 bg-white/15" />
                  <span className="mt-1 text-[8px] tracking-widest text-white/35">؟!</span>
                </div>
              </div>
              <div className="mx-auto mt-2 h-3 w-[42%] rounded-full bg-black/50 blur-md" />
              <div className="mt-4 text-center">
                <div className="text-[13px] font-black tracking-wide text-white">بار إنتنسو</div>
                <div className="mt-1 text-[22px] font-black text-[#c9a84c]">
                  750 <span className="text-[13px]">ج.م</span>
                </div>
                <button
                  onClick={() => add("rovento-bar-intenso-1kg")}
                  className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#c9a84c] text-[14px] font-black text-[#c9a84c] transition-all hover:bg-[#c9a84c]/10 active:scale-[0.98]"
                >
                  <ShoppingCart className="size-4" />
                  اطلب بار إنتنسو
                </button>
              </div>
            </div>
          </div>

          {/* flavor glassmorphism cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FlavorCard
              title="بار إنتنسو"
              rows={[
                { label: "الجسم", value: 9 },
                { label: "الكريما", value: 9 },
                { label: "الروائح", value: 7 },
                { label: "الحلاوة", value: 6 },
              ]}
              animate={inView}
            />
            <FlavorCard
              title="بريميوم"
              rows={[
                { label: "الجسم", value: 9 },
                { label: "الكريما", value: 8 },
                { label: "الروائح", value: 9 },
                { label: "الحلاوة", value: 8 },
              ]}
              animate={inView}
            />
          </div>
        </div>

        {/* energy 100% */}
        <div className="mt-16">
          <EnergyBar level={100} tone="linear-gradient(to left, #6b4f12, #c9a84c, #ffd97a)" />
          <p className="mt-2 text-center text-[11px] tracking-wide text-[#c9a84c]/70">
            المجد.. فنجانك بقى على أصوله
          </p>
        </div>

        {/* secondary actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#shipping"
            className="text-[13px] font-bold text-white/50 underline-offset-4 transition hover:text-[#c9a84c] hover:underline"
          >
            الشحن والدفع عند الاستلام
          </a>
          <a
            href="https://wa.me/201033012381?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%20%D8%B1%D9%88%D9%81%D9%8A%D9%86%D8%AA%D9%88"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] font-bold text-white/50 underline-offset-4 transition hover:text-[#25D366] hover:underline"
          >
            <MessageCircle className="size-4" />
            اطلب عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Journey wrapper                                                    */
/* ------------------------------------------------------------------ */

export function StoryJourney() {
  return (
    <div>
      <SectionBurnout />
      <SectionAwakening />
      <SectionGlory />
    </div>
  );
}
