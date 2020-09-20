import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "./style.css";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { zoomMap } from "../../redux/actions/boatMapActions";
import hash from "object-hash";
import { GlobalState } from "../../constants/type-helpers";

// type Props = {
//   rampsInTheMap: any;
//   //zoomMap: (bounds: any) => void;
// };

function BoatMap() {
  const handleZooming = (e: any) => {
    //props.zoomMap(e.target.getBounds());
  };

  const rampsInTheMap : GeoJSON.FeatureCollection<any> = useSelector((state: GlobalState) => state.rampsInTheMap); 

  const getCentreOfView = (): [number, number] => {
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    rampsInTheMap.features.forEach((feature : any) => {
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
      <GeoJSON key={hash(rampsInTheMap)} data={rampsInTheMap} />
    </Map>
  );
}

// function mapStateToProps(state: GlobalState) {
//   console.log(state);
//   return {
//     rampsInTheMap: state.rampsInTheMap
//       // ? state.rampsInTheMap
//       // : boatData.features,
//   };
// }

function mapDispatchToProps(dispatch: any) {
  bindActionCreators(
    {
      zoomMap,
    },
    dispatch
  );
}

//export default connect(mapStateToProps, mapDispatchToProps)(BoatMap);
export default connect()(BoatMap);
