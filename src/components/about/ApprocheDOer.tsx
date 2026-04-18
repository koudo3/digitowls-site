"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const step = (delay: number) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.5, delay },
});

export default function ApprocheDOer() {
  const t = useTranslations("approche_doer");

  return (
    <AnimatedSection className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          {t("title")} <span className="text-secondary">{t("title_highlight")}</span>
        </h3>
        <p className="text-white/70 text-lg italic">{t("subtitle")}</p>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-4 mb-12">
        {/* Use Case */}
        <motion.div {...step(0.2)} className="relative bg-blue-600 text-white font-heading font-bold px-8 py-4 rounded-l-lg text-center min-w-[240px] text-xl py-6 px-10">
          {t("step_1")}
          <div className="hidden lg:block absolute -right-4 top-0 h-full w-4">
            <svg viewBox="0 0 20 60" className="h-full w-full" preserveAspectRatio="none">
              <polygon points="0,0 20,30 0,60" fill="#2563eb" />
            </svg>
          </div>
        </motion.div>

        {/* Arrow mobile */}
        <motion.svg {...step(0.4)} className="lg:hidden w-6 h-8 text-secondary" viewBox="0 0 24 32" fill="currentColor">
          <polygon points="4,0 20,0 20,20 24,20 12,32 0,20 4,20" />
        </motion.svg>

        {/* Arrow desktop */}
        <motion.svg {...step(0.4)} className="hidden lg:block w-10 h-8 text-secondary shrink-0" viewBox="0 0 32 24" fill="currentColor">
          <polygon points="0,4 20,4 20,0 32,12 20,24 20,20 0,20" />
        </motion.svg>

        {/* POC / Experimentation */}
        <motion.div {...step(0.6)} className="relative flex flex-col items-center">
          <div className="bg-secondary text-primary font-heading font-bold px-10 py-4 rounded-lg text-center min-w-[360px] md:min-w-[480px] text-xl py-6 px-12">
            {t("step_2")}
          </div>
          {/* Iterations loop */}
          <div className="mt-4 flex items-center gap-2">
            <motion.svg
              className="w-20 h-20 text-secondary"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <path d="M12 24c0-6.6 5.4-12 12-12s12 5.4 12 12" strokeLinecap="round" />
              <path d="M36 24c0 6.6-5.4 12-12 12s-12-5.4-12-12" strokeLinecap="round" />
              <polygon points="36,18 36,28 42,23" fill="currentColor" stroke="none" />
              <polygon points="12,28 12,18 6,23" fill="currentColor" stroke="none" />
            </motion.svg>
            <motion.span
              className="text-secondary font-heading font-bold italic text-xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("iterations")}
            </motion.span>
          </div>
        </motion.div>

        {/* Arrow desktop */}
        <motion.svg {...step(0.8)} className="hidden lg:block w-10 h-8 text-secondary shrink-0" viewBox="0 0 32 24" fill="currentColor">
          <polygon points="0,4 20,4 20,0 32,12 20,24 20,20 0,20" />
        </motion.svg>

        {/* Arrow mobile */}
        <motion.svg {...step(0.8)} className="lg:hidden w-6 h-8 text-secondary" viewBox="0 0 24 32" fill="currentColor">
          <polygon points="4,0 20,0 20,20 24,20 12,32 0,20 4,20" />
        </motion.svg>

        {/* Industrialisation */}
        <motion.div {...step(1.0)} className="relative bg-blue-600 text-white font-heading font-bold px-8 py-4 rounded-r-lg text-center min-w-[260px] text-xl py-6 px-10">
          <div className="hidden lg:block absolute -left-4 top-0 h-full w-4">
            <svg viewBox="0 0 20 60" className="h-full w-full" preserveAspectRatio="none">
              <polygon points="0,30 20,0 20,60" fill="#2563eb" />
            </svg>
          </div>
          {t("step_3_line1")}
          <br />
          {t("step_3_line2")}
        </motion.div>
      </div>

    </AnimatedSection>
  );
}
