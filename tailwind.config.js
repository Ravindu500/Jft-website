/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jft: {
          red: '#C41E3A',
          'red-dark': '#9B1B30',
          'red-light': '#E85A71',
          navy: '#1A2744',
          'navy-light': '#2A3A5C',
          'navy-dark': '#0F1A2E',
          cream: '#FAF7F2',
          'cream-dark': '#F0EBE3',
          gold: '#D4A84B',
          success: '#2E7D32',
          warning: '#F9A825',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 39, 68, 0.08)',
        'card-hover': '0 8px 30px rgba(26, 39, 68, 0.12)',
      }
    },
  },
  plugins: [],
}
