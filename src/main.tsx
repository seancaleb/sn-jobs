import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationProviders from "@/components/ApplicationProviders.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./Root.tsx";
import { QueryClient } from "@tanstack/react-query";

// Routes
import Home from "@/routes/Home/Home.tsx";
import Login from "@/routes/Login/Login.page.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sign-in",
        element: <Login />,
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
