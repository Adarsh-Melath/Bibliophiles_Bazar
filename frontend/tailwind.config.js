import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Design System
        paper: '#FDFBF7',
        shelf: '#2C1E11',
        burgundy: '#800020',
        'burgundy-dark': '#600018',
        'shelf-light': '#3C2A21',

        // Shared Functional Tokens
        primary: '#800020',
        background: '#FDFBF7',
        heading: '#2C1E11',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        ui: ['Montserrat', 'sans-serif'],
        label: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 30px -4px rgba(44, 30, 17, 0.08)',
        shelf: '0 20px 40px -10px rgba(44, 30, 17, 0.2)',
      },
    },
  },
  plugins: [daisyui],
}
