/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Custom blue
        secondary: '#64748b', // Neutral gray
        accent: '#f59e0b', // Warm yellow
      },
    },
  },
  plugins: [],
};


