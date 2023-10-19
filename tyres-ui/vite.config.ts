import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 8123,
  },
  ssr: {
    noExternal: ["@kobalte/core"],
  },
});
