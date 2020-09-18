export type globalState = {
  rampsInTheMap: feature[]
  rampsInTheView: feature[]
};

export type feature = {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][][];
  };
  properties: {
    material: string;
    area_: number;
  };
};
