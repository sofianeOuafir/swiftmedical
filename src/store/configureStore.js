import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { patientsReducer } from "./../reducers/patients";
import { woundsReducer } from "./../reducers/wounds";

let composeEnhancers;
try {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch {
  composeEnhancers = compose;
}

export default function(initData) {
  const store = createStore(
    combineReducers({
      patients: patientsReducer,
      wounds: woundsReducer
    }),
    initData,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
