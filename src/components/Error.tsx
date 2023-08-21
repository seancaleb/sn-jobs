import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { isAPIResponseError } from "@/lib/utils";
import { Balancer } from "react-wrap-balancer";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { useDocumentTitle } from "@mantine/hooks";

const ErrorRoute = () => {
  const error = useRouteError();
  let errorMessage: string;
  const navigate = useNavigate();

  useDocumentTitle("Something Went Wrong - SNJOBS");

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (isAPIResponseError(error)) {
    errorMessage = error.message.split(":")[1];
    console.log(errorMessage);
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="bg-background fixed h-screen top-0 left-0 right-0 bottom-0 z-[5] grid place-items-center">
      <div
        id="error-page"
        className="section-padding flex flex-col gap-4 items-center sm:items-start max-w-lg w-full px-5 text-center sm:text-left"
      >
        <AlertTriangle className="w-9 h-9 sm:w-10 sm:h-10 text-teal-600" strokeWidth={1.5} />

        <h1 className="text-3xl sm:text-4xl font-semibold">
          <Balancer>Something went wrong.</Balancer>
        </h1>

        <p>
          <Balancer>{errorMessage}</Balancer>
        </p>

        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default ErrorRoute;
