import { StatsTypes } from "../constants/actionTypes";
import {
  getMatchHistory,
  getSummonerByName,
  getSummonerStats,
  getActiveGame,
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

export const getLiveGame = (region, encryptedSummonerId) => {
  return (dispatch) => {
    return getActiveGame(region, encryptedSummonerId).then((data) => {
      return dispatch({
        type: StatsTypes.UPDATE_SUMMONER,
        payload: data instanceof Error ? undefined : { liveGame: data },
      });
    });
  };
};

export const getMatches = (
  region,
  encryptedSummonerId,
  beginIndex,
  endIndex
) => {
  return (dispatch) => {
    return getMatchHistory(
      region,
      encryptedSummonerId,
      beginIndex,
      endIndex
    ).then((data) => {
      if (Array.isArray(data) && data.length !== 0) {
        return dispatch({
          type: StatsTypes.UPDATE_MATCHES,
          payload: data,
        });
      } else {
        return dispatch({
          type: StatsTypes.MAX_MATCHES,
          payload: true,
        });
      }
    });
  };
};

export const updateLoading = (value) => {
  return {
    type: StatsTypes.UPDATE_LOADING,
    payload: value,
  };
};

export const showMore = (value) => {
  return {
    type: StatsTypes.SHOW_MORE,
    payload: value,
  };
};

export const showMoreMatches = () => {
  return (dispatch, getState) => {
    const encryptedSummonerId = getState().stats.accountId;
    const region = getState().region.region;
    const beginIndex = getState().stats.beginIndex;
    const endIndex = getState().stats.endIndex;
    return dispatch(
      getMatches(region, encryptedSummonerId, beginIndex, endIndex)
    );
  };
};

export const searchSummoner = (region, summonerName) => {
  return (dispatch, getState) => {
    dispatch({ type: StatsTypes.RESET_SEARCH });
    dispatch({ type: StatsTypes.UPDATE_LOADING, payload: true });
    return dispatch(getSumName(region, summonerName)).then(() => {
      const encryptedSummonerId = getState().stats.accountId;
      const id = getState().stats.id;
      const endIndex = getState().stats.endIndex;
      const beginIndex = getState().stats.beginIndex;
      return dispatch(getLiveGame(region, id)).then(() => {
        return dispatch(
          getMatches(region, encryptedSummonerId, beginIndex, endIndex)
        ).then(() => {
          return dispatch(getSumStats(region, id));
        });
      });
    });
  };
};
