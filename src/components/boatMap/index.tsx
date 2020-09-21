import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "./style.css";
import { connect, useSelector, useDispatch } from "react-redux";
import { zoomMap } from "../../redux/actions/boatMapActions";
import hash from "object-hash";
import { GlobalState } from "../../constants/type-helpers";
import { getRampsToDisplay } from "../../constants/helper-functions";

const getCentreOfView = (
  rampsToDisplay: GeoJSON.FeatureCollection<any>
): [number, number] => {
  const latitudes: number[] = [];
  const longitudes: number[] = [];
  rampsToDisplay.features.forEach((feature: any) => {
    feature.geometry.coordinates[0][0].forEach((c: number[]) => {
      latitudes.push(c[0]);
      longitudes.push(c[1]);
    });
  });
  const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
  const avgLongitude =
    longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

  return [avgLongitude, avgLatitude];
};

function BoatMap() {
  const dispatch = useDispatch();
  const handleZooming = (e: any) => {
    dispatch(zoomMap(e.target.getBounds()));
  };

  const selectedMaterials: string[] = useSelector(
    (state: GlobalState) => state.selectedMaterials
  );
  const selectedSizes: number[][] = useSelector(
    (state: GlobalState) => state.selectedSizes
  );
  const allRamps: GeoJSON.FeatureCollection<any> = useSelector(
    (state: GlobalState) => state.ramps
  );
  const rampsToDisplay = getRampsToDisplay(
    allRamps,
    selectedMaterials,
    selectedSizes
  );

  return (
    <Map
      onzoomend={handleZooming}
      center={getCentreOfView(rampsToDisplay)}
      zoom={10}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON key={hash(rampsToDisplay)} data={rampsToDisplay} />
    </Map>
  );
}

export default connect()(BoatMap);
