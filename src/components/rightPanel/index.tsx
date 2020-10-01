/* eslint import/no-webpack-loader-syntax: off */

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
import { createSelector } from "reselect";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";
import { GlobalState } from "../../constants/types";

const rampsInTheViewSelector = createSelector(
  (state: GlobalState) => state.ramps,
  (state: GlobalState) => state.selectedMaterials,
  (state: GlobalState) => state.selectedSizes,
  (state: GlobalState) => state.bounds,
  (ramps, selectedMaterials, selectedSizes, bounds) => {
    return getRampsToDisplay(ramps, selectedMaterials, selectedSizes, bounds);
  }
);

const rampsPerMaterialSelector = createSelector(
  rampsInTheViewSelector,
  (state: GlobalState) => state.materials,
  (ramps, materials) => {
    return materials.map((material) => ({
      name: material,
      count: getNumOfRampsWithMaterial(ramps, material),
    }));
  }
);

const rampsPerSizeIntervalSelector = createSelector(
  rampsInTheViewSelector,
  (state: GlobalState) => state.sizeIntervals,
  (ramps, sizeIntervals) => {
    return sizeIntervals.map((interval) => ({
      name: `${interval.min}-${interval.max}`,
      count: getNumOfRampsInRange(ramps, interval),
    }));
  }
);

const RightPanel = () => {
  console.log("Rendering right panel");

  const dispatch = useDispatch();
  const selectedMaterials = useTypedSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = useTypedSelector((state) => state.selectedSizes);
  const rampsPerMaterial = useTypedSelector(rampsPerMaterialSelector);
  const rampsPerSizeInterval = useTypedSelector(rampsPerSizeIntervalSelector);

  return (
    <div className={rightPanel}>
      <CategoryTable
        categoryLookUp={rampsPerMaterial}
        title="Material"
        selectAction={selectMaterial}
        selectedAttributes={selectedMaterials}
      />
      <CategoryTable
        categoryLookUp={rampsPerSizeInterval}
        title="Size Interval"
        selectAction={selectSize}
        selectedAttributes={selectedSizes.map(
          (interval) => `${interval.min}-${interval.max}`
        )}
      />
      <button
        className={clearButton}
        onClick={() => dispatch(clearSelection())}
        id="clearButton"
      >
        Clear Selection
      </button>
    </div>
  );
};

export { RightPanel };
