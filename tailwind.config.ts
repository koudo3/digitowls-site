import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141840",
        "primary-soft": "#1C2150",
        secondary: "#2AB0C1",
        "secondary-soft": "#5BC5D3",
        "secondary-wash": "#E0F4F7",
        accent: "#F8BE1C",
        "accent-soft": "#FFD657",
        ink: "#1F2937",
        "ink-dim": "#6B7280",
        surface: "#F9FAFB",
        "surface-2": "#F3F4F7",
        border: "#E5E7EB",
        "border-strong": "#D1D5DB",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        brand: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1400px",
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        "orbit-pulse": "orbit-pulse 3s ease-in-out infinite",
        "bar-dance": "bar-dance 1.3s ease-in-out infinite",
        "scan-sweep": "scan-sweep 6s ease-in-out infinite",
        "metric-float": "metric-float 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-5%, 3%) scale(1.05)" },
          "66%": { transform: "translate(3%, -3%) scale(0.95)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        blink: {
          "50%": { opacity: "0.3" },
        },
        "orbit-pulse": {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "bar-dance": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1.3)" },
        },
        "scan-sweep": {
          "0%, 8%": { top: "8%", opacity: "0" },
          "12%": { opacity: "0.95" },
          "48%": { top: "92%", opacity: "0.95" },
          "56%, 100%": { top: "92%", opacity: "0" },
        },
        "metric-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 32px))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
