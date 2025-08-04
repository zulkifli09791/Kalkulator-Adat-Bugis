// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bugis: {
          marun: '#8B0000',
          emas: '#D4AF37',
          hitam: '#121212',
          putih: '#F8F8F8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        adat: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}