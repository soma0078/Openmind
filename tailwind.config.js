/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'tablet-1': '768px',
      'tablet-2': '868px',
      pc: '1280px',
    },
    extend: {
      backgroundImage: {
        main1: "url('./assets/img-openmind1.png')",
        main2: "url('./assets/img-openmind2.png')",
      },
    },
  },
  plugins: [],
};
