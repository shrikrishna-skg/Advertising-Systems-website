// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
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
      // Absolute (vite 8 aliases must resolve to a real path — './src'
      // relative form made vite 8's builtin alias rewrite to a relative
      // specifier that then failed to load).
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
  integrations: [react()],
});
