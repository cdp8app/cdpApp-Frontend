import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        Black1: '#0B102E',
        Blue0: '#000000',
        Blue1: '#8794FA',
        Blue2: '#3D53FA',
        Blue3: '#D2D6FA',
        Blue4: '#111847',
        BlueWhite: '#EAECFF',
        White: '#FFFFFF',
        Gray1: '#B5B5B5',
        Green1: '#34A853'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
