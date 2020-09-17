import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "./style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {zoomMap} from "../../redux/actions/boatMapActions";
import boatData from "../../data/boat_ramps.json";
import hash from "object-hash";
import { globalState } from "../../constants/type-helpers";

type Props = {
    rampsInTheMap : any[],
    zoomMap: (bounds: any) => void;
}

function BoatMap(props : Props) {
  const handleZooming = (e : any) => {
    props.zoomMap(e.target.getBounds());
  };

  const getCentreOfView = ():[number, number] => {
    const latitudes : number[] = [];
    const longitudes : number[] = [];
    props.rampsInTheMap.forEach((feature) => {
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
  return (
    <Map onzoomend={handleZooming} center={getCentreOfView()} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON key={hash(props.rampsInTheMap)} data={props.rampsInTheMap} />
    </Map>
  );
}

function mapStateToProps(state : globalState) {
  return {
    rampsInTheMap: state.rampsInTheMap
      ? state.rampsInTheMap
      : boatData.features,
  };
}

function mapDispatchToProps(dispatch: any) {
  bindActionCreators(
    {
        zoomMap
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoatMap);
