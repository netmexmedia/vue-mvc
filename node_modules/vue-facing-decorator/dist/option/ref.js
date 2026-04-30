"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
const optionBuilder_1 = require("../optionBuilder");
const utils_1 = require("../utils");
exports.decorator = (0, utils_1.optionNullableMemberDecorator)(function (proto, name, key) {
    const slot = (0, utils_1.obtainSlot)(proto);
    const map = slot.obtainMap('ref');
    map.set(name, typeof key === 'undefined' ? null : key);
});
function build(cons, optionBuilder) {
    const slot = (0, utils_1.obtainSlot)(cons.prototype);
    const names = slot.getMap('ref');
    if (!names || names.size === 0) {
        return;
    }
    (0, optionBuilder_1.applyAccessors)(optionBuilder, (ctx) => {
        const data = new Map;
        names.forEach((value, name) => {
            const refKey = value === null ? name : value;
            data.set(name, {
                get: function () {
                    return ctx.$refs[refKey];
                },
                set: undefined
            });
        });
        return data;
    });
}
exports.build = build;
//# sourceMappingURL=ref.js.map