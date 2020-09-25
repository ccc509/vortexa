"use strict";
/* eslint import/no-webpack-loader-syntax: off */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightPanel = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var styles_1 = require("../../constants/styles");
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var helper_functions_1 = require("../../constants/helper-functions");
var categoryTable_1 = require("./categoryTable");
var boatMapReducer_1 = require("../../redux/reducers/boatMapReducer");
var RightPanel = function () {
    // const worker = require('workerize-loader!./worker.js');
    // const instance = worker();
    // instance.expensive(1000).then((count:any) => {
    //     console.log(`Ran ${count} loops`)
    // })
    var selectedMaterials = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedMaterials; });
    var selectedSizes = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedSizes; });
    var rampsInTheView = boatMapReducer_1.useTypedSelector(function (state) {
        return helper_functions_1.getRampsToDisplay(state.ramps, state.selectedMaterials, state.selectedSizes, state.bounds);
    });
    var materialLookups = boatMapReducer_1.useTypedSelector(function (state) {
        return state.materials.map(function (material) { return ({
            name: material,
            count: helper_functions_1.getNumOfRampsWithMaterial(rampsInTheView, material),
        }); });
    });
    var rampSize = boatMapReducer_1.useTypedSelector(function (state) {
        return state.sizeIntervals.map(function (interval) { return ({
            name: interval.min + "-" + interval.max,
            count: helper_functions_1.getNumOfRampsInRange(rampsInTheView, interval),
        }); });
    });
    var dispatch = react_redux_1.useDispatch();
    return (react_1.default.createElement("div", { className: styles_1.rightPanel },
        react_1.default.createElement(categoryTable_1.CategoryTable, { categoryLookUp: materialLookups, title: "Material", selectAction: boatMapActions_1.selectMaterial, selectedAttributes: selectedMaterials }),
        react_1.default.createElement(categoryTable_1.CategoryTable, { categoryLookUp: rampSize, title: "Size Interval", selectAction: boatMapActions_1.selectSize, selectedAttributes: selectedSizes.map(function (interval) { return interval.min + "-" + interval.max; }) }),
        react_1.default.createElement("button", { className: styles_1.clearButton, onClick: function () { return dispatch(boatMapActions_1.clearSelection()); }, id: "roxie" }, "Clear Selection")));
};
exports.RightPanel = RightPanel;
