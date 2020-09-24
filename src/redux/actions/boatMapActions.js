"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSelection = exports.selectSize = exports.selectMaterial = exports.zoomMap = void 0;
var types_1 = require("../types");
exports.zoomMap = function (bounds) {
  return {
    type: types_1.ZOOM_MAP,
    payload: bounds,
  };
};
exports.selectMaterial = function (material) {
  return {
    type: types_1.SELECT_MATERIAL,
    payload: material,
  };
};
exports.selectSize = function (sizeInterval) {
  return {
    type: types_1.SELECT_SIZE,
    payload: sizeInterval,
  };
};
exports.clearSelection = function () {
  return {
    type: types_1.CLEAR_SELECTION,
  };
};
