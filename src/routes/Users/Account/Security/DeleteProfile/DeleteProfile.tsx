/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { DeleteProfileValues, deleteProfileSchema } from "./DeleteProfile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/FormInputField/FormInputField";
import { Form } from "@/components/ui/form";
import { useDeleteProfile } from "@/api/users/users";
import LoaderSpinner from "@/components/LoaderSpinner";

const DeleteProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete account
      </Button>

      <ConfirmDeletionDialog isOpen={isOpen} setIsOpen={handleSetIsOpen} />
    </>
  );
};

export default DeleteProfile;

type ConfirmDeletionDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ConfirmDeletionDialog = ({ isOpen, setIsOpen }: ConfirmDeletionDialogProps) => {
  const form = useForm<DeleteProfileValues>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteProfileSchema),
  });
  const { control, handleSubmit, clearErrors, formState, reset } = form;
  const { isValid } = formState;
  const deleteProfileMutation = useDeleteProfile();

  const onSubmit = (values: DeleteProfileValues) => {
    isValid ? deleteProfileMutation.mutate(values) : null;
  };

  const handleDeleteOnClose = () => {
    deleteProfileMutation.isLoading ? null : setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      clearErrors();
      reset();
    }
  }, [isOpen, clearErrors, reset]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDeleteOnClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="delete-profile-form"
              role="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col"
            >
              <FormInputField
                control={control}
                name="password"
                type="password"
                placeholder="Enter your password"
                InputProps={{
                  disabled: deleteProfileMutation.isLoading,
                }}
              />

              <div className="self-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={handleDeleteOnClose}
                  type="button"
                  disabled={deleteProfileMutation.isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  type="submit"
                  disabled={deleteProfileMutation.isLoading}
                >
                  {deleteProfileMutation.isLoading && <LoaderSpinner />}
                  Confirm deletion
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
