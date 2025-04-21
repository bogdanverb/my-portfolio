/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Добавьте, если используете src/
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        "background-secondary": "var(--color-background-secondary)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)", "sans-serif"],
        mono: ["var(--font-family-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      screens: {
        'xs': '360px',  // Маленькие мобильные
        'sm': '640px',  // Стандартный брейкпойнт Tailwind
        'md': '768px',  // Стандартный брейкпойнт Tailwind
        'lg': '1024px', // Стандартный брейкпойнт Tailwind
        'xl': '1280px', // Стандартный брейкпойнт Tailwind
        '2xl': '1536px', // Стандартный брейкпойнт Tailwind
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      }
    },
  },
  plugins: [],
};