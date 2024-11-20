/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'cupcake',
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#A855F7',
        },
      },
    ],
  },
}
