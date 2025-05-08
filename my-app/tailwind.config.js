// ✅ IntelliJ hiểu rõ
const tailwindcssAnimate = require('tailwindcss-animate');

module.exports = {
  darkMode: ['class'],
  important: true,
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {},
  plugins: [
    tailwindcssAnimate,
    require('@tailwindcss/typography')
  ],
};
