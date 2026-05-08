import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // Update these values if you deploy to a root domain, custom domain, or other hosting.
  site: "https://ad3rlab.github.io",
  base: "/AD3R",
  output: "static",
  trailingSlash: "always",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
