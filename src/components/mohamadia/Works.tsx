import { HardHat, Landmark, Handshake } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const WORKS = [
  {
    icon: Landmark,
    title: "توريدات حكومية وتجارية",
    desc: "توريدات منظمة وفق اللوائح والمواصفات المعتمدة للجهات الحكومية والقطاع التجاري.",
  },
  {
    icon: HardHat,
    title: "مشروعات مقاولات عامة",
    desc: "تنفيذ وإدارة مشروعات المقاولات العامة بمعايير هندسية دقيقة وإشراف متكامل.",
  },
  {
    icon: Handshake,
    title: "شراكات تجارية دولية",
    desc: "تحالفات وشراكات موثقة مع موردين وشركاء عبر الأسواق العالمية.",
  },
];

export function Works() {
  return (
    <Section id="works" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="سابقة أعمال مختارة"
            title={
              <>
                أعمالنا <span className="gold-text">تتحدث عنا</span>
              </>
            }
            subtitle="نخبة من المشروعات والشراكات التي تعكس قدراتنا التنفيذية في التوريدات والمقاولات والتجارة الدولية."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WORKS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="group relative flex h-full min-h-[21rem] flex-col justify-end overflow-hidden rounded-3xl border border-neutral-900 bg-gradient-to-b from-neutral-900 to-black p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(10,10,10,0.3)]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(circle at 85% 10%, rgba(201,162,39,0.22), transparent 55%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:48px_48px]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/70 to-transparent"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="grid size-16 place-items-center rounded-2xl border border-mh-gold/50 bg-black/60 text-mh-gold backdrop-blur transition-transform duration-300 group-hover:scale-105">
                    <item.icon className="size-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
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
