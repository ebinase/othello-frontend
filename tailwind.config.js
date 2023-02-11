module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        x2s: "0.5px 0.5px 1px 0 #bebebe,-.5px -.5px 1px #ffffff",
        xs: "1px 1px 5px 0 #bebebe,-2px -2px 10px #ffffff",
      },
      animation: {
        "flip-in": "flip-in 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        "flip-in": {
          "0%": {
            transform: "rotateY(-80deg);",
            opacity: "0",
          },
          "50%": {
            transform: "rotateY(-20deg);",
            opacity: "1",
          },
          to: {
            transform: "rotateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
