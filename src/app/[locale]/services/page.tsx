import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceBlock from "@/components/services/ServiceBlock";

export default function ServicesPage() {
  const t = useTranslations("services_page");
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} description={t("description")} />
        <div className="divide-y divide-white/10">
          {services.map((service, i) => (
            <ServiceBlock key={service.id} service={service} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
