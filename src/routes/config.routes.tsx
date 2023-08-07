import { QueryClient } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "../Root.tsx";
import Home from "@/routes/Home/Home.tsx";
import Login from "@/routes/auth/Login/Login.page.tsx";
import ErrorPage from "@/error-page.tsx";
import Profile, { loader as profileLoader } from "@/routes/Users/Profile/Profile.page.tsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import Register from "@/routes/auth/Register/Register.page.tsx";
import Jobs, { loader as jobsLoader } from "@/routes/Jobs/Jobs.page.tsx";
import UserAccountRoute from "@/components/UserAccountRoute.tsx";
import Security from "@/routes/Users/Security/Security.page.tsx";
import BookmarkedJobs, {
  loader as bookmarkedJobsLoader,
} from "@/routes/Users/Jobseekers/BookmarkedJobs.page.tsx";
import AppliedJobs, {
  loader as appliedJobsLoader,
} from "@/routes/Users/Jobseekers/AppliedJobs.page.tsx";
import RoleBasedRoute from "@/components/RoleBasedRoute.tsx";
import JobApplication, {
  loader as jobApplicationLoader,
} from "./Jobs/JobApplication/JobApplication.page.tsx";
import Job, { loader as jobLoader } from "./Jobs/Job/Job.page.tsx";

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
                          loader: appliedJobsLoader(queryClient),
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
                          loader: profileLoader(queryClient),
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
              element: (
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              ),
              children: [
                {
                  errorElement: <ErrorPage />,
                  children: [
                    { index: true, element: <Jobs />, loader: jobsLoader(queryClient) },
                    {
                      path: ":jobId",
                      element: <Job />,
                      loader: jobLoader(queryClient),
                      children: [
                        {
                          path: "apply",
                          element: <JobApplication />,
                          loader: jobApplicationLoader(queryClient),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ])}
    />
  );
};

export default RootRouter;
