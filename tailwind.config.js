/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // DOTA怀旧网站主题色彩
        'dota': {
          'primary': '#2B2E38',    // 浩方对战平台深灰色
          'accent': '#FF6600',     // VS平台橙色
          'dark': '#1A1D24',       // 更深的背景色
          'light': '#3A3F4A',      // 较浅的灰色
        },
        // 复古像素风格色彩
        'retro': {
          'green': '#00FF00',      // 经典绿色
          'amber': '#FFBF00',      // 琥珀色
          'red': '#FF0000',        // 经典红色
        }
      },
      fontFamily: {
        'pixel': ['Courier New', 'monospace'],  // 像素字体
        'chinese': ['Source Han Sans CN', 'sans-serif'], // 中文字体
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};