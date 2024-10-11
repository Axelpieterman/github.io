const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        'ritz-brown': 'rgb(143, 57, 36)',
        'ritz-cream': '#f9f3e6',
      },
      fontFamily: {
        'bahiana': ['Bahiana', 'cursive'],
      },
      keyframes: {
        clickPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        clickPulse: 'clickPulse 0.3s ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        slideUp: 'slideUp 0.5s ease-out forwards',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.filter-ritz-brown': {
          filter: 'brightness(0) saturate(100%) invert(24%) sepia(56%) saturate(638%) hue-rotate(333deg) brightness(92%) contrast(90%)',
        },
        '.btn-ritz': {
          '@apply inline-block bg-ritz-brown text-ritz-cream py-3 px-6 text-xl font-bold rounded transition-all duration-300 hover:bg-opacity-80 hover:scale-105 active:animate-clickPulse': {},
        },
        '.btn-ritz-outline': {
          '@apply inline-block border-2 border-ritz-cream text-ritz-cream py-3 px-6 text-xl font-bold rounded transition-all duration-300 hover:bg-ritz-cream hover:text-ritz-brown hover:scale-105 active:animate-clickPulse': {},
        },
        '.btn-ritz-inverse': {
          '@apply inline-block bg-ritz-cream text-ritz-brown py-3 px-6 text-xl font-bold rounded transition-all duration-300 hover:bg-opacity-80 hover:scale-105 active:animate-clickPulse': {},
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'active'])
    }
  ],
}

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  window.tailwindConfig = tailwindConfig;
}

// Check if we're in a Node.js environment
if (typeof module !== 'undefined') {
  module.exports = tailwindConfig;
}

