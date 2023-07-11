/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",
    reporters: ["default", "html"],
    // coverage: {
    //   provider: "v8",
    //   enabled: true,
    //   include: ["src/components/**/*.{ts,tsx}"],
    // },
  },
});
