"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypedSelector = exports.boatMapReducer = void 0;
var types_1 = require("../types");
var react_redux_1 = require("react-redux");
function boatMapReducer(state, action) {
    switch (action.type) {
        case types_1.ZOOM_MAP:
            return __assign(__assign({}, state), { bounds: action.payload });
        case types_1.SELECT_MATERIAL:
            return __assign(__assign({}, state), { selectedMaterials: __spreadArrays(state.selectedMaterials, [action.payload]) });
        case types_1.SELECT_SIZE:
            var min = action.payload.split("-")[0];
            var max = action.payload.split("-")[1];
            return __assign(__assign({}, state), { selectedSizes: __spreadArrays(state.selectedSizes, [{ min: +min, max: +max }]) });
        case types_1.CLEAR_SELECTION:
            return __assign(__assign({}, state), { selectedMaterials: [], selectedSizes: [] });
        default:
            return state;
    }
}
exports.boatMapReducer = boatMapReducer;
exports.useTypedSelector = react_redux_1.useSelector;
//# sourceMappingURL=boatMapReducer.js.map