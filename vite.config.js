import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        port: 5173,          // Port for the Vite dev server
        strictPort: true,     // Do not fallback to another port if 5173 is unavailable
        host: '0.0.0.0',      // Listen on all network interfaces (required for Docker)
        origin: "http://0.0.0.0:5173",  // Origin for the development server

        watch: {
            usePolling: true,     // Use polling for file changes (helps in Docker environments)
        },

        hmr: {
            host: 'localhost',    // Use localhost for HMR, or set to your local IP if needed
            port: 5173,
        },

        proxy: {
            '/api': {
                target: 'http://localhost:3001', // Your backend server
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensure the path is correct
            },
        },
    },
});
