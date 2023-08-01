import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "../Root.tsx";
import Home from "@/routes/Home/Home.tsx";
import Login from "@/routes/auth/Login/Login.page.tsx";
import ErrorPage from "@/error-page.tsx";
import Profile from "@/routes/Users/Profile/Profile.page.tsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import Register from "@/routes/auth/Register/Register.page.tsx";
import Jobs, { loader as jobsLoader } from "@/routes/Jobs/Jobs.page.tsx";
import UserAccountRoute from "@/components/UserAccountRoute.tsx";
import Security from "@/routes/Users/Security/Security.page.tsx";

const queryClient = new QueryClient();

const RootRouter = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
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
              path: ":role",
              element: (
                <ProtectedRoute>
                  <UserAccountRoute />
                </ProtectedRoute>
              ),
              children: [
                {
                  errorElement: <ErrorPage />,
                  children: [
                    {
                      path: "profile",
                      element: <Profile />,
                    },
                    {
                      path: "applied-jobs",
                      element: <div>Applied Jobs</div>,
                    },
                    {
                      path: "bookmarked-jobs",
                      element: <div>Bookmarked Jobs</div>,
                    },
                    {
                      path: "job-listings",
                      element: <div>Job Listings</div>,
                    },
                    {
                      path: "privacy-and-security",
                      element: <Security />,
                    },
                  ],
                },
              ],
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
      ])}
    />
  );
};

export default RootRouter;
