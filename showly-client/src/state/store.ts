import { configureStore } from "@reduxjs/toolkit";
import authFormReducer from "./form/formSlice";

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
