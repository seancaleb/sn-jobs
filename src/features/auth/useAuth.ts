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

  const refreshAuthToken = ({ role, exp }: Pick<User, "role" | "exp">) => {
    dispatch(AuthActions.refreshAuthToken({ role, tokenExpiration: exp }));
  };

  return {
    loginUser,
    logoutUser,
    refreshAuthToken,
  };
};

export default useAuth;
