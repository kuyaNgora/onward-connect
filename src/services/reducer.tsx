import { combineReducers } from "@reduxjs/toolkit";
import type { Reducer, UnknownAction } from "redux";

import storage from "redux-persist/lib/storage";

import { authApi } from "./auth/api";
import { authReducer, signout } from "./auth/slice";
import { trackingApi } from "./tracking/api";

import { formReducer } from "./form/slice";

// TMS Onward - Removed WMS-specific modules (area, batch, delivery, fulfillment, item, receiving, receivingPlan, stock, stockopname, task, warehouse)

// API reducers
const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [trackingApi.reducerPath]: trackingApi.reducer,
};

const sliceReducers = {
  form: formReducer,
  auth: authReducer,
};

const appReducer = combineReducers({
  ...apiReducers,
  ...sliceReducers,
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer: Reducer<AppState, UnknownAction> = (state, action) => {
  if (action.type === signout.type) {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.sessionStorage?.clear?.();
    }
    if (
      "clear" in storage &&
      typeof (storage as unknown as Storage).clear === "function"
    ) {
      (storage as unknown as Storage).clear();
    } else {
      storage.removeItem("persist:root");
    }
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
