import { Separator } from "@/components/ui/separator";
import { useDocumentTitle } from "@mantine/hooks";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import DeleteProfile from "./DeleteProfile/DeleteProfile";

const Security = () => {
  useDocumentTitle("Account Security - SNJOBS");

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="text-xl sm:text-2xl font-semibold">Privacy & Security</div>
        <p className="text-sm">Secure your personal data and ensure privacy.</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <div className="space-y-1 max-w-md flex-1">
          <div className="font-medium">Change Password</div>
          <p className="text-sm">Enter a new password to update your account's security.</p>
        </div>

        <div className="flex flex-col xs:block">
          <UpdatePassword />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <div className="space-y-1 max-w-md flex-1">
          <div className="font-medium">Account Deletion</div>
          <p className="text-sm">
            Permanently remove your account and all associated data. This action cannot be undone,
            so please proceed with caution.
          </p>
        </div>

        <div className="flex flex-col xs:block">
          <DeleteProfile />
        </div>
      </div>
    </div>
  );
};

export default Security;
