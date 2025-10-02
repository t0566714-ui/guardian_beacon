/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./Pages/**/*.{js,ts,jsx,tsx}",
    "./Layout.js/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-purple': '#a855f7',
        'success-green': '#22c55e',
        'danger-red': '#ef4444',
        'warning-yellow': '#f59e0b',
      }
    },
  },
  plugins: [],
}