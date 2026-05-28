import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        coal: "#0d0d0c",
        graphite: "#191715",
        bone: "#f1e9dc",
        haze: "#a79d90",
        smoke: "#6f6860",
        signal: "#ff4d3d",
        mint: "#8ee6c8",
        gold: "#d6a84f",
      },
      fontFamily: {
        sans: [
          "var(--font-aeonik)",
          "Aeonik",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-aeonik)",
          "Aeonik",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        clash: [
          "var(--font-clash-display)",
          "Clash Display",
          "Aeonik",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
