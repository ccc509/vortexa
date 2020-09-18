"use strict";
exports.__esModule = true;
exports.RightPanel = void 0;
require("./style.css");
var react_1 = require("react");
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var react_redux_1 = require("react-redux");
var boat_ramps_json_1 = require("../../data/boat_ramps.json");
var RightPanel = function () {
    var _a = react_1.useState(null), selectedAttribute = _a[0], setSelectedAttribute = _a[1];
    // const ramplInTheMap : feature[] = useSelector((state: globalState) => {
    //   //state.rampsInTheMap.filter(w => w.properties.material === state.rampsInTheMap);
    //   state.rampsInTheMap;
    // }); 
    var rampsInTheView = react_redux_1.useSelector(function (state) { return state.rampsInTheView ? state.rampsInTheView : boat_ramps_json_1["default"].features; });
    var dispatch = react_redux_1.useDispatch();
    var handleMaterialPropertyClick = function (property) {
        dispatch(boatMapActions_1.selectMaterial(property));
        setSelectedAttribute(property);
    };
    var handleSizePropertyClick = function (property) {
        dispatch(boatMapActions_1.selectSize(property));
        setSelectedAttribute(property);
    };
    var clearPropertySelection = function () {
        dispatch(boatMapActions_1.clearSelection());
        setSelectedAttribute(null);
    };
    var getNumOfRampsInRange = function (min, max) {
        return rampsInTheView.filter(function (r) { return r.properties.area_ >= min && r.properties.area_ < max; }).length;
    };
    var getNumOfRampsWithMaterial = function (material) {
        return rampsInTheView.filter(function (r) { return r.properties.material === material; }).length;
    };
    var constructionMaterials = new Set(boat_ramps_json_1["default"].features.map(function (r) { return r.properties.material; }));
    return (<div className="right-panel">
      <div>Click property in the left column to filter</div>

      <table className="ramps-table">
        <thead>
          <tr>
            <th>Construction material</th>
            <th>Number of ramps</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(constructionMaterials).map(function (constructionMaterial) { return (<tr>
              <th className={selectedAttribute === constructionMaterial
        ? "selected"
        : "unselected"} onClick={function () {
        return handleMaterialPropertyClick(constructionMaterial);
    }}>
                {constructionMaterial}
              </th>
              <th>{getNumOfRampsWithMaterial(constructionMaterial)}</th>
            </tr>); })}
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
            <th className={selectedAttribute === "0-50" ? "selected" : "unselected"} onClick={function () { return handleSizePropertyClick("0-50"); }}>
              0 - 50
            </th>
            <th>{getNumOfRampsInRange(0, 50)}</th>
          </tr>
          <tr>
            <th className={selectedAttribute === "50-200" ? "selected" : "unselected"} onClick={function () { return handleSizePropertyClick("50-200"); }}>
              50 - 200
            </th>
            <th>{getNumOfRampsInRange(50, 200)}</th>
          </tr>
          <tr>
            <th className={selectedAttribute === "200-526" ? "selected" : "unselected"} onClick={function () { return handleSizePropertyClick("200-526"); }}>
              200 - 526
            </th>
            <th>{getNumOfRampsInRange(200, 526)}</th>
          </tr>
        </tbody>
      </table>

      <button onClick={function () { return clearPropertySelection(); }}>Clear Selection</button>
    </div>);
};
exports.RightPanel = RightPanel;
