import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";

const UserLayout = () => {
  const location = useLocation();
  const isSignInRoute = location.pathname === "/sign-in";
  const isSignUpRoute = location.pathname === "/sign-up";
  const isAuthRoute = isSignInRoute || isSignUpRoute;
  const auth = useAppSelector(selectAuthStatus);

  if (auth.role === "employer" || auth.role === "admin") {
    return (
      <div className="h-screen container grid place-items-center">
        <Outlet />
      </div>
    );
  }

  return (
    <>
      {!isAuthRoute && <Header />}
      <main
        className={cn(
          "relative min-h-screen container max-w-6xl",
          !isAuthRoute && "pb-24 sm:pb-28"
        )}
      >
        <Outlet />
        {!isAuthRoute && <Footer />}
      </main>
    </>
  );
};

export default UserLayout;
