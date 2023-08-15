/* eslint-disable react-refresh/only-export-components */
import { useDocumentTitle } from "@mantine/hooks";
import EditProfile from "@/components/Profile/EditProfile/EditProfile";
import { Separator } from "@/components/ui/separator";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { fetchUserProfile, useGetProfile, userKeys } from "@/api/users/users";
import { redirect, useLoaderData } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { GetUserProfileResponse } from "@/api/users/users.type";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  if (!auth.isAuthenticated) return redirect("/");

  const initialUserData = await queryClient.ensureQueryData({
    queryKey: userKeys.profile(auth.userId),
    queryFn: fetchUserProfile,
  });

  return {
    initialUserData,
  };
};

const Profile = () => {
  const loaderData = useLoaderData() as LoaderReturnType<typeof loader>;
  const initialData = (loaderData as { initialUserData: GetUserProfileResponse }).initialUserData;

  useGetProfile({ initialData });
  useDocumentTitle("Account Profile - SNJOBS");

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="text-xl sm:text-2xl font-semibold">My Profile</div>
        <p className="text-sm">Centralize your profile and settings.</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <div className="space-y-1 max-w-lg flex-1">
          <div className="font-medium">Personal Information</div>
          <p className="text-sm">
            Review and update your personal details to keep your account up-to-date and accurate.
          </p>
        </div>

        <div className="flex flex-col xs:block">
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
