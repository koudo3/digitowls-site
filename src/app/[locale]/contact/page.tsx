import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactPage() {
  const t = useTranslations("contact_page");
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} description={t("description")} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <AnimatedSection className="lg:col-span-2"><ContactForm /></AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                <h3 className="font-heading font-bold text-lg">{t("info_title")}</h3>
                <div>
                  <p className="text-sm text-white/50 mb-1">{t("phone_label")}</p>
                  <a href="tel:+14384927832" className="text-secondary hover:underline">{t("phone_value")}</a>
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">{t("email_label")}</p>
                  <a href="mailto:candidature@digitowls.com" className="text-secondary hover:underline">{t("email_value")}</a>
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">{t("address_label")}</p>
                  <p className="text-white/80 whitespace-pre-line">{t("address_value")}</p>
                </div>
              </div>
              <CalendlyEmbed />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
