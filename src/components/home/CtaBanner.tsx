import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CtaBanner() {
  const t = useTranslations("cta_banner");
  const locale = useLocale();
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-secondary/20 via-primary to-accent/20">
      <AnimatedSection className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t("title")}</h2>
        <p className="text-white/70 text-lg mb-8">{t("description")}</p>
        <Button href={`/${locale}/contact`} variant="primary">{t("cta")}</Button>
      </AnimatedSection>
    </section>
  );
}
