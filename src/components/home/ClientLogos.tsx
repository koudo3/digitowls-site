import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/data/clients";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ClientLogos() {
  const t = useTranslations("clients_section");
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={t("title")} />
        <AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {clients.map((client) => (
              <Image key={client.name} src={client.logo} alt={client.name} width={120} height={60} className="grayscale hover:grayscale-0 transition-all" />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
