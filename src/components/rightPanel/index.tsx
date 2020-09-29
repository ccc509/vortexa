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
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";
import { GlobalState } from "../../constants/types";

const getRampsInTheView = createSelector(
  (state: GlobalState) => state.ramps,
  (state: GlobalState) => state.selectedMaterials,
  (state: GlobalState) => state.selectedSizes,
  (state: GlobalState) => state.bounds,
  (ramps, selectedMaterials, selectedSizes, bounds) => {
    return getRampsToDisplay(ramps, selectedMaterials, selectedSizes, bounds);
  }
);

const RightPanel = () => {
  const selectedMaterials = useTypedSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = useTypedSelector((state) => state.selectedSizes);

  console.log("Rendering right panel");

  const rampsInTheView = useTypedSelector((state) => getRampsInTheView(state));
  const materialLookups = useTypedSelector((state) =>
    state.materials.map((material) => ({
      name: material,
      count: getNumOfRampsWithMaterial(rampsInTheView, material),
    }))
  );
  const rampSize = useTypedSelector((state) =>
    state.sizeIntervals.map((interval) => ({
      name: `${interval.min}-${interval.max}`,
      count: getNumOfRampsInRange(rampsInTheView, interval),
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
