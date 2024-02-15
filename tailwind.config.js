/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "h-[427px]",
    "h-[300px]"
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"'],
      },
    },
    colors: {
      main: "#252B42",
      'light-gray-1': "#FAFAFA",
      'muted-text-color': "#BDBDBD",
      gray: "#737373",
      'light-blue': "#8EC2F2",
      'primary-blue': "#23A6F0",
      'success-green': "#2DC071",
      'dark-green': "#23856D"
    },
    lineHeight: {
      '7.5': '30px',
      '8': '24px',
      '20': '80px',
    },
    maxWidth: {
      'page-content': '1050px',
    },
    fontSize: {
      '2xl': '24px',
      '6xl': '58px'
    },
    borderWidth: {
      '1': '1px'
    }
  },
  plugins: [],
}

