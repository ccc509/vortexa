import React, { useState } from "react";
import "./style.css";
import { connect } from "react-redux";
import * as bootMapActions from "../../redux/actions/boatMapActions";

function RightPanel(props) {

  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const handleAttributeClick = (e) =>{
    props.dispatch(bootMapActions.zoomMap(e.target.getBounds()));
  }

  const constructionMaterials = new Set(props.rampsInTheMap.map(r => r.properties.material));

  return (
    <>
      <div>Click the left column attribute to filter</div>
      
      <table className="quality-control-result-table">
      <thead>
        <tr>
          <th>Construction material</th>
          <th>Number of ramps</th>
        </tr>
      </thead>
      <tbody>
      </tbody>

      </table>

      <table className="quality-control-result-table">
      <thead>
        <tr>
          <th>Construction material</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
      </tbody>

      </table>

      <button>Clear Selection</button>
    </>
  );
}

function mapStateToProps(state){
  return {
    rampsInTheMap: state.rampsInTheMap,
    rampsInTheView: state.rampsInTheView
  }
}
//mapDispatchToProps
export default connect(mapStateToProps)(RightPanel);
