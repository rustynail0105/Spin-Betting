import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // ...other config settings
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
      assets: resolve(__dirname, "./src/assets"),
      components: resolve(__dirname, "./src/components"),
      constants: resolve(__dirname, "./src/constants"),
    },
  },
  plugins: [react()],
  // optimizeDeps: {
  //   include: ["**/*.svg"],
  // },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
