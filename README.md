# Netmex - Vue MVC

[![npm version](https://img.shields.io/npm/v/@netmex/vue-mvc.svg)](https://www.npmjs.com/package/@netmex/vue-mvc)
[![npm downloads](https://img.shields.io/npm/dm/@netmex/vue-mvc.svg)](https://www.npmjs.com/package/@netmex/vue-mvc)
[![license](https://img.shields.io/npm/l/@netmex/vue-mvc.svg)](LICENSE)

Lightweight MVC tooling for Vue class/decorator projects using `vue-facing-decorator`.

## Key Features
* Auto-wraps decorator class components with `toNative(...)`
* Resolves `template: './Component.html'` into raw template imports
* Resolves `style: './Component.scss'` into style imports
* Enables a clean MVC-style separation of logic, template, and styles

## Core Concepts

This package targets Vue 3 projects that use class-based components with decorators (via `vue-facing-decorator`).

It provides Vite plugins that transform these components into native Vue-compatible components at build time.

The goal is to enable a clear MVC-style structure:

- **Logic** lives in the class
- **Template** is defined separately (HTML or inline)
- **Styles** are handled independently (CSS/SCSS)

This separation improves maintainability and scalability, while still leveraging Vue’s reactivity and component system.

## Installation

Install via npm:

```bash
npm i -D @netmex/vue-mvc
```

## Requirements

This package is designed for Vue 3 projects using Vite and class-based decorators.

Ensure your project includes:

- `vue` (Vue 3)
- `vite`
- `@vitejs/plugin-vue`
- `vue-facing-decorator`

### Notes

- Only Vue 3 is supported (Vue 2 is not compatible)
- `vue-facing-decorator` is required for class-based components
- This plugin extends Vite's build process, so Vite is required

## TypeScript Configuration

Your project must enable experimental decorators.

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
    plugins: [
        vue(),
        mvcPlugin(),
    ],
})
```

## Usage

Use the `@Component` decorator from vue-facing-decorator as usual.
The plugin will automatically transform your components for Vue compatibility.

### Example (MVC-style component)

```ts
import { Component } from 'vue-facing-decorator'

@Component({
  template: './MyComponent.html',
  style: './MyComponent.scss',
})
export default class MyComponent {
  // component logic here
}
```

## Inline Templates & Styles

Inline templates and styles are also supported:

```ts
import { Component } from 'vue-facing-decorator'

@Component({
    template: `<div>Hello World</div>`,
    style: `div { color: red; }`,
})
export default class MyComponent {
    // component logic here
}
```

## Related

- [`vue-facing-decorator`](https://github.com/facing-dev/vue-facing-decorator) - provides the class-based decorator API used by this package

## License

MIT License
