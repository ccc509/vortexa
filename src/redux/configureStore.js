import { createStore } from "redux";
import rootReducer from "./reducers";
export default function congifureStore(initialState) {
  return createStore(rootReducer, initialState);
}
