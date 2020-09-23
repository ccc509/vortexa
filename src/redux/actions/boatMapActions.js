"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSelection = exports.selectSize = exports.selectMaterial = exports.zoomMap = void 0;
var actionTypes_1 = require("../actionTypes");
function zoomMap(bounds) {
  return {
    type: actionTypes_1.ZOOM_MAP,
    bounds: bounds,
  };
}
exports.zoomMap = zoomMap;
function selectMaterial(material) {
  return {
    type: actionTypes_1.SELECT_MATERIAL,
    material: material,
  };
}
exports.selectMaterial = selectMaterial;
function selectSize(size) {
  return {
    type: actionTypes_1.SELECT_SIZE,
    size: size,
  };
}
exports.selectSize = selectSize;
function clearSelection() {
  return {
    type: actionTypes_1.CLEAR_SELECTION,
  };
}
exports.clearSelection = clearSelection;
