import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /*
     * Vite binds to localhost by default, which a container host cannot reach —
     * it proxies the dev server from outside the VM. Listening on every
     * interface is what makes the preview work on CodeSandbox, Codespaces or
     * anything else running the app in a container.
     */
    host: true,
    /*
     * Vite rejects requests whose Host header it does not recognise. Those
     * hosts serve the preview on CodeSandbox.
     */
    allowedHosts: ['.csb.app', '.csb.dev'],
  },
})
