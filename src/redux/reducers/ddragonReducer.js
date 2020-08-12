import { DDragonTypes } from "../constants/actionTypes";

const initState = {
  champs: null,
  version: null,
  queues: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case DDragonTypes.UPDATE_CHAMPS: {
      return { ...state, champs: action.payload };
    }
    case DDragonTypes.UPDATE_VERSION: {
      return { ...state, version: action.payload };
    }
    case DDragonTypes.UPDATE_QUEUES: {
      return { ...state, queues: action.payload };
    }
    default:
      return state;
  }
};