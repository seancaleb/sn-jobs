import { useAppSelector } from "@/app/hooks";
import { useToast } from "@/components/ui/use-toast";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";

const useDismissToastOnRouteChange = () => {
  const location = useLocation();
  const { id } = useAppSelector(selectNotification);
  const { dismiss } = useToast();
  const matchJobDetails = useMatch("/jobs/:jobId");
  const matchJobListings = useMatch("/employer/job-listings");
  const matchJobDetailsDashboard = useMatch("/employer/job-listings/:jobId");

  useEffect(() => {
    if (id) {
      if (matchJobDetails || matchJobListings || matchJobDetailsDashboard) return;
      dismiss(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, matchJobDetails, matchJobListings, matchJobDetailsDashboard]);
};

export default useDismissToastOnRouteChange;
