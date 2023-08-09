import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { isAPIResponseError } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ErrorRoute = () => {
  const error = useRouteError();
  let errorMessage: string;
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (isAPIResponseError(error)) {
    errorMessage = error.message;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div id="error-page" className="section-padding text-center space-y-2">
      <h1 className="text-4xl font-bold tracking-[-.5px]">Oops!</h1>
      <p>{errorMessage}</p>
      <Button variant="link" onClick={handleNavigateBack}>
        Go Back
      </Button>
    </div>
  );
};

export default ErrorRoute;
