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
    "bg-main",
    "text-[#FFFFFF]",
    "text-main",
    "bg-blue",
    "bg-[#2DC071]",
    "bg-[#E77C40]",
    "bg-main",
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

