import { LatLngBounds } from "leaflet";
import { MultiPolygon } from "geojson";
import { SizeInterval } from "../redux/types";

export type GlobalState = {
  ramps: GeoJSON.FeatureCollection<MultiPolygon>;
  materials: string[];
  sizeIntervals: SizeInterval[];
  selectedMaterials: string[];
  selectedSizes: SizeInterval[];
  bounds: LatLngBounds;
};
