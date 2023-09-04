import { useToast } from "@/components/ui/use-toast";
import useNotification from "@/features/notification/useNotification";
import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";

const useDismissToastOnRouteChange = () => {
  const location = useLocation();
  const { notificationId } = useNotification();
  const { dismiss } = useToast();
  const matchJobDetails = useMatch("/jobs/:jobId");
  const matchJobListings = useMatch("/employer/job-listings");
  const matchJobDetailsDashboard = useMatch("/employer/job-listings/:jobId");

  useEffect(() => {
    if (notificationId) {
      if (matchJobDetails || matchJobListings || matchJobDetailsDashboard) return;
      dismiss(notificationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, matchJobDetails, matchJobListings, matchJobDetailsDashboard]);
};

export default useDismissToastOnRouteChange;
