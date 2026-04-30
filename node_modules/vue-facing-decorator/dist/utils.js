"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviderFunction = exports.optionNullableMemberDecorator = exports.getValidNames = exports.excludeNames = exports.getSuperSlot = exports.toComponentReverse = exports.makeObject = exports.obtainSlot = exports.getSlot = exports.makeSlot = void 0;
const index_1 = require("./index");
const utils_1 = require("./deco3/utils");
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
function makeSlot(obj, defaultSlot) {
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
exports.makeSlot = makeSlot;
function getSlot(obj) {
    var _a;
    return (_a = Object.getOwnPropertyDescriptor(obj, SlotSymbol)) === null || _a === void 0 ? void 0 : _a.value;
}
exports.getSlot = getSlot;
function obtainSlot(obj, defaultSlot) {
    const slot = getSlot(obj);
    if (slot) {
        return slot;
    }
    return makeSlot(obj, defaultSlot);
}
exports.obtainSlot = obtainSlot;
function makeObject(names, obj) {
    return names.reduce((pv, cv) => {
        pv[cv] = obj[cv];
        return pv;
    }, {});
}
exports.makeObject = makeObject;
function toComponentReverse(obj) {
    const arr = [];
    let curr = obj;
    do {
        arr.unshift(curr);
        curr = Object.getPrototypeOf(curr);
    } while (curr.constructor !== index_1.Base && !getSlot(curr));
    return arr;
}
exports.toComponentReverse = toComponentReverse;
function getSuperSlot(obj) {
    let curr = Object.getPrototypeOf(obj);
    while (curr.constructor !== index_1.Base) {
        const slot = getSlot(curr);
        if (slot) {
            return slot;
        }
        curr = Object.getPrototypeOf(curr);
    }
    return null;
}
exports.getSuperSlot = getSuperSlot;
/**
 * Exclude decorated names by a filter
 */
function excludeNames(names, slot, filter) {
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
exports.excludeNames = excludeNames;
/**
 * Get own properties by a filter
 */
function getValidNames(obj, filter) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name));
}
exports.getValidNames = getValidNames;
function optionNullableMemberDecorator(handler) {
    function decorator(optionOrProto, name) {
        if (name) {
            (0, utils_1.compatibleMemberDecorator)(function (proto, name) {
                handler(proto, name);
            })(optionOrProto, name);
        }
        else {
            return (0, utils_1.compatibleMemberDecorator)(function (proto, name) {
                handler(proto, name, optionOrProto);
            });
        }
    }
    return decorator;
}
exports.optionNullableMemberDecorator = optionNullableMemberDecorator;
function getProviderFunction(provide) {
    if (typeof provide === 'function')
        return provide;
    return function () { return provide || {}; };
}
exports.getProviderFunction = getProviderFunction;
//# sourceMappingURL=utils.js.map