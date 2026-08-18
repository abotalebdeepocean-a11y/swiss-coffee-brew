import { PORTFOLIO, METALS_IMAGES } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Portfolio() {
  return (
    <Section id="portfolio" className="bg-mh-cream">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="سابقة أعمال مختارة"
            title={
              <>
                أعمالنا <span className="text-mh-gold-deep">تتحدث عنا</span>
              </>
            }
            subtitle="نخبة من المشروعات والشراكات التي تعكس قدراتنا التنفيذية في التوريدات والمقاولات والتجارة الدولية."
          />
        </Reveal>

        {/* Portfolio cards — editorial with B&W photos */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PORTFOLIO.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-mh-black transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                {/* background image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 size-full object-cover opacity-50 grayscale contrast-[1.1] transition-opacity duration-500 group-hover:opacity-65"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-mh-black via-mh-black/40 to-transparent"
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

        {/* Metals showcase — editorial grid */}
        <Reveal delay={0.2}>
          <div className="mt-16">
            <p className="text-center text-xs font-black tracking-[0.3em] uppercase text-mh-gold-deep mb-10">
              المعادن والسبائك
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {METALS_IMAGES.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="group relative h-64 overflow-hidden rounded-2xl bg-mh-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-full object-cover opacity-40 grayscale contrast-[1.1] transition-opacity duration-500 group-hover:opacity-60"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-mh-black via-mh-black/30 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h4 className="text-lg font-black text-white">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs font-bold text-white/50">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
