import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        porcelana: "#EFF2ED",
        folha: "#1D3A28",
        coentro: "#35704A",
        carvao: "#17110E",
        brasa: "#E8642A",
        fumaca: "#6B7A6E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        corpo: ["var(--font-corpo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
