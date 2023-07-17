import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationState = {
  id: string | null;
};

const initialState: NotificationState = {
  id: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    initNotificationId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const selectNotification = (state: RootState) => state.notification;

export const NotificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
