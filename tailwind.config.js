import { INTERNAL_FEATURES } from 'tailwindcss/src/lib/setupContextUtils'
import { normalize } from 'tailwindcss/src/util/dataTypes'
import escapeClassName from 'tailwindcss/src/util/escapeClassName'
import plugin from 'tailwindcss/plugin'

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
        14: 'repeat(14, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        22: 'repeat(22, minmax(0, 1fr))',
        44: 'repeat(44, minmax(0, 1fr))'
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
          'blue-50': '#F6F8F7',
          'blue-950': '#0C1416',
          dark: '#1A1A1A',
          orange: '#F72900',
          gray: '#BFBEBD',
          'gray-dark': '#555352',
          'gray-light': '#CAC9C9'
        }

      },
      borderRadius: {
        1: '0.25rem',
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
    }),
    plugin(function ({ addVariant, matchVariant, prefix }) {
      const pseudoVariants = [
        ['active', '&.is-activated'],
        ['hover', '&.is-hovered']
      ].map((variant) => (Array.isArray(variant) ? variant : [variant, `&:${variant}`]))

      for (const [variantName, ...states] of pseudoVariants) {
        for (const state of states) {
          addVariant(variantName, (ctx) => {
            const result = typeof state === 'function' ? state(ctx) : state

            return result
          })
        }
      }

      const variants = {
        group: (_, { modifier }) =>
          modifier
            ? [`:merge(${prefix('.group')}\\/${escapeClassName(modifier)})`, ' &']
            : [`:merge(${prefix('.group')})`, ' &'],
        peer: (_, { modifier }) =>
          modifier
            ? [`:merge(${prefix('.peer')}\\/${escapeClassName(modifier)})`, ' ~ &']
            : [`:merge(${prefix('.peer')})`, ' ~ &']
      }

      for (const [name, fn] of Object.entries(variants)) {
        matchVariant(
          name,
          (value = '', extra) => {
            let result = normalize(typeof value === 'function' ? value(extra) : value)
            console.log('result', result, 'modifier', extra?.modifier, 'name', name)
            if (!result.includes('&')) result = '&' + result

            const [a, b] = fn('', extra)

            let start = null
            let end = null
            let quotes = 0

            for (let i = 0; i < result.length; ++i) {
              const c = result[i]
              if (c === '&') {
                start = i
              } else if (c === "'" || c === '"') {
                quotes += 1
              } else if (start !== null && c === ' ' && !quotes) {
                end = i
              }
            }

            if (start !== null && end === null) {
              end = result.length
            }

            // Basically this but can handle quotes:
            // result.replace(/&(\S+)?/g, (_, pseudo = '') => a + pseudo + b)
            const cut = result.slice(0, start) + a + result.slice(start + 1, end) + b + result.slice(end)
            console.log('return', cut)
            console.log()
            return cut
          },
          {
            values: Object.fromEntries(pseudoVariants),
            [INTERNAL_FEATURES]: {
              respectPrefix: false
            }
          }
        )
      }
    })
  ]
}
