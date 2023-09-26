/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-unbounded)']
      },
    },
    colors: {
      gray: '#262526',
      gray_1: '#26252699',
      gray_2: '#26252670',
      brown: '#A67F38',
      brown_2: '#A67841', 
      brown_3: '#F2C894',
      brown_4: '#A67841CC',
      white: '#FFF',
      white_2: '#F2E4C9',

      yellow: '#ffcc33'
    }
  },
  plugins: [],
}
