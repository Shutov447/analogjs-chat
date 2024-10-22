/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    build: {
        target: ['es2020'],
    },
    resolve: {
        mainFields: ['module'],
    },
    plugins: [
        analog(),
        ViteAliases({
            dir: './src/app',
            prefix: '@',
            deep: true,
            depth: 1,
            useConfig: false,
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/test-setup.ts'],
        include: ['**/*.spec.ts'],
        reporters: ['default'],
    },
    define: {
        'import.meta.vitest': mode !== 'production',
    },
}));
