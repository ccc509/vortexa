/* eslint import/no-webpack-loader-syntax: off */

import { GeoJSON, Map, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getRampsToDisplay,
  getCentreOfView,
} from "../../constants/helper-functions";
import hash from "object-hash";
import { zoomMap } from "../../redux/actions/boatMapActions";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";

const BoatMap = () => {
  // const worker = require("workerize-loader!./worker.js");
  // const instance = worker();

  const dispatch = useDispatch();
  const rampsToDisplay = useTypedSelector((state) =>
    getRampsToDisplay(state.ramps, state.selectedMaterials, state.selectedSizes)
  );

  console.log("Rendering boat map");

  const [centre, setCentre] = useState(
    useTypedSelector((state) => getCentreOfView(state.ramps))
  );

  useEffect(() => {
    if (rampsToDisplay.features.length > 0) {
      setCentre(getCentreOfView(rampsToDisplay));
    };
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
