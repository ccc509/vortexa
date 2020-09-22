"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRampsToDisplay = void 0;
var isMaterialOk = function (feature, selectedMaterials) { return selectedMaterials.length === 0 || selectedMaterials.includes(feature.properties.material); };
var isSizeOk = function (feature, selectedSizes) { return selectedSizes.length === 0 || selectedSizes.some(function (interval) {
    return feature.properties.area_ >= interval[0] &&
        feature.properties.area_ < interval[1];
}); };
var isBoundsOk = function (feature, bounds) {
    if (!bounds) {
        return true;
    }
    else {
        return feature.geometry.coordinates[0][0].some(function (c) {
            return bounds.contains([c[1], c[0]]);
        });
    }
};
// bounds && feature.geometry.coordinates[0][0].some((c: number[]) =>
//     bounds.contains([c[1], c[0]])
//   )
exports.getRampsToDisplay = function (allRamps, selectedMaterials, selectedSizes, bounds) { return ({
    type: "FeatureCollection",
    features: allRamps.features.filter(function (feature) {
        return isMaterialOk(feature, selectedMaterials) &&
            isSizeOk(feature, selectedSizes) &&
            isBoundsOk(feature, bounds);
    })
}); };
