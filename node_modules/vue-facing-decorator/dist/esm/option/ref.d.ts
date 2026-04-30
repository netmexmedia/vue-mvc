import type { Cons } from '../component';
import { type OptionBuilder } from '../optionBuilder';
export type RefConfig = null | string;
export declare const decorator: {
    (option?: string | undefined): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=ref.d.ts.map