import {
  CLEAR_SELECTION,
  SELECT_MATERIAL,
  SELECT_SIZE,
  ZOOM_MAP,
} from "../actionTypes";

import { LatLngBounds } from "leaflet";

export const zoomMap = (bounds: LatLngBounds) => ({
    type: ZOOM_MAP,
    bounds,
  });

export const selectMaterial = (material: string) => ({
    type: SELECT_MATERIAL,
    material,
  });

export const selectSize = (size: string) => ({
    type: SELECT_SIZE,
    size,
  })

export const clearSelection = () => ({
    type: CLEAR_SELECTION,
  });

