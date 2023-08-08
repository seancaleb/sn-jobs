import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "@/routes/auth/Login";
import { Register } from "@/routes/auth/Register";
import { Home } from "@/routes/Home";
import {
  Jobs,
  Job,
  JobApplication,
  jobsLoader,
  jobLoader,
  jobApplicationLoader,
} from "@/routes/Jobs";
import {
  AppliedJobs,
  BookmarkedJobs,
  Profile,
  Security,
  appliedJobsLoader,
  bookmarkedJobsLoader,
  profileLoader,
} from "@/routes/Users";
import RootLayout from "@/components/RootLayout";
import ErrorRoute from "@/components/Error";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import TabbedJobsRoute from "@/components/TabbedJobsRoute";
import { QueryClient } from "@tanstack/react-query";
import UserAccountRoute from "@/components/UserAccountRoute";

const queryClient = new QueryClient();

const ApplicationRouter = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout />} errorElement={<ErrorRoute />}>
            <Route index={true} element={<Home />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route errorElement={<ErrorRoute />}>
                <Route path="jobs">
                  <Route index={true} element={<Jobs />} loader={jobsLoader(queryClient)} />
                  <Route path=":jobId" element={<Job />} loader={jobLoader(queryClient)}>
                    <Route
                      path="apply"
                      element={<JobApplication />}
                      loader={jobApplicationLoader(queryClient)}
                    />
                  </Route>
                </Route>
                <Route path=":role">
                  <Route element={<TabbedJobsRoute />}>
                    <Route
                      path="bookmarked-jobs"
                      element={<BookmarkedJobs />}
                      loader={bookmarkedJobsLoader(queryClient)}
                    />
                    <Route
                      path="applied-jobs"
                      element={<AppliedJobs />}
                      loader={appliedJobsLoader(queryClient)}
                    />
                  </Route>
                  <Route path="account" element={<UserAccountRoute />}>
                    <Route
                      path="profile"
                      element={<Profile />}
                      loader={profileLoader(queryClient)}
                    />
                    <Route path="privacy-and-security" element={<Security />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        )
      )}
    />
  );
};

export default ApplicationRouter;
