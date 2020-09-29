"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boat_ramps_json_1 = __importDefault(require("../data/boat_ramps.json"));
var redux_1 = require("redux");
var reducers_1 = __importDefault(require("./reducers"));
function congifureStore() {
    var ramps = boat_ramps_json_1.default;
    var materialSet = new Set(ramps.features.map(function (r) { return r.properties.material; }));
    var initialState = {
        ramps: ramps,
        materials: Array.from(materialSet),
        sizeIntervals: [
            { min: 0, max: 50 },
            { min: 50, max: 200 },
            { min: 200, max: 526 },
        ],
        selectedMaterials: [],
        selectedSizes: [],
    };
    return redux_1.createStore(reducers_1.default, initialState);
}
exports.default = congifureStore;
