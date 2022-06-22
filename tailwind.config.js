/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        customdark: {
          "primary": "#3ABFF8",
          "secondary": "#828DF8",
          "accent": "#67e8f9",
          "neutral": "#1D283A",
          "base-100": "#0F1729",
          "base-content": "#FFFFFF",
          "info": "#0CA6E9",
          "success": "#2BD4BD",
          "warning": "#F4C152",
          "error": "#FB6F84",
        }
      },
      'light', 'dracula',
      {
        customlight: {
          "primary": "#570DF8",
          "secondary": "#F000B8",
          "accent": "#37CDBE",
          "neutral": "#f4f4f5",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  
  plugins: [
    require('daisyui'),
  ],
}
