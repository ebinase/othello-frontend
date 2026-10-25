import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@(components|dataflow|hooks|models|util)(?=\/|$)/,
        replacement: fileURLToPath(new URL("./src/$1", import.meta.url)),
      },
    ],
  },
  server: { port: 3000 },
  build: { target: ["chrome111", "firefox128", "safari16.4"] },
});
