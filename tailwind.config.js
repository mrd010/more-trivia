/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,html}'],
  theme: {
    extend: {},
    animation: {
      'pulse-fast': 'pulse 0.5s 3',
      'ping-once': 'ping 1',
    },
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
