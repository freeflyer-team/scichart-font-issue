import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const rootDirPath = fileURLToPath(new URL(".", import.meta.url));
const sciChartsWasmDirPath = resolve(rootDirPath, "node_modules", "scichart", "_wasm");

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
  plugins: [
    svelte({ configFile: resolve(rootDirPath, "svelte.config.mjs") }),
    viteStaticCopy({
      targets: [
          {
            src: normalizePath(join(sciChartsWasmDirPath, "scichart2d.data")),
            dest: "",
          },
          {
            src: normalizePath(join(sciChartsWasmDirPath, "scichart2d.wasm")),
            dest: "",
          },
      ],
    }),
  ],
  server: {
    port: 9009,
    strictPort: true,
  },
});
