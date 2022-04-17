import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import rootReducer, { RootState } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [...getDefaultMiddleware()],
  // middleware: [...getDefaultMiddleware({ immutableCheck: false })],
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
