import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        issca: {
          red: "#D11623",
          "red-hover": "#B0101B",
          "red-light": "#FDF2F3",
          blue: "#1C4E9E",
          "blue-hover": "#153B7A",
          "blue-light": "#EEF4FC",
          navy: "#0F2347",
          "navy-deep": "#091730",
          surface: "#F7F8FB",
          white: "#FFFFFF",
          slate: "#334155",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "r-s": "8px",
        "r-m": "14px",
        "r-l": "22px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 35, 71, 0.05), 0 10px 28px -10px rgba(15, 35, 71, 0.08)",
        "card-hover":
          "0 4px 12px rgba(15, 35, 71, 0.08), 0 20px 40px -14px rgba(15, 35, 71, 0.14)",
        cta: "0 8px 22px -6px rgba(209, 22, 35, 0.48)",
        "cta-hover": "0 12px 28px -6px rgba(209, 22, 35, 0.62)",
      },
    },
  },
  plugins: [],
};

export default config;
