import { PORTFOLIO } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Portfolio() {
  return (
    <Section id="portfolio" className="bg-[#0a0a0a]">
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
          {PORTFOLIO.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#111] transition-all duration-300 hover:-translate-y-1.5 hover:border-mh-gold/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                {/* background image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 size-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/50 to-transparent"
                  aria-hidden="true"
                />

                <div className="relative p-7">
                  <h3 className="text-xl font-black text-white">
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
