import { useDocumentTitle } from "@mantine/hooks";
import { AlertTriangle } from "lucide-react";
import { Balancer } from "react-wrap-balancer";

const DashboardSizeWarning = () => {
  useDocumentTitle("Dashboard Size Reminder - SNJOBS");

  return (
    <div className="bg-background fixed h-screen top-0 left-0 right-0 bottom-0 z-50 grid place-items-center">
      <div className="section-padding flex flex-col gap-4 items-center sm:items-start max-w-2xl w-full px-5 text-center sm:text-left">
        <AlertTriangle className="w-9 h-9 sm:w-10 sm:h-10 text-light" />

        <h1 className="text-3xl sm:text-4xl font-bold">
          <Balancer>Dashboard experience reminder</Balancer>
        </h1>

        <div className="space-y-2">
          <p>
            <Balancer>
              Please note that this view is optimized for desktop versions and may not provide the
              best experience on mobile/tablet devices.
            </Balancer>
          </p>
          <p>
            <Balancer>
              We recommend accessing this content on a{" "}
              <span className="underline text-primary">desktop</span> or{" "}
              <span className="underline text-primary">larger screen</span> for the optimal viewing
              experience.
            </Balancer>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSizeWarning;
