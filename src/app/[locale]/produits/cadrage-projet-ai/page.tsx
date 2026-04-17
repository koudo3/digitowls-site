import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function CadragePage() {
  const t = useTranslations("cadrage_page");
  const locale = useLocale();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />
        <AnimatedSection className="text-center mb-16">
          <p className="text-accent text-xl font-heading font-bold mb-4">{t("subtitle")}</p>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{t("description")}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatedSection delay={0}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
              <div className="text-secondary text-4xl font-heading font-bold mb-4">01</div>
              <h3 className="font-heading font-bold text-lg mb-3">{t("card_1_title")}</h3>
              <p className="text-white/60">{t("card_1_text")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
              <div className="text-secondary text-4xl font-heading font-bold mb-4">02</div>
              <h3 className="font-heading font-bold text-lg mb-3">{t("card_2_title")}</h3>
              <p className="text-white/60">{t("card_2_text")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
              <div className="text-secondary text-4xl font-heading font-bold mb-4">03</div>
              <h3 className="font-heading font-bold text-lg mb-3">{t("card_3_title")}</h3>
              <ol className="space-y-3 text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold shrink-0">1.</span>
                  {t("card_3_step_1")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold shrink-0">2.</span>
                  {t("card_3_step_2")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold shrink-0">3.</span>
                  {t("card_3_step_3")}
                </li>
              </ol>
              <p className="text-secondary text-sm mt-4 italic">{t("card_3_footer")}</p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="https://insight.digitowls.ai/chat" variant="primary">{t("cta")}</Button>
          <Button href={`/${locale}/contact`} variant="outline">{t("cta_advisor")}</Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
