import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogos from "@/components/home/ClientLogos";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ClientLogos />
      <CtaBanner />
    </>
  );
}
