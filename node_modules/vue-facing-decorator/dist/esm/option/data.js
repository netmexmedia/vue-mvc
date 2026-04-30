import { makeObject, obtainSlot, excludeNames, getValidNames } from '../utils';
export function build(cons, optionBuilder, vueInstance) {
    var _a;
    (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : (optionBuilder.data = {});
    const sample = new cons(optionBuilder, vueInstance);
    let names = getValidNames(sample, (des, name) => {
        var _a, _b;
        return !!des.enumerable
            && !((_a = optionBuilder.methods) === null || _a === void 0 ? void 0 : _a[name])
            && !((_b = optionBuilder.props) === null || _b === void 0 ? void 0 : _b[name]);
    });
    const slot = obtainSlot(cons.prototype);
    names = excludeNames(names, slot, (mapName) => {
        //include these names:
        //provide, user may access field directly
        return !['provide'].includes(mapName);
    });
    Object.assign(optionBuilder.data, makeObject(names, sample));
}
//# sourceMappingURL=data.js.map