import { SECTORS } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Sectors() {
  return (
    <Section id="sectors" className="bg-mh-cream">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="قطاعات العمل الرئيسية"
            title={
              <>
                ثمانية قطاعات <span className="text-mh-gold-deep">استراتيجية</span>
              </>
            }
            subtitle="نغطي spectrum واسعاً من القطاعات لخدمة المشاريع الحكومية والخاصة داخل وخارج جمهورية مصر العربية."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {SECTORS.map((item, i) => (
            <Reveal key={item.num} delay={(i % 2) * 0.1}>
              <div className="card-editorial group flex gap-5 rounded-2xl p-6 md:p-7">
                <span className="shrink-0 text-4xl font-black text-mh-black/10 transition-colors group-hover:text-mh-gold font-wide">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-lg font-black text-mh-black">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-mh-black/50">
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
