import type { Plugin } from 'vite'

export function styleResolverPlugin(): Plugin {
  return {
    name: 'netmex:style-resolver',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.includes('.ts') || !code.includes('@Component')) return

      const styleMatch = code.match(/style:\s*['"](.*?)['"]/)
      if (!styleMatch) return

      const stylePath = styleMatch[1]
      let transformedCode = `import '${stylePath}'\n` + code

      transformedCode = transformedCode.replace(
          /style:\s*['"](.*?)['"],?/,
          ''
      )

      return {
        code: transformedCode,
        map: null
      }
    }
  }
}