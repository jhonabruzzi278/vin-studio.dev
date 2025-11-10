// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/astro";


export default defineConfig({
  site: 'https://vin-studio.dev',
  output: 'server', // Modo servidor para API routes
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(), 
    flowbiteReact(),
    sitemap({
      filter: (page) => 
        page !== 'https://vin-studio.dev/404/' &&
        page !== 'https://vin-studio.dev/terminos/' &&
        page !== 'https://vin-studio.dev/privacidad/',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});