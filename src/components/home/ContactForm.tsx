"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { COUNTRY_CODES } from "@/data/countryCodes";

const JOB_TITLES = [
  "CEO / Président",
  "CTO / Directeur technique",
  "CIO / DSI",
  "VP Ingénierie",
  "VP Opérations",
  "Directeur / Manager IT",
  "Directeur / Manager Innovation",
  "Chef de produit",
  "Développeur / Ingénieur",
  "Data Scientist / Analyste",
  "Consultant",
  "Autre",
];

const INDUSTRIES = [
  { value: "banque_services_financiers", label: "Banque & Services financiers" },
  { value: "assurance", label: "Assurance" },
  { value: "fintech", label: "Fintech" },
  { value: "sante_pharmaceutique", label: "Santé & Pharmaceutique" },
  { value: "technologie_saas", label: "Technologie & SaaS" },
  { value: "telecommunications", label: "Télécommunications" },
  { value: "energie_ressources_naturelles", label: "Énergie & Ressources naturelles" },
  { value: "commerce_detail_ecommerce", label: "Commerce de détail & E-commerce" },
  { value: "manufacturier_industriel", label: "Manufacturier & Industriel" },
  { value: "transport_logistique", label: "Transport & Logistique" },
  { value: "immobilier_construction", label: "Immobilier & Construction" },
  { value: "education_formation", label: "Éducation & Formation" },
  { value: "services_professionnels_conseil", label: "Services professionnels & Conseil" },
  { value: "medias_divertissement", label: "Médias & Divertissement" },
  { value: "administration_publique_gouvernement", label: "Administration publique & Gouvernement" },
  { value: "agriculture_agroalimentaire", label: "Agriculture & Agroalimentaire" },
  { value: "aerospatiale_defense", label: "Aérospatiale & Défense" },
  { value: "automobile", label: "Automobile" },
  { value: "ong_organisme_non_lucratif", label: "ONG & Organisme à but non lucratif" },
  { value: "autre", label: "Autre" },
];

export default function ContactForm() {
  const t = useTranslations("contact_page");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phoneNumber = formData.get("phone") as string;
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: `${countryCode.code} ${phoneNumber}`,
      company: formData.get("company") as string,
      job_title: formData.get("job_title") as string,
      industry: formData.get("industry") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-[15px] outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors";
  const selectClass =
    "w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white text-[15px] outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          required
          placeholder={t("name")}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t("email")}
          className={inputClass}
        />
        <div className="flex gap-2">
          <select
            value={`${countryCode.flag} ${countryCode.label} ${countryCode.code}`}
            onChange={(e) => {
              const selected = COUNTRY_CODES.find(
                (c) => `${c.flag} ${c.label} ${c.code}` === e.target.value
              );
              if (selected) setCountryCode(selected);
            }}
            className="bg-white/[0.06] border border-white/15 rounded-lg px-2 py-3 text-white text-[13px] outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-colors appearance-none cursor-pointer w-[110px] shrink-0"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={`${c.label}-${c.code}`} value={`${c.flag} ${c.label} ${c.code}`} className="bg-[#1a1a2e] text-white">
                {c.flag} {c.label} {c.code}
              </option>
            ))}
          </select>
          <input
            name="phone"
            type="tel"
            required
            placeholder={t("phone")}
            className={`${inputClass} flex-1`}
          />
        </div>
        <input
          name="company"
          type="text"
          required
          placeholder={t("company")}
          className={inputClass}
        />
        <div className="relative">
          <select
            name="job_title"
            required
            defaultValue=""
            className={`${selectClass} ${!status ? "text-white/40" : ""}`}
          >
            <option value="" disabled className="bg-[#1a1a2e] text-white/40">
              {t("job_title")}
            </option>
            {JOB_TITLES.map((title) => (
              <option key={title} value={title} className="bg-[#1a1a2e] text-white">
                {title}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
            ▼
          </div>
        </div>
        <div className="relative">
          <select
            name="industry"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled className="bg-[#1a1a2e] text-white/40">
              {t("industry")}
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind.value} value={ind.value} className="bg-[#1a1a2e] text-white">
                {ind.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
            ▼
          </div>
        </div>
        <input
          name="subject"
          type="text"
          required
          placeholder={t("subject")}
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder={t("message")}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center justify-center gap-2.5 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "..." : t("submit")}
      </button>

      {status === "success" && (
        <p className="text-green-400 text-sm text-center">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{t("error")}</p>
      )}
    </form>
  );
}
