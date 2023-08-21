import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@mantine/hooks";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Balancer } from "react-wrap-balancer";

const NotFound = () => {
  const navigate = useNavigate();

  useDocumentTitle("Page Content Not Found - SNJOBS");

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-background fixed h-screen top-0 left-0 right-0 bottom-0 z-[5] grid place-items-center">
        <div className="section-padding flex flex-col gap-4 items-center sm:items-start max-w-lg w-full px-5 text-center sm:text-left">
          <AlertTriangle className="w-9 h-9 sm:w-10 sm:h-10 text-teal-600" strokeWidth={1.5} />

          <h1 className="text-3xl sm:text-4xl font-semibold">
            <Balancer>Page content not found.</Balancer>
          </h1>

          <p>
            <Balancer>
              We're sorry, but it appears that the page you're trying to access isn't available at
              the moment.
            </Balancer>
          </p>

          <Button onClick={handleNavigateBack}>Go Back</Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
