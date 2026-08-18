import { SECTORS } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Sectors() {
  return (
    <Section id="sectors" className="bg-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="قطاعات العمل الرئيسية"
            title={
              <>
                ثمانية قطاعات <span className="gold-text">استراتيجية</span>
              </>
            }
            subtitle="نغطيpectrum واسعاً من القطاعات لخدمة المشاريع الحكومية والخاصة داخل وخارج جمهورية مصر العربية."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {SECTORS.map((item, i) => (
            <Reveal key={item.num} delay={(i % 2) * 0.1}>
              <div className="card-dark group flex gap-5 rounded-2xl p-6 md:p-7">
                <span className="shrink-0 text-3xl font-black text-mh-gold/30 transition-colors group-hover:text-mh-gold">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-white/50">
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
