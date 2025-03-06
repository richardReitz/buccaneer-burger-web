import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          800: "var(--gray-800)",
          300: "var(--gray-300)",
          100: "var(--gray-100)",
        },
        white: "var(--white)",
        green: {
          primary: "var(--green)",
          light: "var(--green-light)",
        },
        text: {
          white: "var(--text-white)",
          gray: {
            800: "var(--text-gray-800)",
            300: "var(--text-gray-300)",
            100: "var(--text-gray-100)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
