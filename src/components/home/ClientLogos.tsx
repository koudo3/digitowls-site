import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/data/clients";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = ["testimonial_1", "testimonial_2"] as const;

export default function ClientLogos() {
  const t = useTranslations("clients_section");
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={t("title")} />
        <AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-70">
            {clients.map((client) => (
              <Image
                key={client.name}
                src={client.logo}
                alt={client.name}
                width={140}
                height={70}
                className="grayscale hover:grayscale-0 transition-all object-contain"
              />
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-16">
          <h3 className="text-2xl font-heading font-bold text-center mb-10">
            {t("testimonials_title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.15}>
                <blockquote className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <p className="text-white/70 italic mb-4">
                    &ldquo;{t(`${key}.quote`)}&rdquo;
                  </p>
                  <footer className="text-sm">
                    <span className="text-accent font-bold">{t(`${key}.author`)}</span>
                    {t(`${key}.role`) && (
                      <span className="text-white/50"> — {t(`${key}.role`)}</span>
                    )}
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
