import { combineReducers } from "redux";
import boatMapReducer from "./boatMapReducer";

const rootReducer = combineReducers({ boatMapReducer });

export default rootReducer