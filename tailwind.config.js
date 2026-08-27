/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Figma variable set — Grey ramp
        grey: {
          100: '#F7FAFC',
          150: '#ECEFF2',
          200: '#D9DFE6',
          300: '#C6CED9',
          400: '#B3BECD',
          500: '#A0AEC0',
          600: '#808B9A',
          700: '#606873',
          800: '#39434F',
          900: '#202326',
        },
        brand: { 100: '#D1E6FF', 500: '#1B85F3' },
        sky: { 100: '#DCF0FF' },
        accent: { 100: '#FFEEC6', 500: '#FFC542', 600: '#F5BA41', 700: '#E6B13B', 900: '#997628' },
        surface: '#FAFAFA',
        ink: '#212134',
      },
      borderRadius: { card: '14px', tile: '16px', sheet: '26px', pill: '100px' },
      boxShadow: {
        card: '0px 0px 3.75px 0px rgba(12,26,75,0.05), 0px 3px 15px -1.5px rgba(50,50,71,0.02)',
        tile: '0px 0px 5px 0px rgba(12,26,75,0.04), 0px 4px 20px 0px rgba(50,50,71,0.02)',
        sheet: '0px -5px 40px 0px rgba(73,77,90,0.12)',
      },
      maxWidth: { frame: '375px', content: '327px' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: { 'fade-up': 'fade-up .28s cubic-bezier(.22,1,.36,1) both', shimmer: 'shimmer 1.6s infinite' },
    },
  },
  plugins: [],
}
