import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    port: 5173,
    watch: {
      ignored: ["**/server/**", "**/dist/**", "**/dist-ssr/**", "**/node_modules/**", "**/public/**"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:4321",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
});
