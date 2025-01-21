/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Ensures the container is always centered (equivalent to mx-auto)
        padding: {
          DEFAULT: '1rem', // Default padding (px-4)
          sm: '1.5rem', // sm:px-6
          lg: '2rem', // lg:px-8
        }
      },
    },
  },
  plugins: [],
}

