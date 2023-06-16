import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  // allow top level await without transpile
  build: { target: "es2022" },
});
