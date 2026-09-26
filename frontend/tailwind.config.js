/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/config/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#12304A',
          dark: '#0B1E2F',
          light: '#1D4569',
        },
        govblue: {
          DEFAULT: '#1D5D8F',
          light: '#2B7AB8',
        },
        saffron: {
          DEFAULT: '#C9822B',
          light: '#E0983D',
        },
        govgreen: '#237A57',
        govamber: '#A96500',
        govred: '#A52A2A',
        surface: '#FFFFFF',
        background: '#F5F7F9',
        border: '#D7DEE5',
        muted: '#5E6B76',
        text: '#17212B',
      },
    },
  },
  plugins: [],
};
