/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation, useMatch } from "react-router";
import Header from "@/components/Header/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { useAppSelector } from "../app/hooks";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";

const RootLayout = () => {
  const location = useLocation();
  const { id } = useAppSelector(selectNotification);
  const { dismiss } = useToast();
  const matchers = useMatch("/jobs/:jobId");
  const isSignInRoute = location.pathname === "/sign-in";
  const isSignUpRoute = location.pathname === "/sign-up";
  const isAuthRoute = isSignInRoute || isSignUpRoute;

  useEffect(() => {
    if (id) {
      if (matchers) return;
      dismiss(id);
    }
  }, [location.pathname, matchers]);

  return (
    <>
      {!isAuthRoute && <Header />}
      <main
        className={cn(
          "relative min-h-screen container max-w-6xl",
          !isAuthRoute && "pb-24 sm:pb-28"
        )}
      >
        <ScrollToTop />
        <TopLoadingBar />
        <Toaster />
        <Outlet />
        {!isAuthRoute && <Footer />}
      </main>
    </>
  );
};

export default RootLayout;
