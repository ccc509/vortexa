import {
  CLEAR_SELECTION,
  SELECT_MATERIAL,
  SELECT_SIZE,
  ZOOM_MAP,
} from "../types";

import { LatLngBounds } from "leaflet";
import { ActionTypes } from "../types";

export const zoomMap = (bounds: LatLngBounds): ActionTypes => ({
  type: ZOOM_MAP,
  payload: bounds,
});

export const selectMaterial = (material: string): ActionTypes => ({
  type: SELECT_MATERIAL,
  payload: material,
});

export const selectSize = (sizeInterval: string): ActionTypes => ({
  type: SELECT_SIZE,
  payload: sizeInterval,
});

export const clearSelection = (): ActionTypes => ({
  type: CLEAR_SELECTION,
});
