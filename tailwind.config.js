/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'aptitud-1': '#328766',
                'aptitud-2': '#51f232',
                'aptitud-3': '#c70f68',
                'aptitud-4': '#f95211',
            },
        },
    },
    plugins: [],
}
