import { GeoJsonObject, GeoJSON } from "geojson";

export type GlobalState = {
  rampsInTheMap: GeoJSON.FeatureCollection<any>
  rampsInTheView: GeoJSON.FeatureCollection<any>
  selectedMaterials: string[]
  selectedSizes: number[][]
};

export type Feature = {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][][];
  };
  properties: {
    material: string;
    area_: number;
  };
};

export type Action = {
  type: string,
  material: string,
  size: string
}
