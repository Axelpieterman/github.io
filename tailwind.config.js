/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'ritz-brown': 'rgb(143, 57, 36)',
        'ritz-cream': '#f9f3e6',
      },
      fontFamily: {
        'bahiana': ['Bahiana', 'cursive'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.filter-ritz-brown': {
          filter: 'brightness(0) saturate(100%) invert(24%) sepia(56%) saturate(638%) hue-rotate(333deg) brightness(92%) contrast(90%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

