/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*/*.{html, js'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
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
