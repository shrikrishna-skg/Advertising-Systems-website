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
  integrations: [sitemap(), react()],
});
