/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'white-300': '#fdfdfc',
        'white-500': '#efedea',
      }
    },
  },
  plugins: [],
};