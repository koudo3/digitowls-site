"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { team } from "@/data/team";

export default function TeamGrid() {
  const tTeam = useTranslations("team_data");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-md:gap-4">
      {team.filter(m => m.id !== "olivier-trudeau").map((member) => (
        <div key={member.id} className="reveal group">
          <div className="aspect-[3/4] bg-primary rounded-[18px] mb-5 relative overflow-hidden transition-all duration-[400ms] group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_48px_rgba(20,24,64,0.18)]">
            <Image
              src={member.image}
              alt={tTeam(`${member.id}.name`)}
              fill
              className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2] pointer-events-none" />
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3.5 right-3.5 text-white/90 z-[3] transition-all w-8 h-8 flex items-center justify-center rounded-lg bg-primary/40 backdrop-blur-[8px] group-hover:text-accent group-hover:bg-primary/75"
                aria-label={`LinkedIn ${tTeam(`${member.id}.name`)}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="aspect-square"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 17v-7H5v7h3zM6.5 8.5A1.5 1.5 0 108.5 7 1.5 1.5 0 006.5 8.5zM19 17v-4c0-2-1-3-3-3a2.7 2.7 0 00-2.5 1.3V10H11v7h3v-3.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V17h2z"/></svg>
              </a>
            )}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-secondary mb-1.5 font-medium">{tTeam(`${member.id}.role`)}</div>
          <h3 className="text-xl font-semibold tracking-tight mb-2 text-primary">{tTeam(`${member.id}.name`)}</h3>
          <p className="text-[13px] text-ink-dim leading-relaxed">{tTeam(`${member.id}.bio`)}</p>
        </div>
      ))}
    </div>
  );
}
