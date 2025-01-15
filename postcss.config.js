// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),   // Tell PostCSS to use Tailwind CSS
    require('autoprefixer'),   // Add vendor prefixes to CSS properties
  ]
}
