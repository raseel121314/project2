/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        edupilot: {
          primary: '#1e3a5f',
          secondary: '#2d5a87',
          accent: '#4a9fd4',
          light: '#f0f4f8',
          danger: '#ef4444',
          warning: '#f59e0b',
          success: '#10b981',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
