/** @type {import('tailwindcss').Config} */
const colors1 = require('./src/styles/colors')
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors:colors1,

      fontFamily:{
        publicSans: ['Public Sans', 'sans-serif'],
        laxend: ['Laxend', 'sans-serif']
      }
    },

  },
  plugins: [],
}

