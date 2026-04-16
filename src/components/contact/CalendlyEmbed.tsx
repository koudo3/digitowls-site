import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function CalendlyEmbed() {
  const t = useTranslations("contact_page");
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
      <h3 className="font-heading font-bold text-xl mb-3">{t("calendly_title")}</h3>
      <p className="text-white/60 mb-6">{t("calendly_description")}</p>
      <Button href="https://calendly.com/digitowls" variant="primary">{t("calendly_title")}</Button>
    </div>
  );
}
