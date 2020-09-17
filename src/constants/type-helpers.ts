export type globalState = {
  rampsInTheMap: {
    features: feature[];
  };
  rampsInTheView: {
    features: feature[];
  };
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
