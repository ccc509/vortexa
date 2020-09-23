"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSelection = exports.selectSize = exports.selectMaterial = exports.zoomMap = void 0;
var actionTypes_1 = require("../actionTypes");
exports.zoomMap = function (bounds) {
    return {
        type: actionTypes_1.ZOOM_MAP,
        bounds: bounds,
    };
};
exports.selectMaterial = function (material) {
    return {
        type: actionTypes_1.SELECT_MATERIAL,
        material: material,
    };
};
exports.selectSize = function (size) {
    return {
        type: actionTypes_1.SELECT_SIZE,
        size: size,
    };
};
exports.clearSelection = function () {
    return {
        type: actionTypes_1.CLEAR_SELECTION,
    };
};
