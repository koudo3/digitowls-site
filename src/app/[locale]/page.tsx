"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogos from "@/components/home/ClientLogos";
import CtaBanner from "@/components/home/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryFilter from "@/components/realisations/CategoryFilter";
import ProjectCard from "@/components/realisations/ProjectCard";
import MissionSection from "@/components/about/MissionSection";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";
import ContactForm from "@/components/contact/ContactForm";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/data/projects";

export default function HomePage() {
  const t = useTranslations("realisations_page");
  const tServices = useTranslations("services_data");
  const tAbout = useTranslations("about_page");
  const tContact = useTranslations("contact_page");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Hero />

      <div id="services">
        <ServicesGrid />
      </div>

      <ClientLogos />
      <CtaBanner />

      <section id="realisations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("title")} description={t("description")} />
          <CategoryFilter
            categories={categories.map((c) => tServices(`${c}.title`))}
            active={activeCategory === "all" ? "all" : tServices(`${activeCategory}.title`)}
            onSelect={(label) => {
              if (label === "all") { setActiveCategory("all"); } else {
                const cat = categories.find((c) => tServices(`${c}.title`) === label);
                setActiveCategory(cat || "all");
              }
            }}
            allLabel={t("filter_all")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                title={t(`projects.${project.id}.title`)}
                description={t(`projects.${project.id}.description`)}
                image={project.image}
                tags={t.raw(`projects.${project.id}.tags`) as string[]}
                type={t(`projects.${project.id}.type`)}
                date={t(`projects.${project.id}.date`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tAbout("title")} />
          <MissionSection />
          <TeamGrid />
          <ValuesSection />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tContact("title")} description={tContact("description")} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2"><ContactForm /></AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                  <h3 className="font-heading font-bold text-lg">{tContact("info_title")}</h3>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{tContact("phone_label")}</p>
                    <a href="tel:+14384927832" className="text-secondary hover:underline">{tContact("phone_value")}</a>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{tContact("email_label")}</p>
                    <a href="mailto:candidature@digitowls.com" className="text-secondary hover:underline">{tContact("email_value")}</a>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{tContact("address_label")}</p>
                    <p className="text-white/80 whitespace-pre-line">{tContact("address_value")}</p>
                  </div>
                </div>
                <CalendlyEmbed />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
