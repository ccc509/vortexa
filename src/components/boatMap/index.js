"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_leaflet_1 = require("react-leaflet");
require("./style.css");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var object_hash_1 = __importDefault(require("object-hash"));
function BoatMap(props) {
    var handleZooming = function (e) {
        //props.zoomMap(e.target.getBounds());
    };
    var getCentreOfView = function () {
        var latitudes = [];
        var longitudes = [];
        props.rampsInTheMap.forEach(function (feature) {
            feature.geometry.coordinates[0][0].forEach(function (c) {
                latitudes.push(c[0]);
                longitudes.push(c[1]);
            });
        });
        var avgLatitude = latitudes.reduce(function (a, b) { return a + b; }, 0) / latitudes.length;
        var avgLongitude = longitudes.reduce(function (a, b) { return a + b; }, 0) / longitudes.length;
        return [avgLongitude, avgLatitude];
    };
    return (react_1.default.createElement(react_leaflet_1.Map, { onzoomend: handleZooming, center: getCentreOfView(), zoom: 10 },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }),
        react_1.default.createElement(react_leaflet_1.GeoJSON, { key: object_hash_1.default(props.rampsInTheMap), data: props.rampsInTheMap })));
}
function mapStateToProps(state) {
    return {
        rampsInTheMap: state.rampsInTheMap
        // ? state.rampsInTheMap
        // : boatData.features,
    };
}
function mapDispatchToProps(dispatch) {
    redux_1.bindActionCreators({
        zoomMap: boatMapActions_1.zoomMap,
    }, dispatch);
}
//export default connect(mapStateToProps, mapDispatchToProps)(BoatMap);
exports.default = react_redux_1.connect(mapStateToProps)(BoatMap);
