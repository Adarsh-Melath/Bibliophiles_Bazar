import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Design System - Premium Editorial
        paper: '#F8F5F0',      // Soft Parchment
        ink: '#1A1A1A',        // Deep Carbon/Ink
        gold: '#D4AF37',       // Muted Luxury Gold
        'gold-dark': '#B8860B',
        velvet: '#8E2D2D',     // Crimson Accent
        
        // Semantic Tokens
        primary: '#1A1A1A',
        secondary: '#D4AF37',
        accent: '#8E2D2D',
        background: '#F8F5F0',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Outfit', 'sans-serif'],
        ui: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 10px 40px -10px rgba(26, 26, 26, 0.1)',
        'premium-hover': '0 20px 50px -12px rgba(26, 26, 26, 0.15)',
        gold: '0 4px 20px -2px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [daisyui],
}
