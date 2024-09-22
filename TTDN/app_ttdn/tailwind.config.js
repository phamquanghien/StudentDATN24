/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#54b2fe',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        normal: '5px',
      },
    },
  },
  plugins: [],
};
