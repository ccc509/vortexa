/* eslint import/no-webpack-loader-syntax: off */

import React from "react";
import { useDispatch } from "react-redux";
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
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";

const RightPanel = () => {
  // const worker = require('workerize-loader!./worker.js');
  // const instance = worker();

  // instance.expensive(1000).then((count:any) => {
  //     console.log(`Ran ${count} loops`)
  // })

  const selectedMaterials = useTypedSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = useTypedSelector((state) => state.selectedSizes);
  const rampsInTheView = useTypedSelector((state) =>
    getRampsToDisplay(
      state.ramps,
      state.selectedMaterials,
      state.selectedSizes,
      state.bounds
    )
  );

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
