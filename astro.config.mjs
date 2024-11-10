// @ts-check
import { defineConfig } from "astro/config";
import { remarkRewriteLinks } from './link-redirect.mjs'
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkRewriteLinks]
  },
  prefetch: {
    prefetchAll: true
  }
});
