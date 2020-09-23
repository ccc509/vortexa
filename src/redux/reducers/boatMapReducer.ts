import { Action, GlobalState } from "../../constants/types";
import {
  CLEAR_SELECTION,
  SELECT_MATERIAL,
  SELECT_SIZE,
  ZOOM_MAP,
} from "../actionTypes";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export function boatMapReducer(state: GlobalState, action: Action) {
  switch (action.type) {
    case ZOOM_MAP:
      return {
        ...state,
        bounds: action.bounds,
      };
    case SELECT_MATERIAL:
      return {
        ...state,
        selectedMaterials: [...state.selectedMaterials, action.material],
      const min = action.size.split("-")[0];
      const max = action.size.split("-")[1];

      return {
        ...state,
        selectedSizes: [...state.selectedSizes, [+min, +max]],
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        selectedMaterials: [],
        selectedSizes: [],
      };
    default:
      return state;
  }
}

export const useTypedSelector: TypedUseSelectorHook<GlobalState> = useSelector;
