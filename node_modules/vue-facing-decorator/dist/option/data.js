"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const utils_1 = require("../utils");
function build(cons, optionBuilder, vueInstance) {
    var _a;
    (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : (optionBuilder.data = {});
    const sample = new cons(optionBuilder, vueInstance);
    let names = (0, utils_1.getValidNames)(sample, (des, name) => {
        var _a, _b;
        return !!des.enumerable
            && !((_a = optionBuilder.methods) === null || _a === void 0 ? void 0 : _a[name])
            && !((_b = optionBuilder.props) === null || _b === void 0 ? void 0 : _b[name]);
    });
    const slot = (0, utils_1.obtainSlot)(cons.prototype);
    names = (0, utils_1.excludeNames)(names, slot, (mapName) => {
        //include these names:
        //provide, user may access field directly
        return !['provide'].includes(mapName);
    });
    Object.assign(optionBuilder.data, (0, utils_1.makeObject)(names, sample));
}
exports.build = build;
//# sourceMappingURL=data.js.map