/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },

      "fade-in-from-top": {
        from: {opacity: "0", transform: "translateY(-16px)"},
        to: {opacity: "1", transform: "translateY(0)"}
      },
      animation: {
        "fade-in-from-top": "fade-in-rom-top 0.5s ease-out",
      }
    },
  },
  plugins: [],
}

