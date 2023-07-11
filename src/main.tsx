import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationProviders from "@/components/ApplicationProviders.tsx";
import ReduxTest from "./ReduxTest.tsx";
import { ReactQueryDevtools } from "react-query/devtools";
import ReactQueryTest from "./ReactQueryTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/redux-test",
    element: <ReduxTest />,
  },
  {
    path: "/react-query-test",
    element: <ReactQueryTest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationProviders>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ApplicationProviders>
  </React.StrictMode>
);
