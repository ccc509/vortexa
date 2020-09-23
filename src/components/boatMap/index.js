"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoatMap = void 0;
var react_leaflet_1 = require("react-leaflet");
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var helper_functions_1 = require("../../constants/helper-functions");
var object_hash_1 = __importDefault(require("object-hash"));
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
//import {boatMapx} from "../../constants/styles";
var getCentreOfView = function (_a) {
  var features = _a.features;
  var avgLat =
    features
      .map(function (_a) {
        var geometry = _a.geometry;
        return geometry.coordinates[0][0][0][0];
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0) / features.length;
  var avgLong =
    features
      .map(function (_a) {
        var geometry = _a.geometry;
        return geometry.coordinates[0][0][0][1];
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0) / features.length;
  return [avgLong, avgLat];
};
var BoatMap = function () {
  var dispatch = react_redux_1.useDispatch();
  var boatMap = "boatMap";
  var selectedMaterials = react_redux_1.useSelector(function (state) {
    return state.selectedMaterials;
  });
  var selectedSizes = react_redux_1.useSelector(function (state) {
    return state.selectedSizes;
  });
  var allRamps = react_redux_1.useSelector(function (state) {
    return state.ramps;
  });
  var rampsToDisplay = helper_functions_1.getRampsToDisplay(
    allRamps,
    selectedMaterials,
    selectedSizes
  );
  var _a = react_1.useState(getCentreOfView(allRamps)),
    center = _a[0],
    setCenter = _a[1];
  react_1.useEffect(function () {
    if (rampsToDisplay.features.length > 0) {
      setCenter(getCentreOfView(rampsToDisplay));
    }
  }, []);
  react_1.useEffect(
    function () {
      if (rampsToDisplay.features.length > 0) {
        setCenter(getCentreOfView(rampsToDisplay));
      }
    },
    [rampsToDisplay.features.length]
  );
  return react_1.default.createElement(
    react_leaflet_1.Map,
    {
      onzoomend: function (e) {
        return dispatch(boatMapActions_1.zoomMap(e.target.getBounds()));
      },
      center: center,
      zoom: 10,
    },
    react_1.default.createElement(react_leaflet_1.TileLayer, {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
    react_1.default.createElement(react_leaflet_1.GeoJSON, {
      key: object_hash_1.default(rampsToDisplay),
      data: rampsToDisplay,
    })
  );
};
exports.BoatMap = BoatMap;
