import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Service } from "@/lib/types";

interface ServiceBlockProps {
  service: Service;
  reversed: boolean;
}

export default function ServiceBlock({ service, reversed }: ServiceBlockProps) {
  const t = useTranslations(`services_data.${service.id}`);
  const tContact = useTranslations("nav");
  const locale = useLocale();

  return (
    <AnimatedSection>
      <div id={service.id} className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center py-16`}>
        <div className="flex-1">
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">{t("title")}</h3>
          <p className="text-white/70 text-lg mb-6">{t("description")}</p>
          <ul className="space-y-2 mb-8">
            {(t.raw("benefits") as string[]).map((benefit: string) => (
              <li key={benefit} className="flex items-center gap-2 text-white/80">
                <span className="text-secondary">✓</span> {benefit}
              </li>
            ))}
          </ul>
          <Button href={`/${locale}/contact`} variant="secondary">{tContact("contact")}</Button>
        </div>
        <div className="flex-1">
          <Image src={service.image} alt={t("title")} width={600} height={400} className="rounded-xl object-cover w-full" />
        </div>
      </div>
    </AnimatedSection>
  );
}
