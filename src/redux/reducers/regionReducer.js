import { RegionTypes } from "../constants/actionTypes";
import regions from "../constants/regions";

const initState = {
  region: regions.NA1,
};

export default (state = initState, action) => {
  switch (action.type) {
    case RegionTypes.CHANGE_REGION: {
      if (Object.values(regions).includes(action.payload)) {
        return {
          ...state,
          region: action.payload,
        };
      }
      return state;
    }
    default:
      return state;
  }
};
