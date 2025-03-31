import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { testReducer } from "./testSlice";

const rootReducer = combineReducers({
  test: testReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
