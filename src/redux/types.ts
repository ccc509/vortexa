import { LatLngBounds } from "leaflet";

export const ZOOM_MAP = "ZOOM_MAP";
export const SELECT_MATERIAL = "SELECT_MATERIAL";
export const SELECT_SIZE = "SELECT_SIZE";
export const CLEAR_SELECTION = "CLEAR_SELECTION";

export type SizeInterval = {
  min: number;
  max: number;
};

export type ZoomMapAction = {
  type: typeof ZOOM_MAP;
  payload: LatLngBounds;
};

export type SelectMaterialAction = {
  type: typeof SELECT_MATERIAL;
  payload: string;
};

export type SelectSizeAction = {
  type: typeof SELECT_SIZE;
  payload: string;
};

export type ClearSelectionAction = {
  type: typeof CLEAR_SELECTION;
};

export type ActionTypes =
  | ZoomMapAction
  | SelectMaterialAction
  | SelectSizeAction
  | ClearSelectionAction;
