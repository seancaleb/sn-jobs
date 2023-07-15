import { QueryClient } from "@tanstack/react-query";
import { type RouteObject } from "react-router-dom";

import Root from "../Root.tsx";
import Home from "@/routes/Home/Home.tsx";
import Login from "@/routes/Login/Login.page.tsx";
import ErrorPage from "@/error-page.tsx";

const queryClient = new QueryClient();

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
];
