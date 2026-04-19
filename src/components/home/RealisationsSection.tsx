"use client";

import { useTranslations } from "next-intl";

const caseIllustrations = [
  // Case 1: Dashboard + concentric circles (AI assistant)
  <svg key="v1" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="70" width="300" height="170" rx="8" fill="none" stroke="#141840" strokeWidth="3"/>
    <rect x="70" y="90" width="120" height="130" rx="4" fill="#2AB0C1" opacity="0.35"/>
    <line x1="85" y1="115" x2="175" y2="115" stroke="#141840" strokeWidth="2.5"/>
    <line x1="85" y1="140" x2="155" y2="140" stroke="#141840" strokeWidth="2.5"/>
    <line x1="85" y1="165" x2="175" y2="165" stroke="#141840" strokeWidth="2.5"/>
    <line x1="85" y1="190" x2="135" y2="190" stroke="#141840" strokeWidth="2.5"/>
    <circle cx="280" cy="150" r="55" fill="none" stroke="#F8BE1C" strokeWidth="3"/>
    <circle cx="280" cy="150" r="32" fill="none" stroke="#2AB0C1" strokeWidth="2.5"/>
    <circle cx="280" cy="150" r="12" fill="#F8BE1C"/>
  </svg>,
  // Case 2: Network graph (data platform)
  <svg key="v2" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#141840" strokeWidth="2.5" fill="none">
      <circle cx="80" cy="150" r="28"/>
      <circle cx="200" cy="90" r="28"/>
      <circle cx="200" cy="210" r="28"/>
      <circle cx="320" cy="150" r="28"/>
      <line x1="108" y1="150" x2="172" y2="100"/>
      <line x1="108" y1="150" x2="172" y2="200"/>
      <line x1="228" y1="90" x2="292" y2="140"/>
      <line x1="228" y1="210" x2="292" y2="160"/>
    </g>
    <circle cx="200" cy="90" r="12" fill="#F8BE1C"/>
    <circle cx="200" cy="210" r="12" fill="#F8BE1C"/>
    <circle cx="80" cy="150" r="12" fill="#2AB0C1"/>
    <circle cx="320" cy="150" r="12" fill="#2AB0C1"/>
  </svg>,
  // Case 3: Line chart (detection/security)
  <svg key="v3" viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="50" width="220" height="120" rx="6" fill="none" stroke="#141840" strokeWidth="2.5"/>
    <path d="M 60 140 L 85 110 L 115 125 L 145 85 L 175 100 L 205 70 L 235 85" fill="none" stroke="#F8BE1C" strokeWidth="3.5"/>
    <circle cx="85" cy="110" r="5" fill="#141840"/>
    <circle cx="115" cy="125" r="5" fill="#141840"/>
    <circle cx="145" cy="85" r="6" fill="#F8BE1C"/>
    <circle cx="175" cy="100" r="5" fill="#141840"/>
    <circle cx="205" cy="70" r="6" fill="#F8BE1C"/>
    <circle cx="235" cy="85" r="5" fill="#2AB0C1"/>
  </svg>,
  // Case 4: Bar chart (HR analytics)
  <svg key="v4" viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#141840" strokeWidth="2" fill="none">
      <rect x="45" y="60" width="38" height="110" rx="4"/>
      <rect x="95" y="80" width="38" height="90" rx="4"/>
      <rect x="145" y="100" width="38" height="70" rx="4"/>
      <rect x="195" y="70" width="38" height="100" rx="4"/>
    </g>
    <rect x="45" y="120" width="38" height="50" fill="#2AB0C1" opacity="0.6"/>
    <rect x="95" y="130" width="38" height="40" fill="#F8BE1C" opacity="0.7"/>
    <rect x="145" y="135" width="38" height="35" fill="#2AB0C1" opacity="0.6"/>
    <rect x="195" y="120" width="38" height="50" fill="#F8BE1C" opacity="0.7"/>
  </svg>,
  // Case 5: Curves + circle (health/ML)
  <svg key="v5" viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
    <path d="M 40 130 Q 80 70 120 120 T 200 100 T 260 80" fill="none" stroke="#F8BE1C" strokeWidth="3.5"/>
    <path d="M 40 150 Q 80 100 120 140 T 200 130 T 260 110" fill="none" stroke="#2AB0C1" strokeWidth="2.5" opacity="0.8"/>
    <circle cx="150" cy="115" r="32" fill="none" stroke="#141840" strokeWidth="2.5"/>
    <circle cx="150" cy="115" r="12" fill="#F8BE1C"/>
  </svg>,
];

const cases = [
  { id: "case_1", span: "col-span-6 lg:col-span-3", bgClass: "bg-gradient-to-br from-secondary-wash to-white" },
  { id: "case_2", span: "col-span-6 lg:col-span-3", bgClass: "bg-gradient-to-br from-accent/10 to-white" },
  { id: "case_3", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-primary/[0.04] to-white" },
  { id: "case_4", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-secondary-wash to-accent/[0.06]" },
  { id: "case_5", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-primary/5 to-secondary-wash" },
];

export default function RealisationsSection() {
  const t = useTranslations("realisations_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="realisations">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>04</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
            br: () => <br />,
          })}
        </h2>

        <div className="grid grid-cols-6 gap-5">
          {cases.map((c, i) => (
            <div key={c.id} className={`${c.span} cursor-pointer transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 reveal`}>
              <div className={`aspect-[4/3] ${c.bgClass} border border-border rounded-2xl relative overflow-hidden mb-4 transition-all duration-300 flex items-center justify-center hover:border-primary hover:shadow-[0_14px_30px_rgba(20,24,64,0.08)]`}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full">
                    {caseIllustrations[i]}
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-ink-dim mb-2.5">
                <span className="text-secondary font-medium">{t(`${c.id}.tag`)}</span>
                <span>{t(`${c.id}.year`)}</span>
              </div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-tight mb-2 text-primary">
                {t.rich(`${c.id}.title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm text-ink-dim leading-normal">{t(`${c.id}.client`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
