import type { BaseTypeIdentify } from './index';
import type { InjectConfig } from "./option/inject";
import type { EmitConfig } from "./option/emit";
import type { PropsConfig } from "./option/props";
import type { HookConfig } from "./option/methodsAndHooks";
import type { VModelConfig } from "./option/vmodel";
import type { WatchConfig } from "./option/watch";
import type { SetupConfig } from './option/setup';
import type { Record as CustomDecoratorRecord } from './custom/custom';
import type { RefConfig } from './option/ref';
import type { ProvideConfig } from './option/provide';
export type SlotMapTypes = {
    vanilla: Map<string, boolean>;
    computed: Map<string, boolean>;
    provide: Map<string, ProvideConfig>;
    inject: Map<string, InjectConfig>;
    emit: Map<string, EmitConfig>;
    emits: Map<string, boolean>;
    props: Map<string, PropsConfig>;
    hooks: Map<string, HookConfig>;
    'v-model': Map<string, VModelConfig>;
    watch: Map<string, WatchConfig | WatchConfig[]>;
    ref: Map<string, RefConfig>;
    setup: Map<string, SetupConfig>;
    customDecorator: Map<string, CustomDecoratorRecord[]>;
};
declare class Slot {
    master: any;
    constructor(master: any);
    names: Map<string, SlotMapTypes[keyof SlotMapTypes]>;
    obtainMap<T extends keyof SlotMapTypes>(name: T): SlotMapTypes[T];
    getMap<T extends keyof SlotMapTypes>(name: T): SlotMapTypes[T] | undefined;
    inComponent: boolean;
    cachedVueComponent: any;
}
export declare function makeSlot(obj: any, defaultSlot?: Slot): Slot;
export declare function getSlot(obj: any): Slot | undefined;
export declare function obtainSlot(obj: any, defaultSlot?: Slot): Slot;
export declare function makeObject(names: string[], obj: any): Record<string, any>;
export declare function toComponentReverse(obj: any): any[];
export declare function getSuperSlot(obj: any): Slot | null;
/**
 * Exclude decorated names by a filter
 */
export declare function excludeNames(names: string[], slot: Slot, filter?: (mapName: string) => boolean): string[];
/**
 * Get own properties by a filter
 */
export declare function getValidNames(obj: any, filter: (des: PropertyDescriptor, name: string) => boolean): string[];
export declare function optionNullableMemberDecorator<T>(handler: {
    (proto: any, name: string, option?: T): any;
}): {
    (option?: T): any;
    (proto: BaseTypeIdentify, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function getProviderFunction(provide: any): () => {};
export {};
//# sourceMappingURL=utils.d.ts.map