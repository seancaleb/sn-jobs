import { Outlet, useLocation } from "react-router";
import Header from "@/components/Header/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { useAppSelector } from "./app/hooks";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Root = () => {
  const location = useLocation();
  const { id } = useAppSelector(selectNotification);
  const { dismiss } = useToast();

  useEffect(() => {
    if (id) dismiss(id);
  }, [location.pathname]);

  const isSignInRoute = location.pathname === "/sign-in";
  const isSignUpRoute = location.pathname === "/sign-up";

  const isAuthRoute = isSignInRoute || isSignUpRoute;

  return (
    <>
      {!isAuthRoute && <Header />}
      <main className={cn("relative min-h-screen container", !isAuthRoute && "pb-24 sm:pb-28")}>
        <TopLoadingBar />
        <Toaster />
        <Outlet />
        {!isAuthRoute && <Footer />}
      </main>
    </>
  );
};

export default Root;
