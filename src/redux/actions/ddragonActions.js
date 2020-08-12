import { DDragonTypes } from "../constants/actionTypes";
import { getVersions, getChamps, getQueues, getSummoners } from "../../api/LoLGetCalls";

export const updateChamps = (version) => {
  return (dispatch) => {
    return getChamps(version).then((response) =>
      dispatch({
        type: DDragonTypes.UPDATE_CHAMPS,
        payload: Object.values(response),
      })
    );
  };
};

export const updateVersion = () => {
  return (dispatch) => {
    return getVersions().then((response) =>
      dispatch({
        type: DDragonTypes.UPDATE_VERSION,
        payload: response,
      })
    );
  };
};

export const updateQueues = () => {
  return (dispatch) => {
    return getQueues().then((response) =>
      dispatch({
        type: DDragonTypes.UPDATE_QUEUES,
        payload: response,
      })
    );
  };
};

export const updateSummoners = (version) => {
  return (dispatch) => {
    return getSummoners(version).then((response) =>
      dispatch({
        type: DDragonTypes.UPDATE_SUMMONERS,
        payload: Object.values(response),
      })
    );
  };
};

export const updateDDragon = () => {
  return (dispatch, getState) => {
    return dispatch(updateVersion()).then(() => {
      const version = getState().ddragon.version;
      console.log(version);
      return dispatch(updateChamps(version)).then(() =>
        dispatch(updateQueues()).then(() => dispatch(updateSummoners(version)))
      );
    });
  };
};
