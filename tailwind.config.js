module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Preserve the existing palette when upgrading from Tailwind 3.
      colors: {
        slate: {
          50: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          900: "#0f172a",
        },
        sky: { 400: "#38bdf8" },
        orange: { 500: "#f97316" },
      },
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
            transform: "rotateY(-80deg)",
            opacity: "0",
          },
          "50%": {
            transform: "rotateY(-20deg)",
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
