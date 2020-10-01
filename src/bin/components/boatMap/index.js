"use strict";
/* eslint import/no-webpack-loader-syntax: off */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoatMap = void 0;
var react_leaflet_1 = require("react-leaflet");
var react_1 = __importStar(require("react"));
var helper_functions_1 = require("../../constants/helper-functions");
var reselect_1 = require("reselect");
var object_hash_1 = __importDefault(require("object-hash"));
var react_redux_1 = require("react-redux");
var boatMapReducer_1 = require("../../redux/reducers/boatMapReducer");
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var rampsInTheViewSelector = reselect_1.createSelector(function (state) { return state.ramps; }, function (state) { return state.selectedMaterials; }, function (state) { return state.selectedSizes; }, function (ramps, selectedMaterials, selectedSizes) { return helper_functions_1.getRampsToDisplay(ramps, selectedMaterials, selectedSizes); });
var BoatMap = function () {
    console.log("Rendering boat map");
    var dispatch = react_redux_1.useDispatch();
    var rampsToDisplay = boatMapReducer_1.useTypedSelector(rampsInTheViewSelector);
    var data = boatMapReducer_1.useTypedSelector(function (s) { return helper_functions_1.getCentreOfView(s.ramps); });
    var _a = react_1.useState(data), centre = _a[0], setCentre = _a[1];
    react_1.useEffect(function () {
        if (rampsToDisplay.features.length > 0) {
            setCentre(helper_functions_1.getCentreOfView(rampsToDisplay));
        }
    }, [rampsToDisplay.features.length]);
    return (react_1.default.createElement(react_leaflet_1.Map, { onzoomend: function (e) { return dispatch(boatMapActions_1.zoomMap(e.target.getBounds())); }, center: centre, zoom: 10 },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }),
        react_1.default.createElement(react_leaflet_1.GeoJSON, { key: object_hash_1.default(rampsToDisplay), data: rampsToDisplay })));
};
exports.BoatMap = BoatMap;
//# sourceMappingURL=index.js.map