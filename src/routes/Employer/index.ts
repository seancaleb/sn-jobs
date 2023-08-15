import JobListings, { loader as jobPostingsLoader } from "./JobListings/JobListings.page";
import JobDetails, { loader as jobDetailsLoader } from "./JobListings/JobDetails/JobDetails.page";
import CreateJobPage from "./JobListings/JobDetails/MutateJob/CreateJob.page";
import CreateJob from "./JobListings/JobDetails/MutateJob/MutateJob";
import EditJobPage, {
  loader as editJobLoader,
} from "./JobListings/JobDetails/MutateJob/EditJob.page";
import JobApplicationDetails, {
  loader as jobApplicationDetailsLoader,
} from "./JobListings/JobDetails/JobApplicationDetails/JobApplicationDetails.page";

export {
  JobListings,
  jobPostingsLoader,
  JobDetails,
  jobDetailsLoader,
  CreateJobPage,
  CreateJob,
  EditJobPage,
  editJobLoader,
  JobApplicationDetails,
  jobApplicationDetailsLoader,
};
