import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["bootstrap"], // Ensure bootstrap is included in the optimization process
  },
  build: {
    rollupOptions: {
      external: ["bootstrap"], // Mark 'bootstrap' as external to prevent bundling issues
    },
  },
});
