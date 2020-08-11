import { combineReducers } from "redux";

import regionReducer from "./regionReducer";
import statsReducer from "./summonerStatsReducer";
import ddragonReducer from "./ddragonReducer";

const rootReducer = () =>
  combineReducers({
    region: regionReducer,
    stats: statsReducer,
    ddragon: ddragonReducer,
  });

export default rootReducer;
