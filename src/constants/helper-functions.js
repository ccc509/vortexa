Object.defineProperty(exports, "__esModule", { value: true });
exports.getRampsToDisplay = void 0;
function shouldRampBeIncluded(
  feature,
  selectedMaterials,
  selectedSizes,
  bounds
) {
  if (selectedMaterials && selectedMaterials.length) {
    if (!selectedMaterials.includes(feature.properties.material)) {
      return false;
    }
  }
  if (selectedSizes && selectedSizes.length) {
    if (
      !selectedSizes.some(
        (interval) =>
          feature.properties.area_ >= interval[0] &&
          feature.properties.area_ < interval[1]
      )
    ) {
      return false;
    }
  }
  if (
    bounds &&
    !feature.geometry.coordinates[0][0].some((c) =>
      bounds.contains([c[1], c[0]])
    )
  ) {
    return false;
  }
  return true;
}
function getRampsToDisplay(allRamps, selectedMaterials, selectedSizes, bounds) {
  const rampsToDisplay = {
    type: "FeatureCollection",
    features: [],
  };
  allRamps.features.forEach((feature) => {
    if (
      shouldRampBeIncluded(feature, selectedMaterials, selectedSizes, bounds)
    ) {
      rampsToDisplay.features.push(feature);
    }
  });
  return rampsToDisplay;
}
exports.getRampsToDisplay = getRampsToDisplay;
