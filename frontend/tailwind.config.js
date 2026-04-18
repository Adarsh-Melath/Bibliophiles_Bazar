import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Existing library tokens
        background: '#EFEBE9',
        primary: '#9CAF88',
        'primary-dark': '#8a9d76',
        heading: '#548C8C',
        'heading-muted': 'rgba(84,140,140,0.7)',
        accent: '#D7CCC8',
        // Vendor dashboard tokens
        offwhite: '#EFEBE9',
        teal: '#548C8C',
        sage: '#9CAF88',
        'sage-dark': '#7a9668',
        tan: '#D7CCC8',
        'tan-dark': '#b8a9a4',
      },
      fontFamily: {
        heading: ['Merriweather', 'Garamond', 'serif'],
        body: ['Roboto', 'Open Sans', 'Lato', 'sans-serif'],
        button: ['Montserrat', 'sans-serif'],
        label: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(84, 140, 140, 0.10)',
      },
    },
  },
  plugins: [daisyui],
}
