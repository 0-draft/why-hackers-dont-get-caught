// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://weakest-layer.pages.dev",
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
