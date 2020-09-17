import React, { useState } from "react";
import "./style.css";
import { connect } from "react-redux";
import {selectMaterial, selectSize, clearSelection} from "../../redux/actions/boatMapActions";
import boatData from "../../data/boat_ramps.json";
import { globalState, features } from "../../constants/type-helpers";
import { bindActionCreators } from "redux";

type Props = {
    rampsInTheMap : features[],
    rampsInTheView: features[],
    selectMaterial: (material: string) => void,
    selectSize: (size: string) => void,
    clearSelection: () => void
}

function RightPanel(props : Props) {
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  const handleMaterialPropertyClick = (property : string) => {
    props.selectMaterial(property);
    setSelectedAttribute(property);
  };

  const handleSizePropertyClick = (property : string) => {
    props.selectSize(property);
    setSelectedAttribute(property);
  };

  const clearPropertySelection = () => {
    props.clearSelection();
    setSelectedAttribute(null);
  };

  const getNumOfRampsInRange = (min : number, max : number) => {
    return props.rampsInTheView.filter(
      (r) => r.properties.area_ >= min && r.properties.area_ < max
    ).length;
  };

  const getNumOfRampsWithMaterial = (material : string) => {
    return props.rampsInTheView.filter(
      (r) => r.properties.material === material
    ).length;
  };

  const constructionMaterials = new Set(
    boatData.features.map((r) => r.properties.material)
  );

  return (
    <div className="right-panel">
      <div>Click property in the left column to filter</div>

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

function mapStateToProps(state : globalState) {
  return {
    rampsInTheMap: state.rampsInTheMap
      ? state.rampsInTheMap
      : boatData.features,
    rampsInTheView: state.rampsInTheView
      ? state.rampsInTheView
      : boatData.features,
  };
}

function mapDispatchToProps(dispatch: any) {
    bindActionCreators(
      {
        selectMaterial, 
        selectSize, 
        clearSelection
      },
      dispatch
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
