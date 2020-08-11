import { StatsTypes } from "../constants/actionTypes";

const initState = {
  loading: false,
  endIndex: 5,
  beginIndex: 0,
  maxMatches: false,
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
    case StatsTypes.UPDATE_MATCHES: {
      return {
        ...state,
        matches: state.matches
          ? state.matches.concat(action.payload)
          : action.payload,
      };
    }
    case StatsTypes.RESET_SEARCH: {
      return {
        ...initState,
      };
    }
    case StatsTypes.MAX_MATCHES: {
      return {
        ...state,
        maxMatches: action.payload,
      };
    }
    case StatsTypes.SHOW_MORE: {
      return {
        ...state,
        endIndex: action.payload,
        beginIndex: action.payload - 5,
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
