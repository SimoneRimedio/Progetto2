/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // Impostazione della modalità scura
  fontFamily: {
    customFont: ['Poppins'], // Definizione di un font personalizzato
  },
};
