// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://advertisingsystems.ai',
  output: 'server',
  adapter: vercel(),
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': './src' },
    },
  },
  integrations: [
    sitemap({
      customPages: [
        'https://advertisingsystems.ai/',
        'https://advertisingsystems.ai/pricing',
        'https://advertisingsystems.ai/about',
        'https://advertisingsystems.ai/blog',
        'https://advertisingsystems.ai/book-demo',
        'https://advertisingsystems.ai/ota-advertising',
        'https://advertisingsystems.ai/features/campaign-management',
        'https://advertisingsystems.ai/features/ai-optimization',
        'https://advertisingsystems.ai/features/analytics',
        'https://advertisingsystems.ai/features/automation',
        'https://advertisingsystems.ai/features/budget-intelligence',
      ],
    }),
    react(),
  ],
});
