import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const values = [
  { icon: "/images/icons/innovation.svg", id: "innovation" },
  { icon: "/images/icons/collaboration.svg", id: "collaboration" },
  { icon: "/images/icons/excellence.svg", id: "excellence" },
  { icon: "/images/icons/integrity.svg", id: "integrity" },
];

export default function ValuesSection() {
  const t = useTranslations("about_page");
  const tValues = useTranslations("values_data");
  return (
    <div className="py-16">
      <SectionHeading title={t("values_title")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <AnimatedSection key={value.id} delay={i * 0.1}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="mb-3 flex justify-center">
                <Image src={value.icon} alt="" width={48} height={48} />
              </div>
              <h3 className="font-heading font-bold mb-2">{tValues(`${value.id}.title`)}</h3>
              <p className="text-white/50 text-sm">{tValues(`${value.id}.description`)}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
