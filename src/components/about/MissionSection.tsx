import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function MissionSection() {
  const t = useTranslations("about_page");
  return (
    <AnimatedSection className="py-16">
      <h2 className="text-3xl font-heading font-bold mb-6">{t("mission_title")}</h2>
      <p className="text-white/70 text-lg leading-relaxed max-w-3xl">{t("mission_text")}</p>
    </AnimatedSection>
  );
}
