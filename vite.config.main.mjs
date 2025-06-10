import { builtinModules } from "node:module";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const rootDirPath = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  build: {
    outDir: resolve(rootDirPath, "out", "build", "main"),
    emptyOutDir: true,
    lib: {
      entry: resolve(rootDirPath, "src", "main", "main.ts"),
      formats: ["cjs"],
    },
    minify: false,
    rollupOptions: {
      external: [
        "electron",
        // And also exclude Node internals from build.
        ...builtinModules.flatMap((name) => [name, `node:${name}`]),
      ],
      output: {
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true,
    target: "node16",
  },
});
