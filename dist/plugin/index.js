// src/plugin/auto-to-native.ts
function autoToNativePlugin() {
  return {
    name: "netmex:auto-to-native",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes(".ts") || !code.includes("@Component")) return;
      const classNameMatch = code.match(/export\s+(default\s+)?class\s+(\w+)/);
      if (!classNameMatch) return;
      const className = classNameMatch[2];
      let transformedCode = code.replace(/export\s+(default\s+)?class/, "class");
      if (!/\btoNative\b/.test(transformedCode)) {
        transformedCode = `import { toNative } from 'vue-facing-decorator'
` + transformedCode;
      }
      transformedCode += `

export default toNative(${className})
`;
      return {
        code: transformedCode,
        map: null
      };
    }
  };
}

// src/plugin/template-resolver.ts
function templateResolverPlugin() {
  return {
    name: "netmex:template-resolver",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes(".ts") || !code.includes("@Component")) return;
      const templateMatch = code.match(/template:\s*['"](.*?)['"]/);
      if (!templateMatch) return;
      const templatePath = templateMatch[1];
      const importVarName = "__template";
      let transformedCode = `import ${importVarName} from '${templatePath}?raw'
` + code;
      transformedCode = transformedCode.replace(
        /template:\s*['"](.*?)['"]/,
        `template: ${importVarName}`
      );
      return {
        code: transformedCode,
        map: null
      };
    }
  };
}

// src/plugin/style-resolver.ts
function styleResolverPlugin() {
  return {
    name: "netmex:style-resolver",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes(".ts") || !code.includes("@Component")) return;
      const styleMatch = code.match(/style:\s*['"](.*?)['"]/);
      if (!styleMatch) return;
      const stylePath = styleMatch[1];
      let transformedCode = `import '${stylePath}'
` + code;
      transformedCode = transformedCode.replace(
        /style:\s*['"](.*?)['"],?/,
        ""
      );
      return {
        code: transformedCode,
        map: null
      };
    }
  };
}

// src/plugin/index.ts
function vueEsmAliasPlugin() {
  return {
    name: "mvc-vue-esm-alias",
    enforce: "pre",
    config(config) {
      const alias = config.resolve?.alias;
      if (!alias) {
        return {
          resolve: {
            alias: {
              vue: "vue/dist/vue.esm-bundler.js"
            }
          }
        };
      }
      if (Array.isArray(alias)) {
        const hasVueAlias = alias.some((entry) => entry.find === "vue");
        if (!hasVueAlias) {
          alias.push({ find: "vue", replacement: "vue/dist/vue.esm-bundler.js" });
        }
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(alias, "vue")) {
        alias.vue = "vue/dist/vue.esm-bundler.js";
      }
    }
  };
}
function mvcPlugin() {
  return [vueEsmAliasPlugin(), autoToNativePlugin(), templateResolverPlugin(), styleResolverPlugin()];
}

export { autoToNativePlugin, mvcPlugin, styleResolverPlugin, templateResolverPlugin };
