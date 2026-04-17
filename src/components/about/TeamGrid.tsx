import Image from "next/image";
import { useTranslations } from "next-intl";
import { team } from "@/data/team";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function TeamGrid() {
  const t = useTranslations("about_page");
  const tTeam = useTranslations("team_data");
  return (
    <div className="py-16">
      <SectionHeading title={t("team_title")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, i) => (
          <AnimatedSection key={member.id} delay={i * 0.1}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Image
                src={member.image}
                alt={tTeam(`${member.id}.name`)}
                width={160}
                height={216}
                className="rounded-xl mx-auto mb-4 object-cover w-40 h-52"
              />
              <h3 className="font-heading font-bold text-lg">
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors"
                  >
                    {tTeam(`${member.id}.name`)}
                  </a>
                ) : (
                  tTeam(`${member.id}.name`)
                )}
              </h3>
              <p className="text-secondary text-sm mb-2">{tTeam(`${member.id}.role`)}</p>
              <p className="text-white/50 text-sm">{tTeam(`${member.id}.bio`)}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
