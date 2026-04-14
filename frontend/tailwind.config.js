import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#EFEBE9',
        primary: '#9CAF88',
        'primary-dark': '#8a9d76',
        heading: '#548C8C',
        'heading-muted': 'rgba(84,140,140,0.7)',
        accent: '#D7CCC8',
      },
      fontFamily: {
        heading: ['Merriweather', 'Garamond', 'serif'],
        body: ['Roboto', 'Open Sans', 'Lato', 'sans-serif'],
        button: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
}
