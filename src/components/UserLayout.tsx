import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { cn } from "@/lib/utils";

const UserLayout = () => {
  const location = useLocation();
  const isSignInRoute = location.pathname === "/sign-in";
  const isSignUpRoute = location.pathname === "/sign-up";
  const isAuthRoute = isSignInRoute || isSignUpRoute;

  return (
    <>
      {!isAuthRoute ? <Header /> : null}
      <main
        className={cn(
          "relative min-h-screen container max-w-6xl",
          !isAuthRoute && "pb-24 pt-28 sm:pb-28 lg:pt-16"
        )}
      >
        <Outlet />
        {!isAuthRoute && <Footer />}
      </main>
    </>
  );
};

export default UserLayout;
