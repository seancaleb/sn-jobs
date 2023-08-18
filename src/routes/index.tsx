import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { Login, loginLoader, Register, registerLoader } from "@/routes/auth";
import { Home, homeLoader } from "@/routes/Home";
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
import {
  CreateJob,
  EditJob,
  JobApplicationDetails,
  JobDetails,
  JobListings,
  editJobLoader,
  jobApplicationDetailsLoader,
  jobDetailsLoader,
  jobPostingsLoader,
} from "@/routes/Employer";
import AccountSettingsRoute from "@/routes/AccountSettingsRoute";
import PersonalizedJobsRoute from "@/routes/PersonalizedJobsRoute";
import AuthRoute from "@/routes/AuthRoute";
import ApplicationRoot from "@/routes/ApplicationRoot";
import { DashboardRoute } from "@/routes/Dashboard";
import ErrorRoute from "@/components/Error";
import NotFound from "@/components/NotFound";
import RootRoute from "@/routes/RootRoute";
import PrivateRoute, { loader as privateRouteLoader } from "@/routes/PrivateRoute";
import ProtectedRoute, { loader as protectedRouteLoader } from "@/routes/ProtectedRoute";

const queryClient = new QueryClient();

const ApplicationRouter = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<ApplicationRoot />}>
            <Route errorElement={<ErrorRoute />}>
              <Route path="*" element={<NotFound />} />

              <Route element={<AuthRoute />}>
                <Route path="sign-in" element={<Login />} loader={loginLoader} />
                <Route path="sign-up" element={<Register />} loader={registerLoader} />
              </Route>

              <Route path="/" element={<RootRoute />}>
                <Route index={true} element={<Home />} loader={homeLoader} />
                <Route element={<PrivateRoute />} loader={privateRouteLoader}>
                  <Route element={<ProtectedRoute />} loader={protectedRouteLoader("user")}>
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
                      <Route element={<PersonalizedJobsRoute />}>
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
                </Route>
              </Route>

              <Route element={<PrivateRoute />} loader={privateRouteLoader}>
                <Route element={<ProtectedRoute />} loader={protectedRouteLoader("employer")}>
                  <Route path="employer" element={<DashboardRoute />}>
                    <Route
                      path="account/profile"
                      element={<Profile />}
                      loader={profileLoader(queryClient)}
                    />
                    <Route path="account/privacy-and-security" element={<Security />} />
                    <Route
                      path="job-listings"
                      element={<JobListings />}
                      loader={jobPostingsLoader(queryClient)}
                    />
                    <Route
                      path="job-listings/:jobId"
                      element={<JobDetails />}
                      loader={jobDetailsLoader(queryClient)}
                    />
                    <Route
                      path="job-listings/:jobId/edit"
                      element={<EditJob />}
                      loader={editJobLoader(queryClient)}
                    />
                    <Route path="job-listings/create" element={<CreateJob />} />
                    <Route
                      path="job-listings/:jobId/applications/:applicationId"
                      element={<JobApplicationDetails />}
                      loader={jobApplicationDetailsLoader(queryClient)}
                    />
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
