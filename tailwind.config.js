/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }
  
        'md': '960px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
  
      fontFamily: {
        'progmono': ['JetBrains Mono', 'monospace'],
        'ubuntu': ['Ubuntu', 'sans-serif']
      },
      height: {
        '1/12': '8.333333%',
        '10/12': '83.333333%'
      }
    },
  },
  plugins: [],
}