/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#f9f506',
                'primary-dark': '#dacc05',
                'primary-light': 'rgba(249, 245, 6, 0.3)',
                'bg-light': '#f8f8f5',
                'bg-dark': '#23220f',
                surface: '#ffffff',
                'surface-dark': '#2f2e16',
                'text-main': '#181811',
                'text-secondary': '#8c8b5f',
                'brown-dark': '#3E2723',
                orange: '#E65100',
            },
        },
    },
    plugins: [],
};
