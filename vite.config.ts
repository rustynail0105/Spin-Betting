import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
      assets: resolve(__dirname, "./src/assets"),
      components: resolve(__dirname, "./src/components"),
      constants: resolve(__dirname, "./src/constants"),
    },
  },
  plugins: [
    react(),
    inject({
      Buffer: ["buffer", "Buffer"],
      process: "process",
    }),
  ],
  optimizeDeps: {
    include: ["**/*.svg"],
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
