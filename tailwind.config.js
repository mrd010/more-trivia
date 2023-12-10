/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {},
    fontFamily: {
      display: ['Passion One', 'sans-serif'],
    },
    data: {
      correct: 'answer="correct"',
      wrong: 'answer="wrong"',
      na: 'answer="na"',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
