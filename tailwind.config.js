/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        'scale-up': 'scaleUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'bounceIn 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
        'bounce-soft': 'bounceSoft 4s ease-in-out infinite',
        'fade-scale': 'fadeScale 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.96) translateY(20px)',
          },
          '60%': {
            opacity: '0.8',
            transform: 'scale(1.02) translateY(-5px)',
          },
          '80%': {
            opacity: '0.95',
            transform: 'scale(0.98) translateY(2px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        fadeUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleUp: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(30px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-30px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        bounceIn: {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.02)',
            opacity: '0.8',
          },
          '75%': {
            transform: 'scale(0.99)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        bounceSoft: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '50%': {
            transform: 'translateY(-10px)',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      utilities: {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
    },
  },
  plugins: [],
  variants: {
    extend: {},
  }
}