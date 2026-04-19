"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { services } from "@/data/services";

const serviceIcons = [
  // Conseil & Stratégie
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12l3-3 3 3 6-6 6 6"/><circle cx="6" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/></svg>,
  // Fintech
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="8" cy="15" r="1" fill="currentColor"/><path d="M12 15h5"/></svg>,
  // Prototypage
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>,
  // Formation
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 8l9-5 9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg>,
  // Talents
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="8" r="4"/><path d="M1 22v-2a6 6 0 016-6h4a6 6 0 016 6v2"/><circle cx="18" cy="8" r="3"/><path d="M23 22v-2a4 4 0 00-3-3.87"/></svg>,
  // Audit
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
];

export default function ServicesGrid() {
  const t = useTranslations("services_section");
  const tServices = useTranslations("services_data");
  const locale = useLocale();

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="services">
      <div className="max-w-container mx-auto">
        <div className="section-eyebrow"><span>01</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
            br: () => <br />,
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.id}`}
              className="reveal group bg-white border border-border rounded-[20px] p-7 transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden flex flex-col cursor-pointer hover:border-secondary hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(20,24,64,0.08)] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100"
            >
              <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-secondary-wash to-white border border-border flex items-center justify-center mb-6 transition-all duration-300 text-primary group-hover:bg-primary group-hover:text-accent group-hover:border-primary [&_svg]:w-[26px] [&_svg]:h-[26px]">
                {serviceIcons[i]}
              </div>
              <div className="font-mono text-[11px] text-ink-dim tracking-widest mb-2.5">Service {String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-primary mb-3.5">{tServices(`${service.id}.title`)}</h3>
              <p className="text-sm leading-relaxed text-ink-dim mb-6 flex-1">{tServices(`${service.id}.description`)}</p>
              <span className="self-start font-mono text-xs font-medium text-primary inline-flex items-center gap-2 tracking-widest uppercase py-2 border-b border-transparent group-hover:border-primary group-hover:gap-3.5 transition-all">
                {t("learn_more")} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
