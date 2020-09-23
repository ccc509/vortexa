"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightPanel = void 0;
var react_1 = __importStar(require("react"));
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var react_redux_1 = require("react-redux");
var helper_functions_1 = require("../../constants/helper-functions");
var styles_1 = require("../../constants/styles");
var boatMapReducer_1 = require("../../redux/reducers/boatMapReducer");
var categoryTable_1 = require("./categoryTable");
var getNumOfRampsWithMaterial = function (rampsInTheView, material) {
    return rampsInTheView.features.filter(function (r) { return r.properties.material === material; }).length;
};
var getNumOfRampsInRange = function (rampsInTheView, min, max) {
    return rampsInTheView.features.filter(function (r) { return r.properties.area_ >= min && r.properties.area_ < max; }).length;
};
var RightPanel = function () {
    var _a = react_1.useState([]), selectedAttributes = _a[0], setSelectedAttributes = _a[1];
    var selectedMaterials = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedMaterials; });
    var selectedSizes = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedSizes; });
    var bounds = boatMapReducer_1.useTypedSelector(function (state) { return state.bounds; });
    var ramps = boatMapReducer_1.useTypedSelector(function (state) { return state.ramps; });
    var materials = boatMapReducer_1.useTypedSelector(function (state) { return state.materials; });
    var sizeIntervals = boatMapReducer_1.useTypedSelector(function (state) { return state.sizeIntervals; });
    var rampsInTheView = helper_functions_1.getRampsToDisplay(ramps, selectedMaterials, selectedSizes, bounds);
    var dispatch = react_redux_1.useDispatch();
    var clearPropertySelection = function () {
        dispatch(boatMapActions_1.clearSelection());
        setSelectedAttributes([]);
    };
    var rampMaterialLookUp = new Map();
    materials.forEach(function (material) {
        rampMaterialLookUp.set(material, getNumOfRampsWithMaterial(rampsInTheView, material));
    });
    var rampSizeLookUp = new Map();
    sizeIntervals.forEach(function (interval) {
        rampSizeLookUp.set(interval[0] + "-" + interval[1], getNumOfRampsInRange(rampsInTheView, interval[0], interval[1]));
    });
    return (react_1.default.createElement("div", { className: styles_1.rightPanel },
        react_1.default.createElement(categoryTable_1.CategoryTable, { categoryLookUp: rampMaterialLookUp, title: "Material", selectAction: boatMapActions_1.selectMaterial, selectedAttributes: selectedMaterials }),
        react_1.default.createElement(categoryTable_1.CategoryTable, { categoryLookUp: rampSizeLookUp, title: "Size Interval", selectAction: boatMapActions_1.selectSize, selectedAttributes: sizeIntervals.map(function (interval) { return interval[0] + "-" + interval[1]; }) }),
        react_1.default.createElement("button", { className: styles_1.clearButton, onClick: function () { return clearPropertySelection(); } }, "Clear Selection")));
};
exports.RightPanel = RightPanel;
