/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main1: "url('./assets/img-openmind1.png')",
        main2: "url('./assets/img-openmind2.png')",
      },
    },
  },
  plugins: [],
};
