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
      animation: {
        'open-up': 'open-up 0.5s ease',
        float: 'float 10s ease infinite',
      },
      keyframes: {
        'open-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '100',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(-7%)',
          },
          '50%': {
            transform: 'translateY(7%)',
          },
        },
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
