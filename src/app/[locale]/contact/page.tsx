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
          <AnimatedSection delay={0.2}><CalendlyEmbed /></AnimatedSection>
        </div>
      </div>
    </section>
  );
}
