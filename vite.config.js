import { defineConfig } from "vite";

export default defineConfig({
  base: "/DebuggingGame/",
  build: {
    minify: "terser",
  },
});
