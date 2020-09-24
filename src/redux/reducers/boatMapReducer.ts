import { GlobalState } from "../../constants/types";

import {
  ActionTypes,
  CLEAR_SELECTION,
  SELECT_MATERIAL,
  SELECT_SIZE,
  ZOOM_MAP,
} from "../types";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export function boatMapReducer(state: GlobalState, action: ActionTypes) {
  switch (action.type) {
    case ZOOM_MAP:
      return {
        ...state,
        bounds: action.payload,
      };
    case SELECT_MATERIAL:
      return {
        ...state,
        selectedMaterials: [...state.selectedMaterials, action.payload],
      };
    case SELECT_SIZE:
      const min = action.payload.split("-")[0];
      const max = action.payload.split("-")[1];
      return {
        ...state,
        selectedSizes: [...state.selectedSizes, { min: +min, max: +max }],
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
