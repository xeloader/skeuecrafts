const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/stories/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        ep133: 'Technotype, monospace'
      },
      textShadow: {
        '2xs': '0 0.5px 0.2px rgba(0,0,0,0.2)'
      },
      gridTemplateColumns: {
        20: 'repeat(20, minmax(0, 1fr))',
        22: 'repeat(22, minmax(0, 1fr))'
      },
      gridTemplateRows: {
        30: 'repeat(30, minmax(0, 1fr))'
      },
      backgroundImage: {
        'texture-grip-dark': 'url(static/textures/grip-dark.png)',
        'texture-grip-light': 'url(static/textures/grip-light.png)',
        'texture-noise-dark': 'url(static/textures/noise-dark.png)',
        'texture-noise-light': 'url(static/textures/noise-light.png)'
      },
      colors: {
        'plastic-white': '#EBEBEB',
        'plastic-black': '#222222',
        ep133: {
          dark: '#1A1A1A',
          orange: '#F72900',
          gray: '#BFBEBD',
          'gray-dark': '#555352',
          'gray-light': '#CAC9C9'
        }

      },
      borderRadius: {
        2: '0.5rem',
        4: '1rem'
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      )
    })
  ]
}
