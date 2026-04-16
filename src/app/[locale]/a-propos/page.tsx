import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import MissionSection from "@/components/about/MissionSection";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  const t = useTranslations("about_page");
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />
        <MissionSection />
        <TeamGrid />
        <ValuesSection />
      </div>
    </section>
  );
}
