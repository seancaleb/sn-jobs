import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useMediaQuery } from "@mantine/hooks";
import DashboardSizeWarning from "./DashboardSizeWarning";
import { Fragment } from "react";

const DashboardRoute = () => {
  const minDashboardScreenSize = useMediaQuery("(min-width: 80rem)");

  return (
    <Fragment>
      {minDashboardScreenSize !== undefined ? (
        <Fragment>
          {!minDashboardScreenSize ? <DashboardSizeWarning /> : null}
          <main className="h-screen flex">
            <DashboardSidebar />

            <div className="flex-1 h-full fixed top-0 right-0 left-[16rem]">
              <DashboardHeader />

              <div className="h-[calc(100%-4rem)] overflow-y-auto px-8 py-6">
                <Outlet />
              </div>
            </div>
          </main>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default DashboardRoute;
