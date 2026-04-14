import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#EFEBE9',
                primary: '#9CAF88',
                heading: '#548C8C',
                accent: '#D7CCC8',
            },
            fontFamily: {
                heading: ['Merriweather', 'Garamond', 'serif'],
                body: ['Roboto', 'Open Sans', 'sans-serif'],
                button: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [daisyui],
};
