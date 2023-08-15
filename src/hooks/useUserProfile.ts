import { fetchUserProfile, userKeys } from "@/api/users/users";
import { GetUserProfileResponse } from "@/api/users/users.type";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useUserProfile = () => {
  const auth = useAppSelector(selectAuthStatus);
  const queryClient = useQueryClient();
  const [user, setUser] = useState<GetUserProfileResponse | undefined>();

  useEffect(() => {
    const observer = new QueryObserver(queryClient, {
      queryKey: userKeys.profile(auth.userId),
      queryFn: fetchUserProfile,
    });

    return observer.subscribe(({ data, isSuccess }) => {
      if (isSuccess) {
        setUser(data);
      }
    });
  }, [auth.userId, queryClient]);

  return user;
};

export default useUserProfile;
