import React, { useState } from "react";
import {
  clearSelection,
  selectMaterial,
  selectSize,
} from "../../redux/actions/boatMapActions";
import { useDispatch } from "react-redux";
import { RadialChart } from "react-vis";
import { getRampsToDisplay } from "../../constants/helper-functions";
import { LatLngBounds, map } from "leaflet";
import { MultiPolygon } from "geojson";
import {
  rightPanel,
  rampsTable,
  clearButton,
  rampsTableHeader,
  selectedProp,
  unselectedProp,
} from "../../constants/styles";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";
import { CategoryTable } from "./categoryTable";

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

  const selectedMaterials: string[] = useTypedSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes: number[][] = useTypedSelector(
    (state) => state.selectedSizes
  );
  const bounds: LatLngBounds = useTypedSelector((state) => state.bounds);
  const ramps: GeoJSON.FeatureCollection<MultiPolygon> = useTypedSelector(
    (state) => state.ramps
  );
  const materials: string[] = useTypedSelector((state) => state.materials);
  const sizeIntervals: number[][] = useTypedSelector(
    (state) => state.sizeIntervals
  );
  const rampsInTheView = getRampsToDisplay(
    ramps,
    selectedMaterials,
    selectedSizes,
    bounds
  );
  const dispatch = useDispatch();

  const clearPropertySelection = () => {
    dispatch(clearSelection());
    setSelectedAttributes([]);
  };

  const rampMaterialLookUp: Map<string, number> = new Map<
    string,
    number
  >();
  materials.forEach((material: string) => {
    rampMaterialLookUp.set(material, getNumOfRampsWithMaterial(rampsInTheView, material));
  });

  const rampSizeLookUp: Map<string, number> = new Map<
    string,
    number
  >();
  sizeIntervals.forEach((interval: number[]) => {
    rampSizeLookUp.set(interval[0] + "-" + interval[1], getNumOfRampsInRange(
      rampsInTheView,
      interval[0],
      interval[1]
    ));
  });

  return (
    <div className={rightPanel}>
      <CategoryTable categoryLookUp = {rampMaterialLookUp} title = "Material" selectAction = {selectMaterial} selectedAttributes={selectedMaterials}/>
      <CategoryTable 
        categoryLookUp = {rampSizeLookUp} 
        title = "Size Interval" 
        selectAction = {selectSize} 
        selectedAttributes={selectedSizes.map((interval : number[]) => interval[0] + "-" + interval[1])}/>
      <button className={clearButton} onClick={() => clearPropertySelection()}>
        Clear Selection
      </button>
    </div>
  );
};

export { RightPanel };
