import { notFound } from "next/navigation";
import { services } from "@/data/services";
import ServiceBlock from "@/components/services/ServiceBlock";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) notFound();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceBlock service={service} reversed={false} />
      </div>
    </section>
  );
}
