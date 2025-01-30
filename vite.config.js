import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    minify: "terser",
  },
  server: {
    proxy: {
      // Proxy all requests starting with "/api" to your Flask backend
      "/api": {
        target: "http://127.0.0.1:5000", 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ""), 
      },
    },
  },
});