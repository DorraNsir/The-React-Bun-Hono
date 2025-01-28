import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [react(), TanStackRouterVite(),],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(import.meta.url), "./src"),
      "@server": path.resolve(path.dirname(import.meta.url), "../server"),
    },
  },
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
      }
    }
  }
})

