import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { services } from "@/data/services";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ServicesGrid() {
  const t = useTranslations("services_section");
  const tServices = useTranslations("services_data");
  const locale = useLocale();

  return (
    <section className="py-20 px-4 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label={t("label")} title={t("title")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <Link href={`/${locale}/services#${service.id}`} className="block bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center hover:bg-secondary/20 transition-colors">
                <div className="mb-3 flex justify-center">
                  <Image src={service.icon} alt="" width={48} height={48} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{tServices(`${service.id}.title`)}</h3>
                <p className="text-white/60 text-sm">{tServices(`${service.id}.short`)}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
