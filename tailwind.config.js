/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   'bg': 'var(--color-background)',
      //   'text': 'var(--color-text)',
      //   'primary': 'var(--color-primary)',
      // }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}