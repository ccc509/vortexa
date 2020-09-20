import "./style.css";

import React, { useState } from "react";
import {
  clearSelection,
  selectMaterial,
  selectSize,
} from "../../redux/actions/boatMapActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../constants/type-helpers";

import { bindActionCreators } from "redux";
import { GeoJsonObject, GeoJSON } from "geojson";
//import boatData from "../../data/boat_ramps.json";

const RightPanel = () => {
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(
    null
  );
  // const ramplInTheMap : feature[] = useSelector((state: globalState) => {
  //   //state.rampsInTheMap.filter(w => w.properties.material === state.rampsInTheMap);
  //   state.rampsInTheMap;
  // }); 
  const rampsInTheView : GeoJSON.FeatureCollection<any> = useSelector((state: GlobalState) => state.rampsInTheView); 
  const dispatch = useDispatch();

  const handleMaterialPropertyClick = (property: string) => {
    dispatch(selectMaterial(property));
    setSelectedAttribute(property);
  };

  const handleSizePropertyClick = (property: string) => {
    dispatch(selectSize(property));
    setSelectedAttribute(property);
  };

  const clearPropertySelection = () => {
    dispatch(clearSelection());
    setSelectedAttribute(null);
  };

  const getNumOfRampsInRange = (min: number, max: number) => {
    return rampsInTheView.features.filter(
      (r : any) => r.properties.area_ >= min && r.properties.area_ < max
    ).length;
  };

  const getNumOfRampsWithMaterial = (material: string) => {
    return rampsInTheView.features.filter(
      (r : any) => r.properties.material === material
    ).length;
  };

  const constructionMaterials : Set<string> = new Set(
    //boatData.features.map((r:feature) => r.properties.material)
  );

  return (
    <div className="right-panel">
      <div>Click property xxx in the left column to filter</div>

      <table className="ramps-table">
        <thead>
          <tr>
            <th>Construction material</th>
            <th>Number of ramps</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(constructionMaterials).map((constructionMaterial) => (
            <tr>
              <th
                className={
                  selectedAttribute === constructionMaterial
                    ? "selected"
                    : "unselected"
                }
                onClick={() =>
                  handleMaterialPropertyClick(constructionMaterial)
                }
              >
                {constructionMaterial}
              </th>
              <th>{getNumOfRampsWithMaterial(constructionMaterial)}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="ramps-table">
        <thead>
          <tr>
            <th>Size category</th>
            <th>Number of ramps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              className={
                selectedAttribute === "0-50" ? "selected" : "unselected"
              }
              onClick={() => handleSizePropertyClick("0-50")}
            >
              0 - 50
            </th>
            <th>{getNumOfRampsInRange(0, 50)}</th>
          </tr>
          <tr>
            <th
              className={
                selectedAttribute === "50-200" ? "selected" : "unselected"
              }
              onClick={() => handleSizePropertyClick("50-200")}
            >
              50 - 200
            </th>
            <th>{getNumOfRampsInRange(50, 200)}</th>
          </tr>
          <tr>
            <th
              className={
                selectedAttribute === "200-526" ? "selected" : "unselected"
              }
              onClick={() => handleSizePropertyClick("200-526")}
            >
              200 - 526
            </th>
            <th>{getNumOfRampsInRange(200, 526)}</th>
          </tr>
        </tbody>
      </table>

      <button onClick={() => clearPropertySelection()}>Clear Selection</button>
    </div>
  );
}


export { RightPanel };
