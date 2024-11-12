import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { creativeReducer } from "./creativeReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  creative: creativeReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
