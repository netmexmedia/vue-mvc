import type { Cons } from '../component';
import type { OptionBuilder } from '../optionBuilder';
export declare const HookNames: ReadonlyArray<string>;
export type HookConfig = null;
export declare const decorator: {
    (option?: unknown): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=methodsAndHooks.d.ts.map