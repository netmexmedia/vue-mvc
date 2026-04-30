import type { Alias, Plugin } from 'vite'
import { autoToNativePlugin } from './auto-to-native'
import { templateResolverPlugin } from './template-resolver'
import { styleResolverPlugin } from './style-resolver'

export { autoToNativePlugin, templateResolverPlugin, styleResolverPlugin }

function vueEsmAliasPlugin(): Plugin {
    return {
        name: 'mvc-vue-esm-alias',
        enforce: 'pre',
        config(config) {
            const alias = config.resolve?.alias as Alias[] | Record<string, string> | undefined

            if (!alias) {
                return {
                    resolve: {
                        alias: {
                            vue: 'vue/dist/vue.esm-bundler.js',
                        },
                    },
                }
            }

            if (Array.isArray(alias)) {
                const hasVueAlias = alias.some((entry) => entry.find === 'vue')
                if (!hasVueAlias) {
                    alias.push({ find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' })
                }
                return
            }

            if (!Object.prototype.hasOwnProperty.call(alias, 'vue')) {
                alias.vue = 'vue/dist/vue.esm-bundler.js'
            }
        },
    }
}

/**
 * Preset plugin list for MVC-style Vue class components.
 */
export function mvcPlugin(): Plugin[] {
    return [vueEsmAliasPlugin(), autoToNativePlugin(), templateResolverPlugin(), styleResolverPlugin()]
}
