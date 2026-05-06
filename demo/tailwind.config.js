export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /left-\[.*px\]/,
      variants: ['absolute']
    }
  ],
  theme: {
    extend: {
      boxShadow: {
        fruitwhite: 'var(--fruitwhite-shadow)',
      },
      backgroundImage: {
        'fruitblack-400': 'var(--fruitblack-gradient)',
      },
      colors: {
        fruitwhite: {
          50: '#ffffffb3',
          400: '#dadada',
        },
        fruitgreen: {
          100: '#91eba0',
          200: '#6de48b',
          300: '#4bd175',
          400: '#3cda56',
          500: '#36c74e',
          600: '#29ab3e',
          700: '#1c8b2e',
          800: '#0f6b1e',
          900: '#003c0e',
        }
      }
    }
  }
}