import { configureStore } from "@reduxjs/toolkit";
import counter from "@/features/counter/counterSlice";
import auth from "@/features/auth/authSlice";
import notification from "@/features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    counter,
    auth,
    notification,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
