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

const RootLayout = () => {
  const location = useLocation();
  const { id } = useAppSelector(selectNotification);
  const { dismiss } = useToast();
  const matchers = useMatch("/jobs/:jobId");
  const isEmployer = location.pathname.includes("employer");
  const isAdmin = location.pathname.includes("admin");
  const isEmployerOrAdmin = isEmployer || isAdmin;

  useEffect(() => {
    if (id) {
      if (matchers) return;
      dismiss(id);
    }
  }, [location.pathname, matchers]);

  return (
    <>
      <ScrollToTop />
      <TopLoadingBar />
      <Toaster />
      {isEmployerOrAdmin ? <DashboardLayout /> : <UserLayout />}
    </>
  );
};

export default RootLayout;
