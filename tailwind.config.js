/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rethink: ['"Rethink Sans"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        deep: 'var(--bg-deep)',
        card: 'var(--bg-card)',
        'card-hover': 'var(--bg-card-hover)',
        cyan: {
          DEFAULT: 'var(--accent-cyan)',
          glow: 'var(--accent-cyan-glow)',
        },
        violet: {
          DEFAULT: 'var(--accent-violet)',
          glow: 'var(--accent-violet-glow)',
        },
      },
    },
  },
  plugins: [],
};
