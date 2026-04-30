import type { OptionSetupFunction } from '../component';
import type { Cons } from '../component';
import type { OptionBuilder } from '../optionBuilder';
export type SetupConfig = {
    setupFunction: OptionSetupFunction;
};
export declare function decorator(setupFunction: OptionSetupFunction): (arg: any, ctx: string | DecoratorContext) => any;
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=setup.d.ts.map