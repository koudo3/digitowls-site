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
  const locale = useLocale();

  return (
    <AnimatedSection>
      <div id={service.id} className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-start py-16`}>
        <div className="flex-1">
          <div className="mb-4">
            <Image src={service.icon} alt="" width={56} height={56} />
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">{t("title")}</h3>
          <p className="text-accent font-bold text-lg mb-4">{t("tagline")}</p>
          <p className="text-ink-dim text-lg mb-6">{t("description")}</p>

          <h4 className="text-xl font-heading font-bold text-secondary mb-3">{t("approach_title")}</h4>
          {t("approach_text") && (
            <p className="text-ink-dim mb-3">{t("approach_text")}</p>
          )}
          <ul className="space-y-2 mb-8">
            {(t.raw("benefits") as string[]).map((benefit: string) => (
              <li key={benefit} className="flex items-start gap-2 text-primary">
                <span className="text-secondary mt-1 shrink-0">✓</span> {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="bg-white border border-border rounded-xl p-6">
            <h4 className="text-xl font-heading font-bold mb-4 text-primary">{t("results_title")}</h4>
            <ul className="space-y-3 mb-6">
              {(t.raw("results") as string[]).map((result: string) => (
                <li key={result} className="flex items-start gap-2 text-ink-dim">
                  <span className="text-accent mt-1 shrink-0">→</span> {result}
                </li>
              ))}
            </ul>
            <Button href={`/${locale}/#contact`} variant="primary">{t("cta")}</Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
