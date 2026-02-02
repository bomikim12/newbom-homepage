// @TASK P0-T0.2 - Tailwind CSS 설정
// @SPEC docs/planning/05-design-system.md

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        'deep-blue': '#1E3A5F',
        'accent-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
