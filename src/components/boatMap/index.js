"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_leaflet_1 = require("react-leaflet");
require("./style.css");
var react_redux_1 = require("react-redux");
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var object_hash_1 = __importDefault(require("object-hash"));
var helper_functions_1 = require("../../constants/helper-functions");
var getCentreOfView = function (rampsToDisplay) {
    var latitudes = [];
    var longitudes = [];
    rampsToDisplay.features.forEach(function (feature) {
        feature.geometry.coordinates[0][0].forEach(function (c) {
            latitudes.push(c[0]);
            longitudes.push(c[1]);
        });
    });
    var avgLatitude = latitudes.reduce(function (a, b) { return a + b; }, 0) / latitudes.length;
    var avgLongitude = longitudes.reduce(function (a, b) { return a + b; }, 0) / longitudes.length;
    return [avgLongitude, avgLatitude];
};
function BoatMap() {
    var dispatch = react_redux_1.useDispatch();
    var handleZooming = function (e) {
        dispatch(boatMapActions_1.zoomMap(e.target.getBounds()));
    };
    var selectedMaterials = react_redux_1.useSelector(function (state) { return state.selectedMaterials; });
    var selectedSizes = react_redux_1.useSelector(function (state) { return state.selectedSizes; });
    var allRamps = react_redux_1.useSelector(function (state) { return state.ramps; });
    var rampsToDisplay = helper_functions_1.getRampsToDisplay(allRamps, selectedMaterials, selectedSizes);
    return (react_1.default.createElement(react_leaflet_1.Map, { onzoomend: handleZooming, center: getCentreOfView(rampsToDisplay), zoom: 10 },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }),
        react_1.default.createElement(react_leaflet_1.GeoJSON, { key: object_hash_1.default(rampsToDisplay), data: rampsToDisplay })));
}
exports.default = react_redux_1.connect()(BoatMap);
