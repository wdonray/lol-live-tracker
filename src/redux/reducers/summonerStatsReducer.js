import { StatsTypes } from "../constants/actionTypes";

const initState = {
  loading: false,
  endIndex: 5
};

export default (state = initState, action) => {
  switch (action.type) {
    case StatsTypes.UPDATE_SUMMONER: {
      if (typeof action.payload === "undefined") {
        return { ...state };
      } else if (Object.keys(action.payload).includes("isAxiosError")) {
        return { ...state };
      }
      return {
        ...state,
        ...action.payload,
      };
    }
    case StatsTypes.RESET_SEARCH: {
      return {
        loading: false,
        endIndex: 5
      };
    }
    case StatsTypes.UPDATE_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};
