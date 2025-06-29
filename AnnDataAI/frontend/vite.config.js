import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	server: {
		proxy: {
			"/api": "http://127.0.0.1:3600",
		},
	},
	plugins: [react()],
	build: {
		outDir: "dist",
		assetsDir: "assets",
		sourcemap: false,
	},
	define: {
		'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://backend-9s8a5skh3-harshwardhan-patils-projects.vercel.app')
	}
});
