import { HardHat, Landmark, Handshake } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const WORKS = [
  {
    icon: Landmark,
    title: "توريدات حكومية وتجارية",
    desc: "توريدات منظمة وفق اللوائح والمواصفات المعتمدة للجهات الحكومية والقطاع التجاري.",
    glow: "rgba(212,175,55,0.22)",
    from: "from-[#16233c]",
  },
  {
    icon: HardHat,
    title: "مشروعات مقاولات عامة",
    desc: "تنفيذ وإدارة مشروعات المقاولات العامة بمعايير هندسية دقيقة وإشراف متكامل.",
    glow: "rgba(23,34,58,0.9)",
    from: "from-[#101a2c]",
  },
  {
    icon: Handshake,
    title: "شراكات تجارية دولية",
    desc: "تحالفات وشراكات موثقة مع موردين وشركاء عبر الأسواق العالمية.",
    glow: "rgba(212,175,55,0.16)",
    from: "from-[#17223a]",
  },
];

export function Works() {
  return (
    <Section id="works" className="bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="سابقة أعمال مختارة"
            title={
              <>
                أعمالنا <span className="gold-gradient-text">تتحدث عنا</span>
              </>
            }
            subtitle="نخبة من المشروعات والشراكات التي تعكس قدراتنا التنفيذية في التوريدات والمقاولات والتجارة الدولية."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WORKS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div
                className={`group relative flex h-full min-h-[21rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${item.from} to-mh-navy-950 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-mh-gold/40`}
              >
                {/* decorative glow + grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background: `radial-gradient(circle at 85% 12%, ${item.glow}, transparent 55%)`,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="swiss-grid-bg pointer-events-none absolute inset-0 opacity-25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/50 to-transparent"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="grid size-16 place-items-center rounded-2xl border border-mh-gold/35 bg-mh-navy-950/70 text-mh-gold backdrop-blur transition-transform duration-300 group-hover:scale-105">
                    <item.icon className="size-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
