import { LatLngBounds } from "leaflet";
import { Feature, GeoJsonProperties, MultiPolygon } from "geojson";
import { SizeInterval } from "../redux/types";

const isMaterialOk = (
  feature: Feature<MultiPolygon, GeoJsonProperties>,
  selectedMaterials: string[]
) =>
  selectedMaterials.length === 0 ||
  (feature.properties &&
    selectedMaterials.includes(feature.properties.material));

const isSizeOk = (
  feature: Feature<MultiPolygon, GeoJsonProperties>,
  selectedSizes: SizeInterval[]
) =>
  selectedSizes.length === 0 ||
  selectedSizes.some(
    (interval) =>
      feature.properties &&
      feature.properties.area_ >= interval.min &&
      feature.properties.area_ < interval.max
  );
const isBoundsOk = (
  feature: Feature<MultiPolygon, GeoJsonProperties>,
  bounds?: LatLngBounds
) => {
  if (!bounds) {
    return true;
  } else {
    return feature.geometry.coordinates[0][0].some((c) =>
      bounds.contains([c[1], c[0]])
    );
  }
};

export const getRampsToDisplay = (
  allRamps: GeoJSON.FeatureCollection<MultiPolygon>,
  selectedMaterials: string[],
  selectedSizes: SizeInterval[],
  bounds?: LatLngBounds
): GeoJSON.FeatureCollection<MultiPolygon> => {
  console.log(selectedSizes);
  return {
    type: "FeatureCollection",
    features: allRamps.features.filter(
      (feature) =>
        isMaterialOk(feature, selectedMaterials) &&
        isSizeOk(feature, selectedSizes) &&
        isBoundsOk(feature, bounds)
    ),
  };
};

export const getNumOfRampsWithMaterial = (
  rampsInTheView: GeoJSON.FeatureCollection<MultiPolygon>,
  material: string
) => {
  return rampsInTheView.features.filter(
    (r: Feature<MultiPolygon, GeoJsonProperties>) =>
      r.properties && r.properties.material === material
  ).length;
};

export const getNumOfRampsInRange = (
  rampsInTheView: GeoJSON.FeatureCollection<MultiPolygon>,
  interval: SizeInterval
) => {
  return rampsInTheView.features.filter(
    (r: Feature<MultiPolygon, GeoJsonProperties>) =>
      r.properties &&
      r.properties.area_ >= interval.min &&
      r.properties.area_ < interval.max
  ).length;
};
