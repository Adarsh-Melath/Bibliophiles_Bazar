import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // New homepage design system
        paper: '#FDFBF7',
        shelf: '#2C1E11',
        burgundy: '#800020',
        'burgundy-dark': '#600018',
        'shelf-light': '#3C2A21',

        // Vendor dashboard tokens (must keep)
        offwhite: '#EFEBE9',
        teal: '#548C8C',
        sage: '#9CAF88',
        'sage-dark': '#7a9668',
        'tan-dark': '#b8a9a4',

        // Shared tokens
        tan: '#D7CCC8',
        primary: '#800020',
        background: '#FDFBF7',
        heading: '#2C1E11',

        // Legacy library tokens (auth/user/admin pages)
        'primary-dark': '#8a9d76',
        accent: '#D7CCC8',
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
