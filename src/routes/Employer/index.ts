import JobListings, { loader as jobPostingsLoader } from "./JobListings/JobListings.page";
import JobDetails, { loader as jobDetailsLoader } from "./JobListings/JobDetails/JobDetails.page";
import CreateJob from "./JobListings/JobDetails/MutateJob/CreateJob.page";
import MutateJob from "./JobListings/JobDetails/MutateJob/MutateJob";
import EditJob, { loader as editJobLoader } from "./JobListings/JobDetails/MutateJob/EditJob.page";
import JobApplicationDetails, {
  loader as jobApplicationDetailsLoader,
} from "./JobListings/JobDetails/JobApplicationDetails/JobApplicationDetails.page";
import Dashboard, { loader as dashboardLoader } from "./Dashboard/Dashboard.page";

export {
  JobListings,
  jobPostingsLoader,
  JobDetails,
  jobDetailsLoader,
  CreateJob,
  MutateJob,
  EditJob,
  editJobLoader,
  JobApplicationDetails,
  jobApplicationDetailsLoader,
  Dashboard as EmployerDashboard,
  dashboardLoader,
};
