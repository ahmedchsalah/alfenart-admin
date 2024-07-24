/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      theme: {
        fontFamily : {
          sans : ['Oswald','Helvetica', 'Arial', 'sans-serif']
        }
      },
      screens : {
        'sm' : {'max' : '640px'}
      }
    },
  },
  variants : {
      extend: {
        scale: ['group-hover'],
      }
  },
  plugins: [],
}

