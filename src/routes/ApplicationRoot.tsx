import { useAppSelector } from "@/app/hooks";
import ScrollToTop from "@/components/ScrollToTop";
import TopLoadingBar from "@/components/TopLoadingBar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useDocumentTitle } from "@mantine/hooks";
import { Fragment, useEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

const ApplicationRoot = () => {
  const location = useLocation();
  const { id } = useAppSelector(selectNotification);
  const { dismiss } = useToast();
  const matchJobDetails = useMatch("/jobs/:jobId");
  const matchJobListings = useMatch("/employer/job-listings");
  const matchJobDetailsDashboard = useMatch("/employer/job-listings/:jobId");

  useDocumentTitle("SNJOBS - Virtual Job Board in the Philippines");

  useEffect(() => {
    if (id) {
      if (matchJobDetails || matchJobListings || matchJobDetailsDashboard) return;
      dismiss(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, matchJobDetails, matchJobListings, matchJobDetailsDashboard]);

  return (
    <Fragment>
      <ScrollToTop />
      <TopLoadingBar />
      <Toaster />
      <Outlet />
    </Fragment>
  );
};

export default ApplicationRoot;
