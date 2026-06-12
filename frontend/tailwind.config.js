/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#030712',
        },
        cyber: {
          cyan: '#00FFCC',
          purple: '#8B5CF6',
          darkBlue: '#0d1321',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'SF Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-matrix': 'linear-gradient(to right, rgba(0, 255, 204, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 204, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'matrix-size': '40px 40px',
      },
      boxShadow: {
        'neon-cyan': '0px 20px 40px rgba(0, 255, 204, 0.15)',
        'neon-purple': '0px 20px 40px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}