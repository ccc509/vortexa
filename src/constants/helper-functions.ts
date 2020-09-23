import { LatLngBounds } from "leaflet";
import { MultiPolygon } from "geojson";

const isMaterialOk = (feature: any, selectedMaterials: string[]) =>
  selectedMaterials.length === 0 ||
  selectedMaterials.includes(feature.properties.material);

const isSizeOk = (feature: any, selectedSizes: number[][]) =>
  selectedSizes.length === 0 ||
  selectedSizes.some(
    (interval: number[]) =>
      feature.properties.area_ >= interval[0] &&
      feature.properties.area_ < interval[1]
  );
const isBoundsOk = (feature: any, bounds?: LatLngBounds) => {
  if (!bounds) {
    return true;
  } else {
    return feature.geometry.coordinates[0][0].some((c: number[]) =>
      bounds.contains([c[1], c[0]])
    );
  }
};

// bounds && feature.geometry.coordinates[0][0].some((c: number[]) =>
//     bounds.contains([c[1], c[0]])
//   )

export const getRampsToDisplay = (
  allRamps: GeoJSON.FeatureCollection<MultiPolygon>,
  selectedMaterials: string[],
  selectedSizes: number[][],
  bounds?: LatLngBounds
): GeoJSON.FeatureCollection<MultiPolygon> => ({
  type: "FeatureCollection",
  features: allRamps.features.filter(
    (feature) =>
      isMaterialOk(feature, selectedMaterials) &&
      isSizeOk(feature, selectedSizes) &&
      isBoundsOk(feature, bounds)
  ),
});
