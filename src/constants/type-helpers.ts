import { LatLngBounds } from "leaflet";

export type GlobalState = {
  ramps: GeoJSON.FeatureCollection<any>;
  materials: string[];
  sizeIntervals: number[][];
  selectedMaterials: string[];
  selectedSizes: number[][];
  bounds: LatLngBounds;
};

export type Action = {
  type: string;
  material: string;
  size: string;
  bounds: LatLngBounds;
};
