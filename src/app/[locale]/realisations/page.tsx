"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryFilter from "@/components/realisations/CategoryFilter";
import ProjectCard from "@/components/realisations/ProjectCard";

export default function RealisationsPage() {
  const t = useTranslations("realisations_page");
  const tServices = useTranslations("services_data");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20">
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
            <ProjectCard key={project.id} title={project.id} description="" image={project.image} tags={project.tags} />
          ))}
        </div>
      </div>
    </section>
  );
}
