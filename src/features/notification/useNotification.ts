import { useAppDispatch } from "@/app/hooks";
import { NotificationActions } from "./notificationSlice";

const useNotification = () => {
  const dispatch = useAppDispatch();

  const initNotificationId = (id: string) => {
    dispatch(NotificationActions.initNotificationId(id));
  };

  return {
    initNotificationId,
  };
};

export default useNotification;
