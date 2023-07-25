import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counter from "@/features/counter/counterSlice";
import auth from "@/features/auth/authSlice";
import notification from "@/features/notification/notificationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "snjobs-client",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  counter,
  auth,
  notification,
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
