/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        lightgray: "#F5F5F5",
        gray: "#959595",
        lightblue: "#C8FFFF",
        blue: "#46FFFF",
      },
      fontSize: {
        base: "15px", // 기본 텍스트 크기를 15px로 설정
        lg: "22px",
      },
    },
  },
  plugins: [],
};
