import { LatLngBounds } from "leaflet";
import { MultiPolygon } from "geojson";

export type GlobalState = {
  ramps: GeoJSON.FeatureCollection<MultiPolygon>;
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
