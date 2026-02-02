// @ts-check
// @TASK P0-T0.2 - Astro with Tailwind CSS
// @SPEC docs/planning/05-design-system.md

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // global.css에서 직접 관리
    }),
  ],
});
