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
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import FormInputField from "@/components/FormInputField/FormInputField";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getProfileSchemaResponse } from "@/api/users/users.type";
import { useUpdateProfile, userKeys } from "@/api/users/users";
import LoaderSpinner from "@/components/LoaderSpinner";
import apiClient from "@/services/apiClient";
import { EditProfileValues, editProfileSchema } from "./EditProfile.schema";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import Prompt from "@/components/Prompt";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Pencil className="mr-2 h-4 w-4" /> Edit profile
      </Button>

      <EditDialog isOpen={isOpen} setIsOpen={handleSetIsOpen} />
    </>
  );
};

export default EditProfile;

type EditDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const fetchDefaultValues = async () => {
  const data = await apiClient({
    options: {
      url: "/users/profile",
      method: "GET",
    },
  });

  const { firstName, lastName, email } = getProfileSchemaResponse.parse(data);

  return { firstName, lastName, email };
};

const EditDialog = ({ isOpen, setIsOpen }: EditDialogProps) => {
  const form = useForm<EditProfileValues>({
    defaultValues: fetchDefaultValues,
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
  });
  const { control, handleSubmit, formState, trigger, reset } = form;
  const { isValid, isDirty } = formState;
  const updateProfileMutation = useUpdateProfile();
  const [isOpenUnsavedChanges, setIsOpenUnsavedChanges] = useState(false);
  const queryClient = useQueryClient();
  const auth = useAppSelector(selectAuthStatus);

  const onSubmit = (values: EditProfileValues) => {
    isDirty ? updateProfileMutation.mutate(values) : setIsOpen(false);
  };

  const handleEditOnClose = () => {
    if (!isValid || isDirty) {
      updateProfileMutation.isLoading ? null : setIsOpenUnsavedChanges(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleUnsavedOnClose = () => {
    setIsOpenUnsavedChanges(false);
    setIsOpen(false);
  };

  const handleSuccessMutation = async () => {
    if (updateProfileMutation.isSuccess) {
      const { firstName, lastName, email } = updateProfileMutation.data;

      reset({ firstName, lastName, email }, { keepDirty: false });
      setIsOpen(false);
      setIsOpenUnsavedChanges(false);

      await queryClient.invalidateQueries(userKeys.profile(auth.userId));
    }
  };

  const handleSetIsOpen = (open: boolean) => {
    setIsOpenUnsavedChanges(open);
  };

  useEffect(() => {
    if (updateProfileMutation.isSuccess) void handleSuccessMutation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfileMutation.isSuccess]);

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <>
      <Prompt hasUnsavedChanges={isDirty && isOpen} />
      <Dialog open={isOpen} onOpenChange={handleEditOnClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Personalize your profile by updating the information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="edit-profile-form"
              role="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col"
            >
              <FormInputField
                control={control}
                name="firstName"
                placeholder="Enter your first name"
                InputProps={{
                  onBlur: () => trigger("firstName"),
                  disabled: updateProfileMutation.isLoading,
                }}
                label="First name"
              />

              <FormInputField
                control={control}
                name="lastName"
                placeholder="Enter your last name"
                InputProps={{
                  onBlur: () => trigger("lastName"),
                  disabled: updateProfileMutation.isLoading,
                }}
                label="Last name"
              />

              <FormInputField
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                InputProps={{
                  onBlur: () => trigger("email"),
                  disabled: updateProfileMutation.isLoading,
                }}
              />

              <div className="self-end space-x-2">
                <Button type="button" variant="ghost" onClick={handleEditOnClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateProfileMutation.isLoading}>
                  {updateProfileMutation.isLoading && <LoaderSpinner />}
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {updateProfileMutation.isLoading ? null : (
        <UnsavedChangesDialog
          isOpen={isOpenUnsavedChanges}
          setIsOpen={handleSetIsOpen}
          onClose={handleUnsavedOnClose}
        />
      )}
    </>
  );
};
