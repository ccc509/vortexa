import { createStore } from "redux";
import boatData from "../data/boat_ramps.json";
import rootReducer from "../bin/redux/reducers";

export default function congifureStore() {
  const ramps = boatData;
  const materialSet = new Set(ramps.features.map((r) => r.properties.material));

  const initialState = {
    ramps,
    materials: Array.from(materialSet),
    sizeIntervals: [
      { min: 0, max: 50 },
      { min: 50, max: 200 },
      { min: 200, max: 526 },
    ],
    selectedMaterials: [],
    selectedSizes: [],
  };

  return createStore(rootReducer, initialState);
}
