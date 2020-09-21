const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_leaflet_1 = require("react-leaflet");
require("./style.css");
const react_redux_1 = require("react-redux");
const boatMapActions_1 = require("../../redux/actions/boatMapActions");
const object_hash_1 = __importDefault(require("object-hash"));
const helper_functions_1 = require("../../constants/helper-functions");

const getCentreOfView = function (rampsToDisplay) {
  const latitudes = [];
  const longitudes = [];
  rampsToDisplay.features.forEach((feature) => {
    feature.geometry.coordinates[0][0].forEach((c) => {
      latitudes.push(c[0]);
      longitudes.push(c[1]);
    });
  });
  const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
  const avgLongitude =
    longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
  return [avgLongitude, avgLatitude];
};
function BoatMap() {
  console.log("Boat map");
  const dispatch = react_redux_1.useDispatch();
  const handleZooming = function (e) {
    dispatch(boatMapActions_1.zoomMap(e.target.getBounds()));
  };
  const selectedMaterials = react_redux_1.useSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = react_redux_1.useSelector(
    (state) => state.selectedSizes
  );
  const allRamps = react_redux_1.useSelector((state) => state.ramps);
  console.log({ selectedMaterials, selectedSizes });
  const rampsToDisplay = helper_functions_1.getRampsToDisplay(
    allRamps,
    selectedMaterials,
    selectedSizes
  );
  return react_1.default.createElement(
    react_leaflet_1.Map,
    {
      onzoomend: handleZooming,
      center: getCentreOfView(rampsToDisplay),
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
}
exports.default = react_redux_1.connect()(BoatMap);
