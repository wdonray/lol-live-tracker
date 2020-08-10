import { StatsTypes } from "../constants/actionTypes";
import {
  getMatchHistory,
  getSummonerByName,
  getSummonerStats,
} from "../../api/LoLGetCalls";

export const getSumName = (region, summonerName) => {
  return (dispatch) => {
    return getSummonerByName(region, summonerName).then((data) =>
      dispatch({ type: StatsTypes.UPDATE_SUMMONER, payload: data })
    );
  };
};

export const getSumStats = (region, encryptedSummonerId) => {
  return (dispatch) => {
    return getSummonerStats(region, encryptedSummonerId).then((data) =>
      dispatch({ type: StatsTypes.UPDATE_SUMMONER, payload: data[0] })
    );
  };
};

export const getMatches = (region, encryptedSummonerId, endIndex) => {
  return (dispatch) => {
    return getMatchHistory(region, encryptedSummonerId, endIndex).then((data) =>
      dispatch({ type: StatsTypes.UPDATE_SUMMONER, payload: { matches: data } })
    );
  };
};

export const updateLoading = (value) => {
  return {
    type: StatsTypes.UPDATE_LOADING,
    payload: value,
  };
};

export const searchSummoner = (region, summonerName, endIndex) => {
  return (dispatch, getState) => {
    dispatch({ type: StatsTypes.RESET_SEARCH });
    dispatch({ type: StatsTypes.UPDATE_LOADING, payload: true });
    return dispatch(getSumName(region, summonerName)).then(() => {
      const encryptedSummonerId = getState().stats.accountId;
      const id = getState().stats.id;
      return dispatch(getSumStats(region, id)).then(() => {
        return dispatch(getMatches(region, encryptedSummonerId, endIndex));
      });
    });
  };
};
