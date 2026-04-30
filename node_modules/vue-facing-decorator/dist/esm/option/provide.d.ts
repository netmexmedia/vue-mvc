import type { Cons } from '../component';
import type { OptionBuilder } from '../optionBuilder';
export type ProvideConfig = null | string;
export declare const decorator: {
    (option?: string | null | undefined): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any): null | undefined;
//# sourceMappingURL=provide.d.ts.map