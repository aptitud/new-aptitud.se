/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'aptitud-pink-red': '#F65058',
                'aptitud-cerise': '#DB0A5B',
                'aptitud-orange': '#DC4405',
                'aptitud-yellow': '#F1B434',
                'aptitud-pink': '#784E90',
                'aptitud-green': '#67823A',
                'aptitud-petrol': '#4E87A0',
                'aptitud-blue_green': '#008CA0',
                'aptitud-blue_dim': '#3E6991',
            },
        },
    },
    plugins: [],
}
