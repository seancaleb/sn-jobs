import { QueryClient } from "@tanstack/react-query";
import { type RouteObject } from "react-router-dom";

import Root from "../Root.tsx";
import Home from "@/routes/Home/Home.tsx";
import Login from "@/routes/auth/Login/Login.page.tsx";
import ErrorPage from "@/error-page.tsx";
import Profile, { loader as profileLoader } from "@/routes/Profile/Profile.page.tsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import Register from "@/routes/auth/Register/Register.page.tsx";
import Jobs, { loader as jobsLoader } from "@/routes/Jobs/Jobs.page.tsx";

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
      {
        path: "sign-up",
        element: <Register />,
      },
      {
        path: ":role/profile",
        loader: profileLoader,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs",
        loader: jobsLoader(queryClient),
        element: (
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
