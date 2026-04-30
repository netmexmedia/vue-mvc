# @netmex/vue-mvc

MVC tooling for Vue class/decorator projects using `vue-facing-decorator`.

## What this package does

This package provides Vite transforms that support a class/decorator MVC style in Vue projects.

- Auto-wraps decorator class components with `toNative(...)`
- Resolves `template: './Component.html'` into raw template imports
- Resolves `style: './Component.scss'` into style imports

## Installation

```bash
npm i -D @netmex/vue-mvc
```

## Peer dependencies

Your app must have compatible versions of:

- vue
- vite
- @vitejs/plugin-vue
- vue-facing-decorator

## Required TypeScript config (consumer app)

In the tsconfig that compiles your component .ts files:
```ts
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

Without experimentalDecorators: true, decorator-based components will not compile.

## Vite setup

```ts 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { mvcPlugin } from '@netmex/vue-mvc/vite'

export default defineConfig({
  plugins: [vue(), ...mvcPlugin()],
})
```

## Supported conventions
Inside @Component(...):
- template: './MyComponent.html'
- style: './MyComponent.scss' (or css file path)

## Optional requirements
If you use .scss in style, install Sass in the consumer app:

```bash
npm i -D sass
```

*(Or use sass-embedded.)*

## Troubleshooting
- Decorators not compiling
    - Confirm experimentalDecorators: true in the app tsconfig used for component code.
- Template not loaded
    - Verify template path is relative to the component file and points to an existing .html.
- Style not applied
    - Verify the style path exists and Sass is installed for .scss.


## Local development (this package)

```bash 
  npm run typecheck
  npm run build
  npm run smoke
```

## License
  MIT
