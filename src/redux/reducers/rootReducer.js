import { combineReducers } from "redux";

import regionReducer from "../reducers/regionReducer";

const rootReducer = () =>
  combineReducers({
    region: regionReducer,
  });

export default rootReducer;
