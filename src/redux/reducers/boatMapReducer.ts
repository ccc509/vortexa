import {
  ZOOM_MAP,
  SELECT_MATERIAL,
  SELECT_SIZE,
  CLEAR_SELECTION,
} from "../actionTypes";

import {
  GlobalState,
  Feature,
  Action
} from "../../constants/type-helpers"

export default function boatMapReducer(state : GlobalState, action : Action) {
  switch (action.type) {
    case ZOOM_MAP:
      const rampsInTheCurrView : Feature[] = [];
      // state.rampsInTheMap.forEach((feature) => {
      //   if (
      //     feature.geometry.coordinates[0][0].some((c) =>
      //       action.bounds.contains([c[1], c[0]])
      //     )
      //   ) {
      //     rampsInTheCurrView.push(feature);
      //   }
      // });
      return {
        ...state,
        rampsInTheView: rampsInTheCurrView,
      };
    case SELECT_MATERIAL:
      // const rampsWithSelectedMaterial = boatData.features.filter(
      //   (r) => r.properties.material === action.material
      // );
      const updatedSelectedMaterials : string[] = state.selectedMaterials;
      updatedSelectedMaterials.push(action.material);

      return {
        ...state,
        selectedMaterials : updatedSelectedMaterials
      };
    case SELECT_SIZE:
      const min = action.size.split("-")[0];
      const max = action.size.split("-")[1];

      // const rampsWithSelectedSize = boatData.features.filter(
      //   (r) => r.properties.area_ >= min && r.properties.area_ < max
      // );

      const updatedSelectedSizes : number[][] = state.selectedSizes;
      updatedSelectedSizes.push([+min, +max]);

      return {
        ...state,
        selectedSizes: updatedSelectedSizes,
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        selectedMaterials: [],
        selectedSizes: []
      };
    default:
      return state;
  }
}
