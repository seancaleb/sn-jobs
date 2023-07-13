import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationProviders from "@/components/ApplicationProviders.tsx";
import ReduxTest from "./ReduxTest.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryTest from "./ReactQueryTest.tsx";
import Root from "./Root.tsx";

import { loader as postsLoader } from "./ReactQueryTest.tsx";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/redux-test",
        element: <ReduxTest />,
      },
      {
        path: "/react-query-test",
        element: <ReactQueryTest />,
        loader: postsLoader(queryClient),
      },
    ],
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
