const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
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
      colors: {
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
    },
  },
  plugins: [],
});
