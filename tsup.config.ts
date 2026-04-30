import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/plugin/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: false,
    clean: true,
    splitting: false,
    treeshake: true,
    outDir: 'dist',

    external: [
        'vue',
        'vite',
        '@vitejs/plugin-vue',
        'vue-facing-decorator',
    ],
})