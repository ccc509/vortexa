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
require("./style.css");
var react_1 = __importStar(require("react"));
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var react_redux_1 = require("react-redux");
//import boatData from "../../data/boat_ramps.json";
var RightPanel = function () {
    var _a = react_1.useState(null), selectedAttribute = _a[0], setSelectedAttribute = _a[1];
    // const ramplInTheMap : feature[] = useSelector((state: globalState) => {
    //   //state.rampsInTheMap.filter(w => w.properties.material === state.rampsInTheMap);
    //   state.rampsInTheMap;
    // }); 
    var rampsInTheView = react_redux_1.useSelector(function (state) { return state.rampsInTheView; });
    var dispatch = react_redux_1.useDispatch();
    var handleMaterialPropertyClick = function (property) {
        dispatch(boatMapActions_1.selectMaterial(property));
        setSelectedAttribute(property);
    };
    var handleSizePropertyClick = function (property) {
        dispatch(boatMapActions_1.selectSize(property));
        setSelectedAttribute(property);
    };
    var clearPropertySelection = function () {
        dispatch(boatMapActions_1.clearSelection());
        setSelectedAttribute(null);
    };
    var getNumOfRampsInRange = function (min, max) {
        return rampsInTheView.features.filter(function (r) { return r.properties.area_ >= min && r.properties.area_ < max; }).length;
    };
    var getNumOfRampsWithMaterial = function (material) {
        return rampsInTheView.features.filter(function (r) { return r.properties.material === material; }).length;
    };
    var constructionMaterials = new Set(
    //boatData.features.map((r:feature) => r.properties.material)
    );
    return (react_1.default.createElement("div", { className: "right-panel" },
        react_1.default.createElement("div", null, "Click property xxx in the left column to filter"),
        react_1.default.createElement("table", { className: "ramps-table" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Construction material"),
                    react_1.default.createElement("th", null, "Number of ramps"))),
            react_1.default.createElement("tbody", null, Array.from(constructionMaterials).map(function (constructionMaterial) { return (react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { className: selectedAttribute === constructionMaterial
                        ? "selected"
                        : "unselected", onClick: function () {
                        return handleMaterialPropertyClick(constructionMaterial);
                    } }, constructionMaterial),
                react_1.default.createElement("th", null, getNumOfRampsWithMaterial(constructionMaterial)))); }))),
        react_1.default.createElement("table", { className: "ramps-table" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Size category"),
                    react_1.default.createElement("th", null, "Number of ramps"))),
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: selectedAttribute === "0-50" ? "selected" : "unselected", onClick: function () { return handleSizePropertyClick("0-50"); } }, "0 - 50"),
                    react_1.default.createElement("th", null, getNumOfRampsInRange(0, 50))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: selectedAttribute === "50-200" ? "selected" : "unselected", onClick: function () { return handleSizePropertyClick("50-200"); } }, "50 - 200"),
                    react_1.default.createElement("th", null, getNumOfRampsInRange(50, 200))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: selectedAttribute === "200-526" ? "selected" : "unselected", onClick: function () { return handleSizePropertyClick("200-526"); } }, "200 - 526"),
                    react_1.default.createElement("th", null, getNumOfRampsInRange(200, 526))))),
        react_1.default.createElement("button", { onClick: function () { return clearPropertySelection(); } }, "Clear Selection")));
};
exports.RightPanel = RightPanel;
