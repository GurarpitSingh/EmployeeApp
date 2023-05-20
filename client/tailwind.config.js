/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropSepia: {
        25: '.25',
        75: '.75',
      },
      spacing: {
        '128': '38rem',
      }
      
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["winter"],
    base: true,
    utils: true,
    darkTheme: false,
  },
})