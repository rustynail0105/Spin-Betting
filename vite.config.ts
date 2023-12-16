import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

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
  define: {
    "process.env": process.env,
    global: {},
    Buffer: ["buffer", "Buffer"],
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["**/*.svg"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
