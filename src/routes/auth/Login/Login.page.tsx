/* eslint-disable react-refresh/only-export-components */
import store from "@/app/store";
import AuthHeader from "@/components/Header/AuthHeader";
import SignIn from "@/components/auth/SignIn/SignIn";
import { useDocumentTitle } from "@mantine/hooks";
import { redirect } from "react-router-dom";

export const loader = () => {
  const auth = store.getState().auth;

  return auth.isAuthenticated
    ? auth.role === "user"
      ? redirect("/jobs")
      : redirect("/employer/dashboard")
    : null;
};

const Login = () => {
  useDocumentTitle("Sign In");

  return (
    <div className="py-12 sm:py-16 flex flex-col space-y-6 items-center justify-center">
      <AuthHeader
        title="Sign in to your account"
        description="Sign in to access exclusive job features."
      />

      <SignIn />
    </div>
  );
};

export default Login;
