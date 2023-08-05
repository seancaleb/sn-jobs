import { QueryClient } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

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
import BookmarkedJobs, {
  loader as bookmarkedJobsLoader,
} from "@/routes/Users/Jobseekers/BookmarkedJobs.page.tsx";
import AppliedJobs from "./Users/Jobseekers/AppliedJobs.page.tsx";
import RoleBasedRoute from "@/components/RoleBasedRoute.tsx";

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
                  <Outlet />
                </ProtectedRoute>
              ),
              children: [
                {
                  errorElement: <ErrorPage />,
                  children: [
                    {
                      element: <RoleBasedRoute />,
                      children: [
                        {
                          path: "bookmarked-jobs",
                          element: <BookmarkedJobs />,
                          loader: bookmarkedJobsLoader(queryClient),
                        },
                        {
                          path: "applied-jobs",
                          element: <AppliedJobs />,
                        },
                      ],
                    },
                    {
                      path: "account",
                      element: <UserAccountRoute />,
                      children: [
                        {
                          path: "profile",
                          element: <Profile />,
                        },

                        {
                          path: "privacy-and-security",
                          element: <Security />,
                        },
                      ],
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
