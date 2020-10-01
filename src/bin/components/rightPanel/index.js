"use strict";
/* eslint import/no-webpack-loader-syntax: off */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightPanel = void 0;
var styles_1 = require("../../constants/styles");
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var helper_functions_1 = require("../../constants/helper-functions");
var categoryTable_1 = require("./categoryTable");
var react_1 = __importDefault(require("react"));
var reselect_1 = require("reselect");
var react_redux_1 = require("react-redux");
var boatMapReducer_1 = require("../../redux/reducers/boatMapReducer");
var rampsInTheViewSelector = reselect_1.createSelector(function (state) { return state.ramps; }, function (state) { return state.selectedMaterials; }, function (state) { return state.selectedSizes; }, function (state) { return state.bounds; }, function (ramps, selectedMaterials, selectedSizes, bounds) {
    return helper_functions_1.getRampsToDisplay(ramps, selectedMaterials, selectedSizes, bounds);
});
var rampsPerMaterialSelector = reselect_1.createSelector(rampsInTheViewSelector, function (state) { return state.materials; }, function (ramps, materials) {
    return materials.map(function (material) { return ({
        name: material,
        count: helper_functions_1.getNumOfRampsWithMaterial(ramps, material),
    }); });
});
var rampsPerSizeIntervalSelector = reselect_1.createSelector(rampsInTheViewSelector, function (state) { return state.sizeIntervals; }, function (ramps, sizeIntervals) {
    return sizeIntervals.map(function (interval) { return ({
        name: interval.min + "-" + interval.max,
        count: helper_functions_1.getNumOfRampsInRange(ramps, interval),
    }); });
});
var RightPanel = function () {
    console.log("Rendering right panel");
    var dispatch = react_redux_1.useDispatch();
    var selectedMaterials = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedMaterials; });
    var selectedSizes = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedSizes; });
    var rampsPerMaterial = boatMapReducer_1.useTypedSelector(rampsPerMaterialSelector);
    var rampsPerSizeInterval = boatMapReducer_1.useTypedSelector(rampsPerSizeIntervalSelector);
    return (react_1.default.createElement("div", { className: styles_1.rightPanel },
        react_1.default.createElement(categoryTable_1.CategoryTable, { categoryLookUp: rampsPerMaterial, title: "Material", selectAction: boatMapActions_1.selectMaterial, selectedAttributes: selectedMaterials }),
        react_1.default.createElement(categoryTable_1.CategoryTable, { categoryLookUp: rampsPerSizeInterval, title: "Size Interval", selectAction: boatMapActions_1.selectSize, selectedAttributes: selectedSizes.map(function (interval) { return interval.min + "-" + interval.max; }) }),
        react_1.default.createElement("button", { className: styles_1.clearButton, onClick: function () { return dispatch(boatMapActions_1.clearSelection()); }, id: "clearButton" }, "Clear Selection")));
};
exports.RightPanel = RightPanel;
//# sourceMappingURL=index.js.map