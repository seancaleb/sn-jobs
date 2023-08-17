import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Fragment } from "react";
import MobileNavigation from "@/components/MobileNavigation";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";

const RootRoute = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  return (
    <Fragment>
      <Header />
      {isAuthenticated ? <MobileNavigation /> : null}
      <main className="main pb-24 pt-28 sm:pb-28 lg:pt-16">
        <Outlet />
        <Footer />
      </main>
    </Fragment>
  );
};

export default RootRoute;
