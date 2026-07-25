import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F3F",
        "primary-dark": "#07152B",
        "primary-light": "#15396E",
        accent: "#0D9488",
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },
      boxShadow: {
        card: "0 30px 70px -20px rgba(0,0,0,0.10)",
        "card-hover": "0 20px 60px -20px rgba(0,0,0,0.15)",
        "primary-glow": "0 40px 80px -20px rgba(95,111,255,0.30)",
        "primary-hover": "0 20px 50px -10px rgba(95,111,255,0.40)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill,minmax(200px,1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
