import { Base } from './index';
import { compatibleMemberDecorator } from './deco3/utils';
const SlotSymbol = Symbol('vue-facing-decorator-slot');
class Slot {
    constructor(master) {
        this.names = new Map();
        this.inComponent = false;
        this.cachedVueComponent = null;
        this.master = master;
    }
    obtainMap(name) {
        let map = this.getMap(name);
        if (!map) {
            map = new Map();
            this.names.set(name, map);
        }
        return map;
    }
    getMap(name) {
        const map = this.names.get(name);
        return map;
    }
}
export function makeSlot(obj, defaultSlot) {
    if (getSlot(obj)) {
        throw '';
    }
    if (defaultSlot) {
        defaultSlot.master = obj;
    }
    const slot = defaultSlot !== null && defaultSlot !== void 0 ? defaultSlot : new Slot(obj);
    Object.defineProperty(obj, SlotSymbol, {
        enumerable: false,
        value: slot
    });
    return slot;
}
export function getSlot(obj) {
    var _a;
    return (_a = Object.getOwnPropertyDescriptor(obj, SlotSymbol)) === null || _a === void 0 ? void 0 : _a.value;
}
export function obtainSlot(obj, defaultSlot) {
    const slot = getSlot(obj);
    if (slot) {
        return slot;
    }
    return makeSlot(obj, defaultSlot);
}
export function makeObject(names, obj) {
    return names.reduce((pv, cv) => {
        pv[cv] = obj[cv];
        return pv;
    }, {});
}
export function toComponentReverse(obj) {
    const arr = [];
    let curr = obj;
    do {
        arr.unshift(curr);
        curr = Object.getPrototypeOf(curr);
    } while (curr.constructor !== Base && !getSlot(curr));
    return arr;
}
export function getSuperSlot(obj) {
    let curr = Object.getPrototypeOf(obj);
    while (curr.constructor !== Base) {
        const slot = getSlot(curr);
        if (slot) {
            return slot;
        }
        curr = Object.getPrototypeOf(curr);
    }
    return null;
}
/**
 * Exclude decorated names by a filter
 */
export function excludeNames(names, slot, filter) {
    return names.filter(name => {
        let currSlot = slot;
        while (currSlot != null) {
            for (const mapName of currSlot.names.keys()) {
                if (filter && !filter(mapName)) {
                    continue;
                }
                if (mapName === 'customDecorator') {
                    const map = currSlot.obtainMap('customDecorator');
                    if (map.has(name)) {
                        if (map.get(name).every(ite => !ite.preserve)) {
                            return false;
                        }
                        else {
                            continue;
                        }
                    }
                }
                const map = currSlot.names.get(mapName);
                if (map.has(name)) {
                    return false;
                }
            }
            currSlot = getSuperSlot(currSlot.master);
        }
        return true;
    });
}
/**
 * Get own properties by a filter
 */
export function getValidNames(obj, filter) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name));
}
export function optionNullableMemberDecorator(handler) {
    function decorator(optionOrProto, name) {
        if (name) {
            compatibleMemberDecorator(function (proto, name) {
                handler(proto, name);
            })(optionOrProto, name);
        }
        else {
            return compatibleMemberDecorator(function (proto, name) {
                handler(proto, name, optionOrProto);
            });
        }
    }
    return decorator;
}
export function getProviderFunction(provide) {
    if (typeof provide === 'function')
        return provide;
    return function () { return provide || {}; };
}
//# sourceMappingURL=utils.js.map