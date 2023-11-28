/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      borderRadius: {
        2: '0.5rem',
        4: '1rem'
      }
    },
  },
  plugins: [],
}
