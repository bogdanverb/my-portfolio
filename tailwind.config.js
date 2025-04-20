/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // Добавьте, если используете src/
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo-500
        accent: '#FF5733', // замените на нужный вам цвет
        secondary: '#0f172a', // Slate-900
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      dropShadow: {
        glow: '0 0 8px #6366f1, 0 0 16px #FF5733',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 #6366f1' },
          '50%': { boxShadow: '0 0 24px 8px #FF5733' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.translate-y-8': {
          '--tw-translate-y': '2rem',
          transform: 'var(--tw-transform)',
        },
      })
    }),
  ],
}