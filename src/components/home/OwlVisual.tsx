"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export default function OwlVisual() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pupils = document.querySelectorAll("[data-eye]");
    const handler = (e: MouseEvent) => {
      pupils.forEach((pupil) => {
        const rect = pupil.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) / 28, 5);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        pupil.setAttribute("transform", `translate(${x}, ${y})`);
      });
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="relative aspect-square max-w-[480px] justify-self-end w-full" ref={containerRef}>
      <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-[20px] p-8 overflow-hidden flex flex-col">
        {/* Glow */}
        <div className="absolute -top-[30%] -left-[20%] w-[85%] h-[85%] bg-gradient-to-br from-primary via-secondary to-accent blur-[60px] opacity-50 rounded-full animate-glow-pulse pointer-events-none" />

        {/* Header */}
        <div className="relative z-[2] flex justify-between font-mono text-[11px] text-white/55 tracking-widest uppercase mb-5">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
            {t("card_live")}
          </span>
          <span>FIG. 01</span>
        </div>

        {/* KPI Strip */}
        <div className="relative z-[3] grid grid-cols-3 gap-2 mb-2.5">
          <KpiPill color="text-green-500" value="98" unit="%" label={t("kpi_clients")} />
          <KpiPill color="text-secondary" value="96" unit="%" label={t("kpi_team")} delay="0.6s" />
          <KpiPill color="text-accent" value="4.9" unit="/5" label={t("kpi_innovation")} delay="1.2s" />
        </div>

        {/* Owl Display */}
        <div className="relative z-[2] flex-1 flex justify-center items-center py-5">
          {/* Scan Line */}
          <div className="absolute left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_10px_#F8BE1C,0_0_4px_#F8BE1C] z-[4] pointer-events-none opacity-0 animate-scan-sweep" style={{ animationDelay: "1.5s" }} />

          {/* Floating Metrics */}
          <div className="absolute inset-0 pointer-events-none z-[5]">
            <div className="absolute top-[4%] right-[-4%] bg-primary/55 border border-white/12 rounded-[10px] px-3 py-2 backdrop-blur-[12px] min-w-[78px] animate-metric-float">
              <div className="font-mono text-[8px] text-white/55 tracking-widest uppercase mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-blink" />
                {t("metric_roi")}
              </div>
              <div className="text-xl font-bold tracking-tight leading-none text-white flex items-baseline gap-0.5">
                <span className="text-green-500 text-sm">↗</span> <span className="text-accent">+42</span><span className="text-xs font-medium opacity-70 ml-0.5">%</span>
              </div>
            </div>
            <div className="absolute top-[42%] left-[-6%] bg-primary/55 border border-white/12 rounded-[10px] px-3 py-2 backdrop-blur-[12px] min-w-[78px] animate-metric-float" style={{ animationDelay: "1.3s" }}>
              <div className="font-mono text-[8px] text-white/55 tracking-widest uppercase mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-blink" />
                {t("metric_precision")}
              </div>
              <div className="text-xl font-bold tracking-tight leading-none text-white flex items-baseline gap-0.5">
                <span className="text-secondary-soft">99.8</span><span className="text-xs font-medium opacity-70 ml-0.5">%</span>
              </div>
            </div>
            <div className="absolute bottom-[6%] right-[-2%] bg-primary/55 border border-white/12 rounded-[10px] px-3 py-2 backdrop-blur-[12px] min-w-[78px] animate-metric-float" style={{ animationDelay: "2.6s" }}>
              <div className="font-mono text-[8px] text-white/55 tracking-widest uppercase mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-blink" />
                {t("metric_patterns")}
              </div>
              <div className="text-xl font-bold tracking-tight leading-none text-white">2<span className="text-white/50 mx-px">.</span>847</div>
            </div>
          </div>

          {/* Owl SVG */}
          <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" className="w-[220px] h-auto">
            <defs>
              <linearGradient id="owlGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2AB0C1" />
                <stop offset="100%" stopColor="#F8BE1C" />
              </linearGradient>
            </defs>
            <ellipse cx="140" cy="165" rx="95" ry="105" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
            <ellipse cx="140" cy="105" rx="78" ry="68" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
            <path d="M 85 58 L 72 32 L 98 62" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" opacity="0.9" />
            <path d="M 195 58 L 208 32 L 182 62" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" opacity="0.9" />
            <circle cx="112" cy="105" r="32" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
            <circle cx="168" cy="105" r="32" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
            <circle cx="112" cy="105" r="22" fill="url(#owlGrad)" opacity="0.95" />
            <circle cx="168" cy="105" r="22" fill="url(#owlGrad)" opacity="0.95" />
            <circle cx="112" cy="105" r="10" fill="#141840" data-eye />
            <circle cx="168" cy="105" r="10" fill="#141840" data-eye />
            <circle cx="109" cy="102" r="3" fill="#FFFFFF" />
            <circle cx="165" cy="102" r="3" fill="#FFFFFF" />
            <path d="M 132 128 L 140 145 L 148 128 Z" fill="#F8BE1C" />
            <g>
              <circle className="animate-orbit-pulse" cx="220" cy="50" r="2.8" fill="#2AB0C1" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "0.6s" }} cx="245" cy="110" r="2.2" fill="#F8BE1C" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "1.2s" }} cx="55" cy="55" r="2.8" fill="#F8BE1C" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "1.8s" }} cx="30" cy="115" r="2.2" fill="#2AB0C1" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "2.4s" }} cx="145" cy="20" r="2" fill="#2AB0C1" />
            </g>
            <g>
              <line x1="100" y1="242" x2="180" y2="242" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.7" />
              <rect className="origin-bottom animate-bar-dance" x="103" y="210" width="6" height="30" fill="#FFFFFF" opacity="0.7" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.1s", animationDuration: "1.1s" }} x="113" y="195" width="6" height="45" fill="#2AB0C1" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.3s", animationDuration: "1.5s" }} x="123" y="180" width="6" height="60" fill="#FFFFFF" opacity="0.95" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.5s", animationDuration: "1.2s" }} x="133" y="200" width="6" height="40" fill="#F8BE1C" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.25s", animationDuration: "1.4s" }} x="143" y="185" width="6" height="55" fill="#2AB0C1" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.15s", animationDuration: "1.0s" }} x="153" y="215" width="6" height="25" fill="#FFFFFF" opacity="0.75" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.4s", animationDuration: "1.3s" }} x="163" y="195" width="6" height="45" fill="#F8BE1C" />
              <text x="140" y="258" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#FFFFFF" opacity="0.55" letterSpacing="1.5">ANALYZING · 1.2M/J</text>
            </g>
          </svg>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-[2] grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
          <div>
            <b className="block text-2xl font-semibold text-white tracking-tight">350+</b>
            <span className="font-mono text-[10px] text-white/55 tracking-widest uppercase">{t("stat_experts")}</span>
          </div>
          <div>
            <b className="block text-2xl font-semibold text-white tracking-tight">7+</b>
            <span className="font-mono text-[10px] text-white/55 tracking-widest uppercase">{t("stat_clients")}</span>
          </div>
          <div>
            <b className="block text-2xl font-semibold text-white tracking-tight">4–6</b>
            <span className="font-mono text-[10px] text-white/55 tracking-widest uppercase">{t("stat_poc")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiPill({ color, value, unit, label, delay }: { color: string; value: string; unit: string; label: string; delay?: string }) {
  return (
    <div className={`relative ${color} bg-white/[0.04] border border-white/10 rounded-[10px] px-2.5 py-2 flex items-center gap-2 overflow-hidden`}>
      <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded bg-current opacity-25" />
      <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[7px] shrink-0" style={{ background: "color-mix(in srgb, currentColor 18%, transparent)" }}>
        <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="5" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-sm font-bold text-white tracking-tight">{value}<span className="text-[10px] font-medium opacity-55 ml-0.5">{unit}</span></span>
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/50 mt-px">{label}</span>
      </div>
      <span className="absolute top-2 right-2 w-[5px] h-[5px] rounded-full bg-current animate-blink" style={delay ? { animationDelay: delay } : undefined} />
    </div>
  );
}
