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
        background: "#0C0E12",
        surface: "#161920",
        "surface-light": "#1E222B",
        accent: "#C4935A",
        "accent-hover": "#D4A36A",
        "accent-dark": "#A67A45",
        border: "#2A2E38",
        "text-primary": "#F0F0F0",
        "text-secondary": "#9CA3AF",
        "text-muted": "#6B7280",
      },
      fontFamily: {
        serif: ["Instrument Serif", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
