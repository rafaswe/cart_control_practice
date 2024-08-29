/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // fontFamily: {
    //   sans: ["Inter", "sans-serif"],
    //   serif: ["Inter", "sans-serif"],
    //   poppins: ["Poppins", "sans-serif"],
    //   mono: ["Share Tech Mono", "monospace"],
    // },
    fontSize: {
      xxs: "10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      md: "18px",
      lg: "20px",
      xl: "22px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "32px",
      "5xl": "40px",
      "6xl": "48px",
      "7xl": "60px",
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    extend: {
      fontFamily: {
        murecho: ["var(--font-murecho)"],
        poppins: ["var(--font-poppins)"],
        mono: ["var(--font-share-tech-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2563EB",
        "primary-tint": "#799EF0",
        "primary-tint-light": "#E4EAF7",
        secondary: "#858585 ",
        "secondary-tint": "#E5E7EB ",
        "secondary-tint-light": "#FBFBFB ",
        border: "#3A72ED",
        error: "#B2192C",
        "error-tint": "#F9EFF0",
        "error-tint-light": "#F9DCDE",
        "error-tint-extra-light": "#FCEDEE",
        alert: "#FFBB33",
        "alert-tint": "#FFFAF1",
        success: "#14A5AB",
        "success-tint": "#EEF9F9",
      },
      screens: {
        xs: "350px",
        sm: "400px",
        md: "750px",
        lg: "950px",
        xl: "1140px",
        "2xl": "1536px",
      },
      zIndex: {
        100: "100",
      },
      container: {
        center: true,
        screens: {
          xs: "350px",
          sm: "380px",
          md: "750px",
          lg: "950px",
          xl: "1140px",
        },
      },
      keyframes: {
        shake: {
          "0%": { "margin-left": "0rem" },
          "25%": { "margin-left": "0.5rem " },
          "75%": { "margin-left": "-0.5rem" },
          "100%": { "margin-left": "0rem" },
        },
        inAnimation: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        shake: "shake 0.2s ease-in-out 0s 2",
        inAnimation: "inAnimation .5s ease-in-out",
      },
    },
  },

  plugins: [],
};
