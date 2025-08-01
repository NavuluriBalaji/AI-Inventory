/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rethink: ['"Rethink Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
