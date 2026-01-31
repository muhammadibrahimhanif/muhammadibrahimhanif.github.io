/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./artikel.html", "./script.js"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      screens: {
        xs: "375px",
      },
      colors: {
        primary: {
          50: "#E6F2FF",
          100: "#CCE5FF",
          200: "#99CCFF",
          300: "#66B2FF",
          400: "#3399FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          800: "#002966",
          900: "#001433",
        },
        cyan: {
          400: "#00D4FF",
          500: "#00B8E6",
        },
        gold: {
          400: "#FFB800",
          500: "#FF8800",
        },
      },
    },
  },
  plugins: [],
};
