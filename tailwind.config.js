/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'aptitud-gradient': `linear-gradient(to right, ${theme('colors.aptitud-cerise')}0.5%,${theme(
          'colors.aptitud-salmon'
        )}20%,${theme('colors.aptitud-orange-dark')}75%,${theme('colors.aptitud-orange')}100%)`,
      }),
      colors: {
        'aptitud-overlay': 'var(--aptitud-overlay)',
        'aptitud-salmon': 'var(--aptitud-salmon)',
        'aptitud-cerise': 'var(--aptitud-cerise)',
        'aptitud-orange': 'var(--aptitud-orange)',
        'aptitud-orange-dark': 'var(--aptitud-orange-dark)',
        'aptitud-yellow': 'var(--aptitud-yellow)',
        'aptitud-purple': 'var(--aptitud-purple)',
        'aptitud-green': 'var(--aptitud-green)',
        'aptitud-petrol': 'var(--aptitud-petrol)',
        'aptitud-blue_green': 'var(--aptitud-blue_green)',
        'aptitud-blue_green-rgba': 'var(--aptitud-blue_green-rgba)',
        'aptitud-blue_dim': 'var(--aptitud-blue_dim)',
        'aptitud-light-grey': 'var(--aptitud-light-grey)',
        'aptitud-dark-grey': 'var(--aptitud-dark-grey)',
        'aptitud-very-light-grey': 'var(--aptitud-very-light-grey)',
        'aptitud-transparent': 'var(--aptitud-transparent)',
      },
      fontFamily: {
        shantell: ['var(--font-shantell-sans)'],
      },
    },
  },
  plugins: [],
}
