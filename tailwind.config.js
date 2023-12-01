const plugin = require('tailwindcss')

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
      backgroundImage: {
        'texture-grip-dark': 'url(static/textures/grip-dark.png)',
        'texture-grip-light': 'url(static/textures/grip-light.png)',
        'texture-noise-dark': 'url(static/textures/noise-dark.png)',
        'texture-noise-light': 'url(static/textures/noise-light.png)'
      },
      colors: {
        'plastic-white': '#E0E0E0',
        'plastic-black': '#222222'
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
