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
        forest: {
          DEFAULT: "#183D2B",
          dark: "#0E2316",
          light: "#24553D",
          deep: "#09170E",
        },
        natural: {
          DEFAULT: "#356B48",
          dark: "#295438",
          light: "#4B8762",
        },
        sage: {
          DEFAULT: "#A8B99A",
          light: "#CAD7BF",
          muted: "#E4ECE0",
          soft: "#F0F4ED",
        },
        ivory: {
          DEFAULT: "#F3F0E6",
          canvas: "#FAF8F3",
          card: "#F4F1E8",
          border: "#E7E2D3",
        },
        gold: {
          DEFAULT: "#D6A85F",
          light: "#E3BE7E",
          dark: "#BC8F47",
          soft: "#F8F1E4",
        },
      },
      fontFamily: {
        sans: ["var(--font-readex-pro)", "system-ui", "sans-serif"],
        arabic: ["var(--font-readex-pro)", "var(--font-alexandria)", "system-ui", "sans-serif"],
        english: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-readex-pro)", "serif"],
      },
      boxShadow: {
        editorial: "0 12px 32px -8px rgba(24, 61, 43, 0.07)",
        "editorial-lg": "0 24px 48px -12px rgba(24, 61, 43, 0.12)",
        "editorial-sm": "0 4px 16px -4px rgba(24, 61, 43, 0.05)",
      },
      borderRadius: {
        editorial: "1.25rem",
        "editorial-lg": "1.75rem",
        "editorial-xl": "2.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
