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
        'float-fast': 'float 5s ease infinite',
        rotate: 'rotate 2s ease infinite',
        'to-left': 'to-left 1s ease infinite',
        'move-right-up': 'move-right-up 0.75s ease forwards',
        'move-right-down': 'move-right-down 0.75s ease forwards',
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
        rotate: {
          '0%, 100%': {
            transform: 'rotate(20deg)',
          },
          '50%': {
            transform: 'rotate(-20deg)',
          },
        },
        'to-left': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '85%': {
            transform: 'translateX(-10%)',
          },
        },
        'move-right-up': {
          '0%': {
            transform: 'translate(0 0)',
          },
          '40%': {
            transform: 'translateX(30px)',
          },
          '100%': {
            transform: 'translate(10px, -40px)',
          },
        },
        'move-right-down': {
          '0%': {
            transform: 'translate(10px, -40px)',
          },
          '40%': {
            transform: 'translateX(30px)',
          },
          '100%': {
            transform: 'translate(0 0)',
          },
        },
      },
      backgroundImage: {
        section: 'url(../images/backgrounds/section-bg.jpg)',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-exc-last', '& > *:not(:last-child)');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
