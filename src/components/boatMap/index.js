import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "./style.css";
import { connect } from "react-redux";
import * as bootMapActions from "../../redux/actions/boatMapActions";
import boatData from "../../data/boat_ramps.json";

function BoatMap(props) {

  const handleZooming = (e) =>{
    props.dispatch(bootMapActions.zoomMap(e.target.getBounds()));
  }

  const getCentreOfView = () =>{
    const latitudes = [];
    const longitudes = [];
    boatData.features.forEach(feature => {
      feature.geometry.coordinates[0][0].forEach(c => {
        latitudes.push(c[0]);
        longitudes.push(c[1]);
      })
    });

    const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    const avgLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

    return [avgLongitude, avgLatitude];
  }

  return (
    <Map onzoomend={handleZooming} center={getCentreOfView()} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={boatData.features}/>
    </Map>
  );
}

function mapStateToProps(state){
  return {
    ramps: state.featuresInTheView
  }
}
//mapDispatchToProps
export default connect(mapStateToProps)(BoatMap);
