/* eslint-disable react-refresh/only-export-components */
import { useDocumentTitle } from "@mantine/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import EditProfile from "@/components/Profile/EditProfile/EditProfile";
import { QueryClient } from "@tanstack/react-query";
import { fetchUserProfile, useGetProfile } from "@/api/users/users";
import { useLoaderData } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { GetUserProfileResponse } from "@/api/users/users.type";
import store from "@/app/store";
import { Separator } from "@/components/ui/separator";

export const loader = (queryClient: QueryClient) => async () => {
  const email = store.getState().auth.user?.email;

  const queryKey = ["users", email as string];

  console.log(queryKey);

  const initialData = await queryClient.ensureQueryData({
    queryKey,
    queryFn: fetchUserProfile,
  });

  return {
    initialData,
    queryKey,
  };
};

const Profile = () => {
  const { initialData, queryKey } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data } = useGetProfile(queryKey, { initialData });
  useDocumentTitle("Profile");

  const user = data?.user as GetUserProfileResponse["user"];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <div className="text-xl tracking-tight font-bold">My Profile</div>
        <p className="text-[0.9375rem] text-light">Centralize your profile and settings.</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col items-stretch justify-between sm:flex-row sm:items-center gap-8">
        <div className="flex gap-6 items-start">
          <Avatar className="h-20 w-20">
            <AvatarImage />
            <AvatarFallback className="bg-primary text-white text-3xl font-bold">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <div className="text-3xl tracking-tight font-bold">
              {user.firstName} {user.lastName}
            </div>

            <div className="flex gap-1.5 items-center">
              <Mail className="h-4 w-4" />
              <div>{user.email}</div>
            </div>
          </div>
        </div>

        <EditProfile />
      </div>
    </section>
  );
};

export default Profile;
