"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumOfRampsInRange = exports.getNumOfRampsWithMaterial = exports.getRampsToDisplay = void 0;
var isMaterialOk = function (feature, selectedMaterials) {
    return selectedMaterials.length === 0 ||
        (feature.properties &&
            selectedMaterials.includes(feature.properties.material));
};
var isSizeOk = function (feature, selectedSizes) {
    return selectedSizes.length === 0 ||
        selectedSizes.some(function (interval) {
            return feature.properties &&
                feature.properties.area_ >= interval.min &&
                feature.properties.area_ < interval.max;
        });
};
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
exports.getRampsToDisplay = function (allRamps, selectedMaterials, selectedSizes, bounds) {
    console.log(selectedSizes);
    return {
        type: "FeatureCollection",
        features: allRamps.features.filter(function (feature) {
            return isMaterialOk(feature, selectedMaterials) &&
                isSizeOk(feature, selectedSizes) &&
                isBoundsOk(feature, bounds);
        }),
    };
};
exports.getNumOfRampsWithMaterial = function (rampsInTheView, material) {
    console.log(rampsInTheView);
    return rampsInTheView.features.filter(function (r) {
        return r.properties && r.properties.material === material;
    }).length;
};
exports.getNumOfRampsInRange = function (rampsInTheView, interval) {
    return rampsInTheView.features.filter(function (r) {
        return r.properties &&
            r.properties.area_ >= interval.min &&
            r.properties.area_ < interval.max;
    }).length;
};
