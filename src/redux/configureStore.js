import { createStore } from "redux";
import rootReducer from "./reducers";
import boatData from "../data/boat_ramps.json";
import { GlobalState } from "../constants/type-helpers";


export default function congifureStore() {

  const initialState = {

    // selectedMaterial: '',
    // features: boatData.features
  
    rampsInTheMap: boatData,
    rampsInTheView: boatData,
  };

  return createStore(rootReducer, initialState);
}
