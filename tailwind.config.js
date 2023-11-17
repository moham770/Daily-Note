/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mini:"370px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      colors:{
        mainColor:'#0e1c26',
        secondColor:'#13232c',
        thirdColor:'#172a32',
        fourdColor:'#1c3139',
        titleAuth:'#fff',
        headerNote:"#253e45",
        bodyNote:"#2a454b",
        footerNote:"#21373f",

      },
      keyframes:{
        movingRight:{
            '0%':{transform:'translateX(0)'},
            '50%':{transform:'translateX(10px)'},
            '100%':{transform:'translateX(0px)'},
        },
        movingUpDown:{
          '0%':{transform:'translateY(0)'},
          '50%':{transform:'translateY(10px)'},
          '100%':{transform:'translateY(0)'}
        }
    },
    animation:{
      movingRight:"movingRight 1s ease-in-out infinite",
      movingUpDown: "movingUpDown 1s ease-in-out infinite"
    }
    },
  },
  plugins: [],
}