import React from "react";
import { thunk as ReduxThunk } from "redux-thunk";

import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import cardReducer from "./actions/card/reducer";
import chatReducer from "./actions/chat/reducer";

function createReducer() {
  const rootReducer = combineReducers({
    card: cardReducer,
    chat: chatReducer,
  });
  return (state, action) => {
    if (action.type === "[USER] LOGGED OUT") {
      state = { auth: undefined, utils: undefined };
    }
    return rootReducer(state, action);
  };
}
const middlewares = [ReduxThunk];
let composeEnhancers = compose;
const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
