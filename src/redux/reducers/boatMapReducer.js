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
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actionTypes");
function boatMapReducer(state, action) {
    switch (action.type) {
        case actionTypes_1.ZOOM_MAP:
            var rampsInTheCurrView = [];
            // state.rampsInTheMap.forEach((feature) => {
            //   if (
            //     feature.geometry.coordinates[0][0].some((c) =>
            //       action.bounds.contains([c[1], c[0]])
            //     )
            //   ) {
            //     rampsInTheCurrView.push(feature);
            //   }
            // });
            return __assign(__assign({}, state), { rampsInTheView: rampsInTheCurrView });
        case actionTypes_1.SELECT_MATERIAL:
            // const rampsWithSelectedMaterial = boatData.features.filter(
            //   (r) => r.properties.material === action.material
            // );
            var updatedSelectedMaterials = state.selectedMaterials;
            updatedSelectedMaterials.push(action.material);
            return __assign(__assign({}, state), { selectedMaterials: updatedSelectedMaterials });
        case actionTypes_1.SELECT_SIZE:
            var min = action.size.split("-")[0];
            var max = action.size.split("-")[1];
            // const rampsWithSelectedSize = boatData.features.filter(
            //   (r) => r.properties.area_ >= min && r.properties.area_ < max
            // );
            var updatedSelectedSizes = state.selectedSizes;
            updatedSelectedSizes.push([+min, +max]);
            return __assign(__assign({}, state), { selectedSizes: updatedSelectedSizes });
        case actionTypes_1.CLEAR_SELECTION:
            return __assign(__assign({}, state), { selectedMaterials: [], selectedSizes: [] });
        default:
            return state;
    }
}
exports.default = boatMapReducer;
