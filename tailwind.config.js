// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        inter: ['Inter', ...fontFamily.sans],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#0056D2',    // Blue for buttons & highlights
        secondary: '#1F2937',  // Grey for text/headings
        accent: '#F9FAFB',     // Light background
        dark: '#111827',       // Darker text/backgrounds
        white: '#FFFFFF',
      },
      
      animation: {
        fadeIn: "fadeIn 1.2s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
