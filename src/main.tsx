import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ApplicationProviders from "@/components/ApplicationProviders.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApplicationRouter from "@/routes";
import AxiosInterceptor from "@/services/AxiosInterceptor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationProviders>
      <AxiosInterceptor>
        <ApplicationRouter />
      </AxiosInterceptor>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ApplicationProviders>
  </React.StrictMode>
);
