import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'gradient-to-r': 'linear-gradient(to right, #CC9743, #F9CF5E)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        PriGold: "#CC9743",
        Gold0: "#473311",
        Gold1: "#946924",
        Gold2: "#FACE87",
        Gold3: "#FAEAD2",
        GoldenWhite: "#FEFCF7",
        Black1: '#0B102E',
        Black2: '#100C04',
        Blue0: '#000000',
        Blue1: '#8794FA',
        Blue2: '#3D53FA',
        Blue3: '#D2D6FA',
        Blue4: '#111847',
        BlueWhite: '#EAECFF',
        White: '#FFFFFF',
        Gray1: '#B5B5B5',
        Gray2: '#D2C8B7',
        Green1: '#34A853',
        Green2: "#E6F4E7",
        Red1: '#FF3B30',
        Red2: '#FFEBEB',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
