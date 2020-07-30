import { combineReducers } from "redux";

import regionReducer from "../reducers/regionReducer";
import statsReducer from "../reducers/summonerStatsReducer"

const rootReducer = () =>
  combineReducers({
    region: regionReducer,
    stats: statsReducer
  });

export default rootReducer;
