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
    "text-[#252B42]",
    "bg-[#23A6F0]",
    "bg-[#2DC071]",
    "bg-[#E77C40]",
    "bg-[#252B42]",
    "text-red-500"
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"'],
      },
    },
    colors: {
      main: "#252B42",
      gray: "#737373",
      blue: "#23A6F0"
    }
  },
  plugins: [],
}

