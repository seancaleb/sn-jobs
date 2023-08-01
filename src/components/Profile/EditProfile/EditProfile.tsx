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
import { GetUserProfileResponse } from "@/api/users/users.type";
import { useUpdateProfile } from "@/api/users/users";
import LoaderSpinner from "../../LoaderSpinner";
import apiClient from "@/services/apiClient";
import { EditProfileValues, editProfileSchema } from "./EditProfile.schema";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Pencil className="mr-2 h-4 w-4" /> Edit Profile
      </Button>

      <EditDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default EditProfile;

type EditDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const fetchDefaultValues = async () => {
  const data = await apiClient({
    options: {
      url: "/users/profile",
      method: "GET",
    },
  });

  const { firstName, lastName, email } = (data as GetUserProfileResponse).user;

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

  const onSubmit = (values: EditProfileValues) => {
    isDirty ? updateProfileMutation.mutate(values) : setIsOpen(false);
  };

  const handleEditOnClose = () => {
    if (!isValid || isDirty) {
      setIsOpenUnsavedChanges(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleUnsavedOnClose = async () => {
    reset();
    setIsOpenUnsavedChanges(false);

    await new Promise((res) => setTimeout(res, 500));
    setIsOpen(false);
  };

  useEffect(() => {
    if (updateProfileMutation.isSuccess) {
      const { user } = updateProfileMutation.data;
      const { firstName, lastName, email } = user;
      reset({ firstName, lastName, email }, { keepDirty: false });
      setIsOpen(false);
      setIsOpenUnsavedChanges(false);
    }
  }, [updateProfileMutation.isSuccess, setIsOpen, reset, updateProfileMutation.data]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleEditOnClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
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
                InputProps={{ onBlur: () => trigger("firstName") }}
                label="First name"
              />

              <FormInputField
                control={control}
                name="lastName"
                placeholder="Enter your last name"
                InputProps={{ onBlur: () => trigger("lastName") }}
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
                }}
              />

              <Button type="submit" disabled={updateProfileMutation.isLoading}>
                {updateProfileMutation.isLoading && <LoaderSpinner />}
                Save changes
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
