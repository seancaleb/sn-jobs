/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { FieldErrors, useForm } from "react-hook-form";
import FormInputField from "@/components/FormInputField/FormInputField";
import { Form } from "@/components/ui/form";
import { useCallback, useEffect, useState } from "react";
import { UpdatePasswordValues, updatePasswordSchema } from "./UpdatePassword.schema";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { useUpdatePassword } from "@/api/users/users";
import LoaderSpinner from "@/components/LoaderSpinner";

const UpdatePassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <KeyRound className="mr-2 h-4 w-4" />
        Change password
      </Button>

      <UpdatePasswordDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UpdatePassword;

type UpdatePasswordProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdatePasswordDialog = ({ isOpen, setIsOpen }: UpdatePasswordProps) => {
  const form = useForm<UpdatePasswordValues>({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });
  const { control, handleSubmit, formState, clearErrors, trigger, setError, reset } = form;
  const { isDirty, errors } = formState;
  const [isOpenUnsavedChanges, setIsOpenUnsavedChanges] = useState(false);
  const updatePasswordMutation = useUpdatePassword();

  const mismatchPasswords = (
    errors as FieldErrors<UpdatePasswordValues & { mismatchPasswords: string }>
  ).mismatchPasswords;

  const onSubmit = ({ password, newPassword }: UpdatePasswordValues) => {
    updatePasswordMutation.mutate({ password, newPassword });
  };

  const onError = async (errors: FieldErrors<UpdatePasswordValues>) => {
    clearErrors();

    if (mismatchPasswords) await trigger("confirmPassword");

    for (const key of Object.keys(errors) as Array<keyof UpdatePasswordValues>) {
      await trigger(key);
      return;
    }
  };

  const handleEditOnClose = () => {
    if (isDirty) {
      setIsOpenUnsavedChanges(true);
    } else {
      clearErrors();
      setIsOpen(false);
    }
  };

  const handleUnsavedOnClose = useCallback(() => {
    setIsOpenUnsavedChanges(false);
    setIsOpen(false);
    reset();
  }, [setIsOpen, reset]);

  useEffect(() => {
    if (mismatchPasswords) setError("confirmPassword", mismatchPasswords);
  }, [setError, mismatchPasswords]);

  useEffect(() => {
    if (updatePasswordMutation.isSuccess) {
      reset();
      handleUnsavedOnClose();
    }
  }, [updatePasswordMutation.isSuccess, handleUnsavedOnClose, reset]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleEditOnClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password and confirm it to complete the change. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="update-password-form"
              role="form"
              noValidate
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-8 flex flex-col"
            >
              <FormInputField
                control={control}
                name="password"
                type="password"
                label="Old password"
                placeholder="Enter your old password"
              />

              <FormInputField
                control={control}
                name="newPassword"
                type="password"
                label="New password"
                placeholder="Enter your new password"
              />

              <FormInputField
                control={control}
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Confirm your new password"
              />

              <Button type="submit" disabled={updatePasswordMutation.isLoading}>
                {updatePasswordMutation.isLoading && <LoaderSpinner />}
                Update Password
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <UnsavedChangesDialog
        isOpen={isOpenUnsavedChanges}
        setIsOpen={setIsOpenUnsavedChanges}
        onClose={handleUnsavedOnClose}
      />
    </>
  );
};
