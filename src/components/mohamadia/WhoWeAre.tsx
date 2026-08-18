import { COMPANY, WHO_WE_ARE } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function WhoWeAre() {
  return (
    <Section id="who" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="من نحن"
            title={
              <>
                <span className="text-mh-black">شركة المحمدية</span>
                <br />
                <span className="text-mh-gold-deep">للمقاولات العامة والتوريدات العمومية</span>
              </>
            }
            subtitle={WHO_WE_ARE}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <div className="w-16 h-0.5 bg-mh-gold mx-auto mb-8" />
            <p className="text-lg leading-9 text-mh-black/50 md:text-xl md:leading-10">
              {COMPANY.vision}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
