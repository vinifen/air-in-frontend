/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white-50': 'rgba(255, 255, 255, 0.2)',
      },
      colors: {
        primary: '#575757',
      },
    },
  },
  plugins: [],
}