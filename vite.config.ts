import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const config = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			devtools(),
			tailwindcss(),
			tanstackRouter({ target: "react", autoCodeSplitting: true }),
			viteReact(),
		],
		server: {
			proxy: {
				"/api": {
					target: env.VITE_BASE_API_URL,
					changeOrigin: true,
				},
				"/ws": {
					target: env.VITE_BASE_API_URL,
					ws: true,
				},
			},
		},
	};
});

export default config;
