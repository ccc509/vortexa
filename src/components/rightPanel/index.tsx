import { clearButton, rightPanel } from "../../constants/styles";
import {
  clearSelection,
  selectMaterial,
  selectSize,
} from "../../redux/actions/boatMapActions";
import {
  getNumOfRampsInRange,
  getNumOfRampsWithMaterial,
  getRampsToDisplay,
} from "../../constants/helper-functions";

import { CategoryTable } from "./categoryTable";
import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";

const RightPanel = () => {
  const selectedMaterials = useTypedSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = useTypedSelector(
    (state) => state.selectedSizes
  );
  const bounds = useTypedSelector((state) => state.bounds);
  const ramps = useTypedSelector(
    (state) => state.ramps
  );

  const rampsInTheView = getRampsToDisplay(
    ramps,
    selectedMaterials,
    selectedSizes,
    bounds
  );
  const materialLookups = useTypedSelector((state) => state.materials.map(material => ({
      name: material,
      count: getNumOfRampsWithMaterial(rampsInTheView, material)
  })));
  const rampSize = useTypedSelector(
    (state) => state.sizeIntervals.map(interval => ({
      name: interval[0] + "-" + interval[1],
      count: getNumOfRampsInRange(rampsInTheView, interval[0], interval[1])
    }))
  );
  const dispatch = useDispatch();

  return (
    <div className={rightPanel}>
      <CategoryTable
        categoryLookUp={materialLookups}
        title="Material"
        selectAction={selectMaterial}
        selectedAttributes={selectedMaterials}
      />
      <CategoryTable
        categoryLookUp={rampSize}
        title="Size Interval"
        selectAction={selectSize}
        selectedAttributes={selectedSizes.map(
          (interval: number[]) => interval[0] + "-" + interval[1]
        )}
      />
      <button
        className={clearButton}
        onClick={() => dispatch(clearSelection())}
      >
        Clear Selection
      </button>
    </div>
  );
};

export { RightPanel };
