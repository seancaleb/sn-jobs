import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { isAPIResponseError } from "@/lib/utils";

const ErrorRoute = () => {
  const error = useRouteError();
  let errorMessage: string;

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
    <div id="error-page" className="section-padding text-center space-y-1">
      <h1 className="text-4xl font-bold tracking-[-.5px]">Oops!</h1>
      <p className="text-lg text-primary">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorRoute;
