import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        black2: "var(--black2)",
      },
      keyframes: {
        'fade-left': {
          "0%": { opacity: "0", transform: 'translateX(20px)' },
          "100%": { opacity: "1", transform: 'translateX(0)' },
        },
        'fade-up': {
          "0%": { opacity: "0", transform: 'translateY(20px)' },
          "100%": { opacity: "1", transform: 'translateY(0)' },
        },
        'fade-down': {
          "0%": { opacity: "0", transform: 'translateY(0)' },
          "100%": { opacity: "1", transform: 'translateY(20px)' },
        }
      },
      animation: {
        'fade-left': "fade-left 0.5s ease-in-out",
        'fade-up': "fade-up 0.5s ease-in-out",
        'fade-down': "fade-down 0.5s ease-in-out"
      },
    },
  },
  plugins: [],
} satisfies Config;
