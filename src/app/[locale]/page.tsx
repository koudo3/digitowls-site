import ScrollReveal from "@/components/ui/ScrollReveal";
import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProxymSection from "@/components/home/ProxymSection";
import ApprocheDOer from "@/components/about/ApprocheDOer";
import RealisationsSection from "@/components/home/RealisationsSection";
import TeamSection from "@/components/home/TeamSection";
import CareersSection from "@/components/home/CareersSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <ClientLogos />
      <ServicesGrid />
      <ProxymSection />
      <ApprocheDOer />
      <RealisationsSection />
      <TeamSection />
      <CareersSection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}
