import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ApplicationProviders from "@/components/ApplicationProviders.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApplicationRouter from "@/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationProviders>
      <ApplicationRouter />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ApplicationProviders>
  </React.StrictMode>
);
