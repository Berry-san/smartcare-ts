/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border_color: '#D6D6D6',
        text_color: '#232931',
        primary: '#F4F5F9',
        secondary: '#9747FF',
        success: '#34C758',
        warning: '#FF3737',
        current: 'currentColor',
        transparent: 'transparent',
        white: '#FFFFFF',
        gray: '#C4C4C4',
        bluish: '#5750F9',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: [
          'Raleway',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
        mono: [
          'Josefin Sans',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
