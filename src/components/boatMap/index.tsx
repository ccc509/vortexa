import { GeoJSON, Map, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRampsToDisplay } from "../../constants/helper-functions";
import hash from "object-hash";
import { zoomMap } from "../../redux/actions/boatMapActions";
import { MultiPolygon } from "geojson";
import { useTypedSelector } from "../../redux/reducers/boatMapReducer";

const getCentreOfView = ({
  features,
}: GeoJSON.FeatureCollection<MultiPolygon>): [number, number] => {
  const avgLat =
    features
      .map(({ geometry }) => geometry.coordinates[0][0][0][0])
      .reduce((a, b) => a + b, 0) / features.length;
  const avgLong =
    features
      .map(({ geometry }) => geometry.coordinates[0][0][0][1])
      .reduce((a, b) => a + b, 0) / features.length;
  return [avgLong, avgLat];
};

const BoatMap = () => {
  const dispatch = useDispatch();
  const selectedMaterials = useTypedSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = useTypedSelector((state) => state.selectedSizes);
  const allRamps = useTypedSelector((state) => state.ramps);
  const rampsToDisplay = getRampsToDisplay(
    allRamps,
    selectedMaterials,
    selectedSizes
  );
  const [center, setCenter] = useState(getCentreOfView(allRamps));

  useEffect(() => {
    if (rampsToDisplay.features.length > 0) {
      setCenter(getCentreOfView(rampsToDisplay));
    }
  }, []);

  useEffect(() => {
    if (rampsToDisplay.features.length > 0) {
      setCenter(getCentreOfView(rampsToDisplay));
    }
  }, [rampsToDisplay.features.length]);

  return (
    <Map
      onzoomend={(e) => dispatch(zoomMap(e.target.getBounds()))}
      center={center}
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
