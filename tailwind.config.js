/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  darkMode: 'class',
  theme: {
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
