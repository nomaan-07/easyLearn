const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1640px',
    },
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        Vazir: 'Vazir',
        VazirMedium: 'Vazir Medium',
        VazirBold: 'Vazir Bold',
        VazirLight: 'Vazir Light',
        VazirThin: 'Vazir Thin',
        VazirBlack: 'Vazir Black',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
