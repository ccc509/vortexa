import {
  ZOOM_MAP,
  SELECT_MATERIAL,
  SELECT_SIZE,
  CLEAR_SELECTION,
} from "../actionTypes";

export function zoomMap(bounds) {
  return {
    type: ZOOM_MAP,
    bounds,
  };
}

export function selectMaterial(material) {
  return {
    type: SELECT_MATERIAL,
    material,
  };
}

export function selectSize(size) {
  return {
    type: SELECT_SIZE,
    size,
  };
}

export function clearSelection() {
  return {
    type: CLEAR_SELECTION,
  };
}
