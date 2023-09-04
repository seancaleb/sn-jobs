import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { NotificationActions, selectNotification } from "./notificationSlice";
import { useCallback } from "react";

const useNotification = () => {
  const dispatch = useAppDispatch();

  const { id: notificationId } = useAppSelector(selectNotification);

  const initNotificationId = useCallback(
    (id: string) => {
      dispatch(NotificationActions.initNotificationId(id));
    },
    [dispatch]
  );

  return {
    notificationId,
    initNotificationId,
  };
};

export default useNotification;
