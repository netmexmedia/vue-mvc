import type { Plugin } from 'vite'

export function autoToNativePlugin(): Plugin {
  return {
    name: 'netmex:auto-to-native',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.includes('.ts') || !code.includes('@Component')) return

      const classNameMatch = code.match(/export\s+(default\s+)?class\s+(\w+)/)
      if (!classNameMatch) return

      const className = classNameMatch[2]
      let transformedCode = code.replace(/export\s+(default\s+)?class/, 'class')

      if (!/\btoNative\b/.test(transformedCode)) {
        transformedCode =
            `import { toNative } from 'vue-facing-decorator'\n` + transformedCode
      }

      transformedCode += `\n\nexport default toNative(${className})\n`

      return {
        code: transformedCode,
        map: null
      }
    }
  }
}