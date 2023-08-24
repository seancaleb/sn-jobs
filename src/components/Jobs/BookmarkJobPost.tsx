import { useBookmarkJobPost } from "@/api/jobs/jobs";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { displaySuccessNotification } from "@/lib/utils";
import useNotification from "@/features/notification/useNotification";
import { useToast } from "../ui/use-toast";

type BookmarkJobPostProps = {
  job: JobDetails;
  isBookmarked?: string;
};

const bookmarkMsg = "Job Bookmarked: The job has been successfully bookmarked.";
const unbookmarkMsg = "Job Unbookmarked: The job post has been removed from your bookmarks.";

const BookmarkJobPost = ({ job, isBookmarked }: BookmarkJobPostProps) => {
  const bookmarkJobMutation = useBookmarkJobPost();
  const [debouncedBookmark, setDebouncedBookmark] = useState<NodeJS.Timeout | undefined>(undefined);
  const { toast } = useToast();
  const { initNotificationId } = useNotification();

  const handleBookmarkJobPost = () => {
    clearTimeout(debouncedBookmark);
    const timeout = setTimeout(() => {
      bookmarkJobMutation.mutate(job);
      displaySuccessNotification(
        isBookmarked ? unbookmarkMsg : bookmarkMsg,
        toast,
        initNotificationId
      );
    }, 300);
    setDebouncedBookmark(timeout);
  };

  return (
    <Button variant="outline" onClick={handleBookmarkJobPost}>
      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-teal-600 text-teal-600 mr-2" : ""}`} />
      {isBookmarked ? "Saved" : null}
    </Button>
  );
};

export default BookmarkJobPost;
