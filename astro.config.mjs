// @ts-check
import { defineConfig } from "astro/config";
import { remarkRewriteLinks } from './link-redirect.mjs'
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { remarkAlert } from "remark-github-blockquote-alert";

// https://astro.build/config
export default defineConfig({
  site: 'https://tirimia.github.io',
  integrations: [react(), mdx()],
  markdown: {
    remarkPlugins: [remarkRewriteLinks, remarkAlert],
    shikiConfig: {
      theme: 'material-theme-lighter'
    }
  },
  prefetch: {
    prefetchAll: true
  }
});
