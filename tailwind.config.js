/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'tablet-1': '768px',
      'tablet-2': '868px',
      pc: '1280px',
      md: '768px',
      xl: '1280px',
    },
    extend: {
      backgroundImage: {
        main1: "url('./assets/img-openmind1.png')",
        main2: "url('./assets/img-openmind2.png')",
      },
      backgroundPosition: {
        'center-bottom-1': '50% 30%',
        'center-bottom-2': '50% 120%',
        'center-bottom-3': '50% -500%',
      },
    },
  },
  plugins: [],
};
