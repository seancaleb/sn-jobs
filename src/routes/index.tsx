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
import {
  CreateJobPage,
  EditJobPage,
  JobApplicationDetails,
  JobDetails,
  JobListings,
  editJobLoader,
  jobApplicationDetailsLoader,
  jobDetailsLoader,
  jobPostingsLoader,
} from "@/routes/Employer";
import RootLayout from "@/components/RootLayout";
import ErrorRoute from "@/components/Error";
import PrivateRoute from "@/routes/PrivateRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AccountSettingsRoute from "@/routes/AccountSettingsRoute";
import NotFound from "@/components/NotFound";

import Dashboard from "@/routes/Dashboard/Dashboard";
import PersonalizedJobsRoute from "./PersonalizedJobsRoute";

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
                  {/* Employers  */}
                  <Route element={<ProtectedRoute role="employer" />}>
                    <Route path="employer" element={<Dashboard />}>
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
                        element={<EditJobPage />}
                        loader={editJobLoader(queryClient)}
                      />
                      <Route path="job-listings/create" element={<CreateJobPage />} />
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
          </>
        )
      )}
    />
  );
};

export default ApplicationRouter;
