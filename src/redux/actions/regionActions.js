import { RegionTypes } from "../constants/actionTypes";

export const changeRegion = (value) => {
  return {
    type: RegionTypes.CHANGE_REGION,
    payload: value,
  };
};
