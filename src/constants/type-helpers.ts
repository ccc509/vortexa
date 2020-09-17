export type globalState = {
  rampsInTheMap: {
    features: features[];
  };
  rampsInTheView: {
    features: features[];
  };
};

export type features = {
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
