import type { Plugin } from 'vite'

export function templateResolverPlugin(): Plugin {
  return {
    name: 'netmex:template-resolver',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.includes('.ts') || !code.includes('@Component')) return

      const templateMatch = code.match(/template:\s*['"](.*?)['"]/)
      if (!templateMatch) return

      const templatePath = templateMatch[1]
      const importVarName = '__template'

      let transformedCode =
          `import ${importVarName} from '${templatePath}?raw'\n` + code

      transformedCode = transformedCode.replace(
          /template:\s*['"](.*?)['"]/,
          `template: ${importVarName}`
      )

      return {
        code: transformedCode,
        map: null
      }
    }
  }
}