import boatData from "../data/boat_ramps.json";
import { createStore } from "redux";
import rootReducer from "./reducers";

export default function congifureStore() {
  const ramps = boatData;
  const materialSet = new Set(ramps.features.map((r) => r.properties.material));

  const initialState = {
    ramps,
    materials: Array.from(materialSet),
    sizeIntervals: [
      [0, 50],
      [50, 200],
      [200, 526],
    ],
    selectedMaterials: [],
    selectedSizes: [],
  };

  return createStore(rootReducer, initialState);
}
