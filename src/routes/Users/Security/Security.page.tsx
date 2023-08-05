import { Separator } from "@/components/ui/separator";
import { useDocumentTitle } from "@mantine/hooks";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import DeleteProfile from "./DeleteProfile/DeleteProfile";

const Security = () => {
  useDocumentTitle("Account Security");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-lg tracking-tight font-bold">Privacy & Security</div>
        <p className="text-[0.9375rem] text-light">Secure your personal data and ensure privacy.</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex justify-between items-center gap-6">
        <div className="space-y-1 max-w-md flex-1">
          <div className="tracking-tight font-bold">Change Password</div>
          <p className="text-[0.9375rem] text-light">
            Enter a new password to update your account's security.
          </p>
        </div>

        <UpdatePassword />
      </div>

      <Separator orientation="horizontal" />

      <div className="flex justify-between items-center gap-6">
        <div className="space-y-1 max-w-md flex-1">
          <div className="tracking-tight font-bold">Account Deletion</div>
          <p className="text-[0.9375rem] text-light">
            Permanently remove your account and all associated data. This action cannot be undone,
            so please proceed with caution.
          </p>
        </div>

        <DeleteProfile />
      </div>
    </div>
  );
};

export default Security;
