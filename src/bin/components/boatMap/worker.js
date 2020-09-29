import {
  getCentreOfView,
} from "../../../constants/helper-functions";

export const expensive = (time) => {
  const result = time + 1;
  return result;
};

export const getCentre = (rampsToDisplay) => {
  const centre = getCentreOfView(rampsToDisplay);
  return centre;
};
