/* eslint import/no-webpack-loader-syntax: off */

import { GeoJSON, Map, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import {
  getCentreOfView,
  getRampsToDisplay,
} from "../../constants/helper-functions";

import { GlobalState } from "../../constants/types";
import { createSelector } from "reselect";
import hash from "object-hash";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";
import { zoomMap } from "../../redux/actions/boatMapActions";

const rampsInTheViewSelector = createSelector(
  (state: GlobalState) => state.ramps,
  (state: GlobalState) => state.selectedMaterials,
  (state: GlobalState) => state.selectedSizes,
  (ramps, selectedMaterials, selectedSizes) => getRampsToDisplay(ramps, selectedMaterials, selectedSizes)
);

const BoatMap = () => {
  console.log("Rendering boat map");

  const dispatch = useDispatch();
  const rampsToDisplay = useTypedSelector(rampsInTheViewSelector);
  
  const data = useTypedSelector(s => getCentreOfView(s.ramps))
  const [centre, setCentre] = useState(data);

  useEffect(() => {
    if (rampsToDisplay.features.length > 0) {
      setCentre(getCentreOfView(rampsToDisplay));
    }
  }, [rampsToDisplay.features.length]);

  return (
    <Map
      onzoomend={(e) => dispatch(zoomMap(e.target.getBounds()))}
      center={centre}
      zoom={10}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON key={hash(rampsToDisplay)} data={rampsToDisplay} />
    </Map>
  );
};

export { BoatMap };
