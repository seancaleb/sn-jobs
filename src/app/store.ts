/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "@/features/auth/authSlice";
import notification from "@/features/notification/notificationSlice";
import recentSearches from "@/features/recent-searches/recentSearchesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "snjobs-client",
  version: 1,
  storage,
  blacklist: ["notification"],
};

const rootReducer = combineReducers({
  auth,
  notification,
  recentSearches,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
