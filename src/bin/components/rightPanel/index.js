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
var getRampsInTheView = reselect_1.createSelector(function (state) { return state.ramps; }, function (state) { return state.selectedMaterials; }, function (state) { return state.selectedSizes; }, function (state) { return state.bounds; }, function (ramps, selectedMaterials, selectedSizes, bounds) {
    return helper_functions_1.getRampsToDisplay(ramps, selectedMaterials, selectedSizes, bounds);
});
var RightPanel = function () {
    var selectedMaterials = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedMaterials; });
    var selectedSizes = boatMapReducer_1.useTypedSelector(function (state) { return state.selectedSizes; });
    console.log("Rendering right panel");
    /*
    
    const getVisibilityFilter = (state) => state.visibilityFilter
    const getTodos = (state) => state.todos
    
    export const getVisibleTodos = createSelector(
      [ getVisibilityFilter, getTodos ],
      (visibilityFilter, todos) => {
        switch (visibilityFilter) {
          case 'SHOW_ALL':
            return todos
          case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
          case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        }
      }
    )
    
    */
    // const rampsInTheView = createSelector(
    //   [(state: GlobalState) => state.selectedMaterials],
    //   (ramps : any, selectedMaterials : any, selectedSizes: any, bounds:any) => getRampsToDisplay(ramps, selectedMaterials, selectedSizes, bounds)    
    // );
    // const rampsInTheView = useTypedSelector((state) => getRampsInTheView(state));
    // const getRampsInTheView = createSelector(
    //   [(state: GlobalState) => state.selectedMaterials],
    //   (ramps : any) => {return ramps}    
    // );
    //   const updateAvailable = createSelector(
    //     (state: AppState) => state.client.nextBuild,
    //     nextBuild => {
    //         if (nextBuild && nextBuild > BUILD_NUMBER) {
    //             return true;
    //         }
    //         return false;
    //     }
    // );
    var rampsInTheView = boatMapReducer_1.useTypedSelector(function (state) { return getRampsInTheView(state); });
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
        react_1.default.createElement("button", { className: styles_1.clearButton, onClick: function () { return dispatch(boatMapActions_1.clearSelection()); }, id: "clearButton" }, "Clear Selection")));
};
exports.RightPanel = RightPanel;
