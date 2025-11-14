import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createProxy } from "./proxyOptions";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const frappePort = Number(env.VITE_FRAPPE_PORT ?? 8000);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 8080,
      host: "0.0.0.0",
      proxy: createProxy(frappePort),
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },
    build: {
      outDir: "../library_website_app/public/library",
      emptyOutDir: true,
      target: "es2015",
    },
  };
});
