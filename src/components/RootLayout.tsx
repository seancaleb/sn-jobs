/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useMatch } from "react-router";
import TopLoadingBar from "@/components/TopLoadingBar";
import { Toaster } from "@/components/ui/toaster";
import { useAppSelector } from "../app/hooks";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import UserLayout from "./UserLayout";
import DashboardLayout from "./DashboardLayout";
import AxiosInterceptor from "@/services/AxiosInterceptor";

const RootLayout = () => {
  const location = useLocation();
  const { id } = useAppSelector(selectNotification);
  const { dismiss } = useToast();
  const matchJobDetails = useMatch("/jobs/:jobId");
  const matchJobListings = useMatch("/employer/job-listings");
  const matchJobDetailsDashboard = useMatch("/employer/job-listings/:jobId");
  const isEmployer = location.pathname.includes("employer");
  const isAdmin = location.pathname.includes("admin");
  const isEmployerOrAdmin = isEmployer || isAdmin;

  useEffect(() => {
    if (id) {
      if (matchJobDetails || matchJobListings || matchJobDetailsDashboard) return;
      dismiss(id);
    }
  }, [location.pathname, matchJobDetails, matchJobListings, matchJobDetailsDashboard]);

  return (
    <>
      <ScrollToTop />
      <TopLoadingBar />
      <Toaster />

      <AxiosInterceptor>
        {isEmployerOrAdmin ? <DashboardLayout /> : <UserLayout />}
      </AxiosInterceptor>
    </>
  );
};

export default RootLayout;
