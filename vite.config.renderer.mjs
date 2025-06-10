import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

const rootDirPath = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    outDir: resolve(rootDirPath, "out", "build", "renderer"),
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: resolve(rootDirPath, "index.html"),
    },
    sourcemap: true,
  },
  plugins: [svelte({ configFile: resolve(rootDirPath, "svelte.config.mjs") })],
  server: {
    port: 9008,
    strictPort: true,
  },
});
