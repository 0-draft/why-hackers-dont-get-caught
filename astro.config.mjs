// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// Deployed to GitHub Pages as a project site:
// https://0-draft.github.io/why-hackers-dont-get-caught/
// CI tests a root build (BASE_PATH unset) and deploys a build with the base.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://0-draft.github.io",
  base,
  trailingSlash: "ignore",
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", ja: "ja" } },
    }),
  ],
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
});
