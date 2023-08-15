import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@mantine/hooks";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Balancer } from "react-wrap-balancer";

const NotFound = () => {
  const navigate = useNavigate();

  useDocumentTitle("Page Not Found - SNJOBS");

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-background fixed h-screen top-0 left-0 right-0 bottom-0 z-[5] grid place-items-center">
      <div className="section-padding flex flex-col gap-4 items-center sm:items-start max-w-lg w-full px-5 text-center sm:text-left">
        <AlertTriangle className="w-9 h-9 sm:w-10 sm:h-10 text-light" />

        <h1 className="text-3xl sm:text-4xl font-bold">
          <Balancer>Page not found</Balancer>
        </h1>

        <p>
          <Balancer>The page you are trying to access doesn't exist.</Balancer>
        </p>

        <Button onClick={handleNavigateBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default NotFound;
