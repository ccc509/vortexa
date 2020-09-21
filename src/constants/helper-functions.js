"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRampsToDisplay = void 0;
var shouldRampBeIncluded = function (feature, selectedMaterials, selectedSizes, bounds) {
    if (selectedMaterials && selectedMaterials.length) {
        if (!selectedMaterials.includes(feature.properties.material)) {
            return false;
        }
    }
    if (selectedSizes && selectedSizes.length) {
        if (!selectedSizes.some(function (interval) {
            return feature.properties.area_ >= interval[0] &&
                feature.properties.area_ < interval[1];
        })) {
            return false;
        }
    }
    if (bounds &&
        !feature.geometry.coordinates[0][0].some(function (c) {
            return bounds.contains([c[1], c[0]]);
        })) {
        return false;
    }
    return true;
};
exports.getRampsToDisplay = function (allRamps, selectedMaterials, selectedSizes, bounds) {
    var rampsToDisplay = {
        type: "FeatureCollection",
        features: [],
    };
    allRamps.features.forEach(function (feature) {
        if (shouldRampBeIncluded(feature, selectedMaterials, selectedSizes, bounds)) {
            rampsToDisplay.features.push(feature);
        }
    });
    return rampsToDisplay;
};
