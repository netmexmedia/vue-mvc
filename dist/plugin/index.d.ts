import { Plugin } from 'vite';

declare function autoToNativePlugin(): Plugin;

declare function templateResolverPlugin(): Plugin;

declare function styleResolverPlugin(): Plugin;

/**
 * Preset plugin list for MVC-style Vue class components.
 */
declare function mvcPlugin(): Plugin[];

export { autoToNativePlugin, mvcPlugin, styleResolverPlugin, templateResolverPlugin };
