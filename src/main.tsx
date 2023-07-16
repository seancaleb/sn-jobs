import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationProviders from "@/components/ApplicationProviders.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routesConfig } from "@/routes/config.routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationProviders>
      <RouterProvider router={createBrowserRouter(routesConfig)} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ApplicationProviders>
  </React.StrictMode>
);
