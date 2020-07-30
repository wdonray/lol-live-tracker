import { StatsTypes } from "../constants/actionTypes";

const initState = {
  loading: false,
  accountId: null,
  profileIconId: null,
  revisionDate: null,
  name: null,
  id: null,
  puuid: null,
  summonerLevel: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case StatsTypes.UPDATE_SUMMONER: {
      return {
        ...state,
        ...action.payload,
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
