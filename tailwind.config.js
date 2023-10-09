/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'aptitud-overlay': 'var(--aptitud-overlay)',
        'aptitud-salmon': 'var(--aptitud-purple)',
        'aptitud-cerise': 'var(--aptitud-cerise)',
        'aptitud-orange': 'var(--aptitud-orange)',
        'aptitud-yellow': 'var(--aptitud-yellow)',
        'aptitud-purple': 'var(--aptitud-purple)',
        'aptitud-green': 'var(--aptitud-green)',
        'aptitud-petrol': 'var(--aptitud-petrol)',
        'aptitud-blue_green': 'var(--aptitud-blue_green)',
        'aptitud-blue_dim': 'var(--aptitud-blue_dim)',
        'aptitud-light-grey': 'var(--aptitud-light-grey)',
        'aptitud-dark-grey': 'var(--aptitud-dark-grey)',
        'aptitud-very-light-grey': 'var(--aptitud-very-light-grey)',
        'aptitud-transparent': 'var(--aptitud-transparent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
