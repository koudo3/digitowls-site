"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/data/clients";

export default function ClientLogos() {
  const t = useTranslations("clients_section");

  return (
    <div className="bg-white py-14 border-b border-border overflow-hidden">
      <div className="max-w-container mx-auto px-8 flex items-center gap-14 max-md:flex-col max-md:items-start max-md:gap-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim shrink-0 max-w-[180px] leading-relaxed">
          {t("label")}
        </div>
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)",
          }}
        >
          <div className="flex items-center gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Set 1 */}
            {clients.map((client) => (
              <Image
                key={client.name}
                src={client.logo}
                alt={client.name}
                width={150}
                height={38}
                className="h-[38px] w-auto max-w-[150px] object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] transition-all duration-300 shrink-0"
              />
            ))}
            {/* Set 2 (duplicate for seamless loop) */}
            {clients.map((client) => (
              <Image
                key={`dup-${client.name}`}
                src={client.logo}
                alt=""
                width={150}
                height={38}
                className="h-[38px] w-auto max-w-[150px] object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] transition-all duration-300 shrink-0"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
