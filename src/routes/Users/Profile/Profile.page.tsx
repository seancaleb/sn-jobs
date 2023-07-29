/* eslint-disable react-refresh/only-export-components */
import { useDocumentTitle } from "@mantine/hooks";
import EditProfile from "@/components/Profile/EditProfile/EditProfile";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  useDocumentTitle("Your Profile");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-lg tracking-tight font-bold">My Profile</div>
        <p className="text-[0.9375rem] text-light">Centralize your profile and settings.</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex justify-between items-center gap-6">
        <div className="space-y-1 max-w-lg flex-1">
          <div className="tracking-tight font-bold">Personal Information</div>
          <p className="text-[0.9375rem] text-light">
            Review and update your personal details to keep your account up-to-date and accurate.
          </p>
        </div>

        <EditProfile />
      </div>
    </div>
  );
};

export default Profile;
