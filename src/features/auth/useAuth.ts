import { User } from "@/types/user";
import { AuthActions } from "./authSlice";
import { useAppDispatch } from "@/app/hooks";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const loginUser = ({ exp, role, userId }: Pick<User, "role" | "exp" | "userId">) => {
    dispatch(AuthActions.loginUser({ tokenExpiration: exp, role, userId }));
  };

  const logoutUser = () => {
    dispatch(AuthActions.logoutUser());
  };

  return {
    loginUser,
    logoutUser,
  };
};

export default useAuth;
