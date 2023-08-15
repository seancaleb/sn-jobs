import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useMediaQuery } from "@mantine/hooks";
import DashboardSizeWarning from "./DashboardSizeWarning";

const Dashboard = () => {
  const minDashboardScreenSize = useMediaQuery("(min-width: 80rem)");

  return (
    <>
      {minDashboardScreenSize !== undefined ? (
        <>
          {!minDashboardScreenSize ? <DashboardSizeWarning /> : null}
          <div className="h-screen flex">
            <DashboardSidebar />

            <div className="flex-1 h-full fixed top-0 right-0 left-[16rem] overflow-y-auto">
              <DashboardHeader />

              <div className="px-8 py-6">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
