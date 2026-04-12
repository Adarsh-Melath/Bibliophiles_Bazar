/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
}