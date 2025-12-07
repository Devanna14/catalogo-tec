import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 💡 CLAVE: Establece la base path. Debe coincidir con el nombre de tu repositorio.
  base: "/catalogo-tec/",
})
