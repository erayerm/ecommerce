/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "w-[240px]",
    "h-[427px]",
    "h-[300px]",
    "bg-[#252B42]",
    "text-[#FFFFFF]",
    "text-[#252B42]"
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"'],
      },
    },
  },
  plugins: [],
}