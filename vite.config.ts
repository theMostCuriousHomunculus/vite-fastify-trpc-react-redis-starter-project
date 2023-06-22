import {
	dirname,
	resolve,
} from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr({ exportAsDefault: true })],
	root: resolve(
		dirname(
			fileURLToPath(new URL(import.meta.url)),
		),
		'src',
		'client',
	),
});
