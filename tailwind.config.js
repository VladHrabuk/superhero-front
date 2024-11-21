/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#02CC67',
          dark: '#019955',
          light: '#66FF99',
        },
      },

      animation: {
        'spin-fast': 'spin-fast 1.5s ease-in-out infinite',
        'spin-normal': 'spin-normal 2s ease-in infinite',
        'spin-slow': 'spin-slow 2.5s ease-out infinite',
      },
      keyframes: {
        'spin-fast': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-normal': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      screens: {
        'max-1360': { max: '1360px' },
      },
      minHeight: {
        '90-screen': '90vh',
      },
    },
  },
  plugins: [],
};
