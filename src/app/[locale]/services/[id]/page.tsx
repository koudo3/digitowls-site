"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import ServiceBlock from "@/components/services/ServiceBlock";

export default function ServicePage() {
  const params = useParams<{ id: string }>();
  const service = services.find((s) => s.id === params.id);
  if (!service) notFound();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceBlock service={service} reversed={false} />
      </div>
    </section>
  );
}
