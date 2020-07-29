import { RegionTypes } from "../constants/actionTypes";

export const changeRegion = (value) => {
  return {
    type: RegionTypes.CHANGE_REGION,
    payload: value,
  };
};

//TODO: https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/