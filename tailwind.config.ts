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
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#102a43",
          950: "#0a1929",
        },
        gold: {
          50: "#eef5f0",
          100: "#d5e8dc",
          200: "#acc299",
          300: "#7eb896",
          400: "#4d9468",
          500: "#246b3e",
          600: "#1d5632",
          700: "#164228",
          800: "#0f2e1b",
        },
        civic: {
          blue: "#1e3a5f",
          light: "#2d5a87",
          accent: "#246b3e",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(10,25,41,0.95) 0%, rgba(30,58,95,0.85) 50%, rgba(45,90,135,0.75) 100%)",
        "section-gradient":
          "linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)",
        "dark-gradient":
          "linear-gradient(135deg, #0a1929 0%, #1e3a5f 50%, #243b53 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
