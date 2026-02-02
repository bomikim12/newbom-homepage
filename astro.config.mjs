// @ts-check
// @TASK P0-T0.2 - Astro with Tailwind CSS
// @SPEC docs/planning/05-design-system.md

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server', // API 엔드포인트를 위한 SSR
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // global.css에서 직접 관리
    }),
  ],
});
