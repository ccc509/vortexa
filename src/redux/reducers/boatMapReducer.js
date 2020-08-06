import {
  ZOOM_MAP,
  SELECT_MATERIAL,
  SELECT_SIZE,
  CLEAR_SELECTION,
} from "../actionTypes";
import boatData from "../../data/boat_ramps.json";

const initialState = {
  rampsInTheMap: boatData.features,
  rampsInTheView: boatData.features,
};

export default function boatMapReducer(state = initialState, action) {
  switch (action.type) {
    case ZOOM_MAP:
      const rampsInTheCurrView = [];
      state.rampsInTheMap.forEach((feature) => {
        if (
          feature.geometry.coordinates[0][0].some((c) =>
            action.bounds.contains([c[1], c[0]])
          )
        ) {
          rampsInTheCurrView.push(feature);
        }
      });
      return {
        ...state,
        rampsInTheView: rampsInTheCurrView,
      };
    case SELECT_MATERIAL:
      const rampsWithSelectedMaterial = boatData.features.filter(
        (r) => r.properties.material === action.material
      );
      return {
        ...state,
        rampsInTheMap: rampsWithSelectedMaterial,
      };
    case SELECT_SIZE:
      const min = action.size.split("-")[0];
      const max = action.size.split("-")[1];
      const rampsWithSelectedSize = boatData.features.filter(
        (r) => r.properties.area_ >= min && r.properties.area_ < max
      );
      return {
        ...state,
        rampsInTheMap: rampsWithSelectedSize,
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        rampsInTheMap: boatData.features,
      };
    default:
      return state;
  }
}
