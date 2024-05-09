import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4DA6FF',
        secondary: '#F6F8FE',
        darkgray: '#212121',
        green: '#4DFF8E',
        orange: '#FFC14D',
        red: '#FF4D4D',
      },
    },
  },
  plugins: [],
}
export default config
