import React, { useState } from "react";
import {
  clearSelection,
  selectMaterial,
  selectSize,
} from "../../redux/actions/boatMapActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../constants/type-helpers";
import { RadialChart } from "react-vis";
import { getRampsToDisplay } from "../../constants/helper-functions";
import { LatLngBounds } from "leaflet";
import { MultiPolygon } from "geojson";
import { rightPanel, rampsTable, clearButton, rampsTableHeader, selectedProp, unselectedProp } from "../../constants/styles"

const getNumOfRampsWithMaterial = (
  rampsInTheView: GeoJSON.FeatureCollection<MultiPolygon>,
  material: string
) => {
  return rampsInTheView.features.filter(
    (r: any) => r.properties.material === material
  ).length;
};

const getNumOfRampsInRange = (
  rampsInTheView: GeoJSON.FeatureCollection<MultiPolygon>,
  min: number,
  max: number
) => {
  return rampsInTheView.features.filter(
    (r: any) => r.properties.area_ >= min && r.properties.area_ < max
  ).length;
};

const RightPanel = () => {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const selectedMaterials: string[] = useSelector(
    (state: GlobalState) => state.selectedMaterials
  );
  const selectedSizes: number[][] = useSelector(
    (state: GlobalState) => state.selectedSizes
  );
  const bounds: LatLngBounds = useSelector(
    (state: GlobalState) => state.bounds
  );
  const ramps: GeoJSON.FeatureCollection<MultiPolygon> = useSelector(
    (state: GlobalState) => state.ramps
  );
  const materials: string[] = useSelector(
    (state: GlobalState) => state.materials
  );
  const sizeIntervals: number[][] = useSelector(
    (state: GlobalState) => state.sizeIntervals
  );
  const rampsInTheView = getRampsToDisplay(
    ramps,
    selectedMaterials,
    selectedSizes,
    bounds
  );
  const dispatch = useDispatch();

  const handleMaterialPropertyClick = (property: string) => {
    dispatch(selectMaterial(property));
    const updatedSelectedAttributes = [...selectedAttributes, property];
    setSelectedAttributes(updatedSelectedAttributes);
  };

  const handleSizePropertyClick = (property: string) => {
    dispatch(selectSize(property));
    const updatedSelectedAttributes = [...selectedAttributes, property];
    setSelectedAttributes(updatedSelectedAttributes);
  };

  const clearPropertySelection = () => {
    dispatch(clearSelection());
    setSelectedAttributes([]);
  };

  const numOfRampsMaterialLookUp: Map<string, number> = new Map<
    string,
    number
  >();
  const pieChartDataForRampMaterial: { angle: number }[] = [];
  materials.forEach((material: string) => {
    const count = getNumOfRampsWithMaterial(rampsInTheView, material);
    numOfRampsMaterialLookUp.set(material, count);
    pieChartDataForRampMaterial.push({ angle: count });
  });

  const numOfRampsSizeLookUp: Map<string, number> = new Map<string, number>();
  const pieChartDataForRampSize: { angle: number }[] = [];
  sizeIntervals.forEach((interval: number[]) => {
    const count = getNumOfRampsInRange(
      rampsInTheView,
      interval[0],
      interval[1]
    );
    numOfRampsSizeLookUp.set(interval[0] + "-" + interval[1], count);
    pieChartDataForRampSize.push({ angle: count });
  });

  return (
    <div className={rightPanel}>
      <table className={rampsTable}>
        <thead>
          <tr>
            <th className={rampsTableHeader}>Material</th>
            <th className={rampsTableHeader}>Number of ramps</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((constructionMaterial: string) => (
            <tr>
              <th
                className={
                  selectedAttributes.includes(constructionMaterial)
                    ? selectedProp
                    : unselectedProp
                }
                onClick={() =>
                  handleMaterialPropertyClick(constructionMaterial)
                }
              >
                {constructionMaterial}
              </th>
              <th>{numOfRampsMaterialLookUp.get(constructionMaterial)}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <RadialChart
        data={pieChartDataForRampMaterial}
        width={280}
        height={280}
      />
      <table className={rampsTable}>
        <thead>
          <tr>
            <th className={rampsTableHeader}>Size category</th>
            <th className={rampsTableHeader}>Number of ramps</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(sizeIntervals).map((interval: number[]) => (
            <tr>
              <th
                className={
                  selectedAttributes.includes(interval[0] + "-" + interval[1])
                    ? selectedProp
                    : unselectedProp
                }
                onClick={() =>
                  handleSizePropertyClick(interval[0] + "-" + interval[1])
                }
              >
                {interval[0] + "-" + interval[1]}
              </th>
              <th>
                {numOfRampsSizeLookUp.get(interval[0] + "-" + interval[1])}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <RadialChart data={pieChartDataForRampSize} width={280} height={280} />
      <button
        className={clearButton}
        onClick={() => clearPropertySelection()}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default connect()(RightPanel);
