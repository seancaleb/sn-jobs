import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useDocumentTitle("Page Not Found - SNJOBS");

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="section-padding text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-[-.5px]">Page Not Found</h1>
        <p>The page you are trying to access doesn't exist.</p>
        <Button variant="link" onClick={handleNavigateBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
