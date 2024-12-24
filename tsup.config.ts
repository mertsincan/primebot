import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs'],
    bundle: true,
    noExternal: [/.*/],
    minify: true
});
