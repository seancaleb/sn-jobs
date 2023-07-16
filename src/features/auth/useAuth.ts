import { User } from "@/api/auth/auth.type";
import { AuthActions } from "./authSlice";
import { useAppDispatch } from "@/app/hooks";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const loginUser = (user: User) => {
    dispatch(AuthActions.loginUser(user));
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
