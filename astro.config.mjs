import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // Update these values if you deploy to a root domain or Gitee Pages.
  site: "https://rec-any-thing.gitee.io",
  base: "/ad3-r",
  output: "static",
  trailingSlash: "always",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
