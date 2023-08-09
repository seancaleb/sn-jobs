import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
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
import PrivateRoute from "@/routes/PrivateRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import TabbedJobsRoute from "@/routes/TabbedJobsRoute";
import AccountSettingsRoute from "@/routes/AccountSettingsRoute";
import NotFound from "@/components/NotFound";

const queryClient = new QueryClient();

const ApplicationRouter = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<RootLayout />}>
              <Route errorElement={<ErrorRoute />}>
                <Route index={true} element={<Home />} />
                <Route path="sign-in" element={<Login />} />
                <Route path="sign-up" element={<Register />} />
                <Route element={<PrivateRoute />}>
                  {/* Users  */}
                  <Route element={<ProtectedRoute role="user" />}>
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
                    <Route path="jobseekers">
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
                      <Route path="account" element={<AccountSettingsRoute />}>
                        <Route
                          path="profile"
                          element={<Profile />}
                          loader={profileLoader(queryClient)}
                        />
                        <Route path="privacy-and-security" element={<Security />} />
                      </Route>
                    </Route>
                  </Route>
                  {/* Employers  */}
                  <Route element={<ProtectedRoute role="employer" />}>
                    <Route path="employer">
                      <Route path="profile" element={<div>My Profile</div>} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </>
        )
      )}
    />
  );
};

export default ApplicationRouter;
