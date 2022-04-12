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
    },
  },
  plugins: [],
};
