/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'aptitud-pink-red': 'var(--aptitud-pink)',
        'aptitud-cerise': 'var(--aptitud-cerise)',
        'aptitud-orange': 'var(--aptitud-orange)',
        'aptitud-yellow': 'var(--aptitud-yellow)',
        'aptitud-pink': 'var(--aptitud-pink)',
        'aptitud-green': 'var(--aptitud-green)',
        'aptitud-petrol': 'var(--aptitud-petrol)',
        'aptitud-blue_green': 'var(--aptitud-blue_green)',
        'aptitud-blue_dim': 'var(--aptitud-blue_dim)',
        'aptitud-light-grey': 'var(--aptitud-light-grey)',
        'aptitud-very-light-grey': 'var(--aptitud-very-light-grey)',
      },
    },
  },
  plugins: [],
}
