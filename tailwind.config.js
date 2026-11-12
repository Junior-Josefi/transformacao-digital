/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adventist: {
          blue: {
            DEFAULT: '#1A4A7A', // Azul Adventist Oficial
            50: '#F0F5FA',
            100: '#DCE7F3',
            200: '#B6D1E8',
            300: '#8BB6DC',
            400: '#5390C7',
            500: '#2A6BAC',
            600: '#1A4A7A', // Base
            700: '#153C63',
            800: '#112F4E',
            900: '#0B2036',
          },
          cyan: {
            DEFAULT: '#00B5CC', // Azul Claro Adventist
            light: '#0DE3FF',
            dark: '#0097AA',
          },
          earthRed: '#B25752',
          mossGreen: '#63743A',
          oliveLight: '#A1BA66',
          petrolBlue: '#3A697A',
          softBlue: '#65AAC3',
          mediumBlue: '#5A80B8',
          deepBlue: '#344C72',
        }
      },
      fontFamily: {
        heading: ['"Work Sans"', 'sans-serif'],
        subheading: ['"Lato"', 'sans-serif'],
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

