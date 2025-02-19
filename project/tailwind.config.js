/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a237e', // Navy blue
          hover: '#004d40', // Dark green
        },
        accent: {
          DEFAULT: '#ff9800', // Orange
          hover: '#f57c00',
        }
      }
    },
  },
  plugins: [],
};