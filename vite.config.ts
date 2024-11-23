import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensuring Bootstrap is correctly resolved in the build
      bootstrap: "node_modules/bootstrap",
    },
  },
  build: {
    rollupOptions: {
      external: ["bootstrap"], // If you want to externalize it
    },
  },
});
