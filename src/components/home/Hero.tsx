import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary via-[#1a2050] to-primary overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/hero/neural-network.webp')] bg-cover bg-center" />
      <AnimatedSection className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">{t("subtitle")}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
          {t("title_1")} <span className="text-accent">{t("title_2")}</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">{t("description")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={`/${locale}/produits/cadrage-projet-ai`} variant="primary">{t("cta_primary")}</Button>
          <Button href={`/${locale}/services`} variant="outline">{t("cta_secondary")}</Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
