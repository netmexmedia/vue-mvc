import type { Plugin } from 'vite'

/**
 * Vite plugin to load .ts files as Vue components
 * This allows us to write components in pure TypeScript with embedded templates/styles
 */
export function vueComponentsPlugin(): Plugin {
  return {
    name: 'vue-components',
    resolveId(id) {
      // Intercept imports of .ts files in components directories
      if (id.includes('/components/') && id.endsWith('.ts')) {
        return id
      }
    },
    async transform(code, id) {
      // Transform .ts component files to be directly importable as Vue components
      if (id.includes('/components/') && id.endsWith('.ts') && code.includes('toNative')) {
        // Already handled by Vue's built-in support
        return null
      }
    }
  }
}

