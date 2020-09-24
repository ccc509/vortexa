import { getNumOfRampsWithMaterial } from "../../constants/helper-functions";

import { LatLngBounds } from "leaflet";
import { Feature, GeoJsonProperties, MultiPolygon } from "geojson";
//import { SizeInterval } from "../redux/types";

test("Should work", () => {
  var map: GeoJSON.FeatureCollection<MultiPolygon> = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [153.29237339772322, -27.897575560605485],
                [153.29240999654635, -27.897600934719307],
                [153.29243164508424, -27.897612892477547],
                [153.29242807749804, -27.89762571619733],
                [153.2924182348173, -27.897642434997323],
                [153.29240518208437, -27.89764887031301],
                [153.29238402481764, -27.897632940370542],
                [153.29236010912982, -27.897619001393466],
                [153.29233897564296, -27.8976119164061],
                [153.29237339772322, -27.897575560605485],
              ],
            ],
          ],
        },
        properties: {
          area_: 36.079,
          material: "Gravel",
        },
      },
    ],
  };
  const num = getNumOfRampsWithMaterial(map, "Gravel");
  expect(num).toBe(1);
});
