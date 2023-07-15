import { configureStore } from "@reduxjs/toolkit";
import counter from "@/features/counter/counterSlice";
import auth from "@/features/auth/authSlice";

const store = configureStore({
  reducer: {
    counter,
    auth,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
