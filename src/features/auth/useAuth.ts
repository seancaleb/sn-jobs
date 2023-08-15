import { User } from "@/types/user";
import { AuthActions } from "./authSlice";
import { useAppDispatch } from "@/app/hooks";
import useRecentSearches from "@/features/recent-searches/useRecentSearches";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { resetRecentSearches } = useRecentSearches();

  const loginUser = ({ exp, role, userId }: Pick<User, "role" | "exp" | "userId">) => {
    dispatch(AuthActions.loginUser({ tokenExpiration: exp, role, userId }));
  };

  const logoutUser = () => {
    resetRecentSearches();
    dispatch(AuthActions.logoutUser());
  };

  return {
    loginUser,
    logoutUser,
  };
};

export default useAuth;
