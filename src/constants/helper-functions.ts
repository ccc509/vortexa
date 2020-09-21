import { LatLngBounds } from "leaflet";

const shouldRampBeIncluded = (
  feature: any,
  selectedMaterials: string[],
  selectedSizes: number[][],
  bounds?: LatLngBounds
): boolean => {
  if (selectedMaterials && selectedMaterials.length) {
    if (!selectedMaterials.includes(feature.properties.material)) {
      return false;
    }
  }

  if (selectedSizes && selectedSizes.length) {
    if (
      !selectedSizes.some(
        (interval: number[]) =>
          feature.properties.area_ >= interval[0] &&
          feature.properties.area_ < interval[1]
      )
    ) {
      return false;
    }
  }

  if (
    bounds &&
    !feature.geometry.coordinates[0][0].some((c: number[]) =>
      bounds.contains([c[1], c[0]])
    )
  ) {
    return false;
  }

  return true;
};

export const getRampsToDisplay = (
  allRamps: GeoJSON.FeatureCollection<any>,
  selectedMaterials: string[],
  selectedSizes: number[][],
  bounds?: LatLngBounds
): GeoJSON.FeatureCollection<any> => {
  const rampsToDisplay: GeoJSON.FeatureCollection<any> = {
    type: "FeatureCollection",
    features: [],
  };

  allRamps.features.forEach((feature: any) => {
    if (
      shouldRampBeIncluded(feature, selectedMaterials, selectedSizes, bounds)
    ) {
      rampsToDisplay.features.push(feature);
    }
  });

  return rampsToDisplay;
};
