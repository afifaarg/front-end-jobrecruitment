/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0866FF', // Main blue
          light: '#5A96FF',   // Lighter blue for hover or accents
          dark: '#033D9A',    // Darker blue for contrast
        },
        secondary: {
          DEFAULT: '#F3F4F6', // Light gray background
          text: '#333333',    // Dark text
          muted: '#9699ab',   // Muted text for labels and hints
        },
        accent: {
          DEFAULT: '#FACC15', // Yellow for accents or warnings
        },
        error: {
          DEFAULT: '#EF4444', // Red for error messages
        }
      }
    }
  },
  plugins: [],
}