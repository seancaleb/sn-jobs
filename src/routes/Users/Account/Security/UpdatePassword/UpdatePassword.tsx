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
import { useEffect, useState } from "react";
import { UpdatePasswordValues, updatePasswordSchema } from "./UpdatePassword.schema";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { useUpdatePassword } from "@/api/users/users";
import LoaderSpinner from "@/components/LoaderSpinner";
import PasswordVisibilityToggle from "@/components/PasswordVisibilityToggle/PasswordVisibilityToggle";
import Prompt from "@/components/Prompt";

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
  const [isVisible, setIsVisible] = useState(false);

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
      updatePasswordMutation.isLoading ? null : setIsOpenUnsavedChanges(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleUnsavedOnClose = () => {
    setIsOpenUnsavedChanges(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (mismatchPasswords) setError("confirmPassword", mismatchPasswords);
  }, [setError, mismatchPasswords]);

  useEffect(() => {
    if (updatePasswordMutation.isSuccess) {
      void handleUnsavedOnClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePasswordMutation.isSuccess, reset]);

  useEffect(() => {
    if (isOpen) {
      clearErrors();
      reset();
    }
  }, [isOpen, clearErrors, reset]);

  return (
    <>
      <Prompt hasUnsavedChanges={isDirty && isOpen} />
      <Dialog open={isOpen} onOpenChange={handleEditOnClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Enter your new password and confirm to save your changes.
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
                type={isVisible ? "text" : "password"}
                label="Old password"
                placeholder="Enter your old password"
                InputProps={{
                  disabled: updatePasswordMutation.isLoading,
                }}
              >
                <PasswordVisibilityToggle
                  isVisible={isVisible}
                  onToggle={() => setIsVisible(!isVisible)}
                />
              </FormInputField>

              <FormInputField
                control={control}
                name="newPassword"
                type="password"
                label="New password"
                placeholder="Enter your new password"
                InputProps={{
                  disabled: updatePasswordMutation.isLoading,
                }}
              />

              <FormInputField
                control={control}
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Confirm your new password"
                InputProps={{
                  disabled: updatePasswordMutation.isLoading,
                }}
              />

              <div className="self-end space-x-2">
                <Button type="button" variant="ghost" onClick={handleEditOnClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updatePasswordMutation.isLoading}>
                  {updatePasswordMutation.isLoading && <LoaderSpinner />}
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {updatePasswordMutation.isLoading ? null : (
        <UnsavedChangesDialog
          isOpen={isOpenUnsavedChanges}
          setIsOpen={setIsOpenUnsavedChanges}
          onClose={handleUnsavedOnClose}
        />
      )}
    </>
  );
};
