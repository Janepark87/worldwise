import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd());

	const config = {
		base: command === 'serve' ? '/' : '/worldwise/',
		plugins: [react()],
	};

	return config;
});
