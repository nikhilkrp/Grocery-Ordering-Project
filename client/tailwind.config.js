/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#615fff',        // Replace with your desired color
        'primary-dull': '#4b48c9', // Replace with your desired color
      },
    },
  },
  plugins: [],
}

