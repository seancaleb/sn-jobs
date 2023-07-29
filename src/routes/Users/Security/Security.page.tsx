import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, KeyRound } from "lucide-react";

const Security = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <div className="text-xl tracking-tight font-bold">Privacy & Security</div>
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
        <Button>
          <KeyRound className="mr-2 h-4 w-4" />
          Change password
        </Button>
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
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </div>
    </section>
  );
};

export default Security;
