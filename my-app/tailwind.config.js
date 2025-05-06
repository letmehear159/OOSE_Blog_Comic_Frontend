/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  important: true,
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {},
  plugins: [tailwindcssAnimate, require('@tailwindcss/typography')]
}
