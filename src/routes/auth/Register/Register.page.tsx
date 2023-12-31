/* eslint-disable react-refresh/only-export-components */
import store from "@/app/store";
import AuthHeader from "@/components/Header/AuthHeader";
import SignUp from "@/components/auth/SignUp/SignUp";
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

const Register = () => {
  useDocumentTitle("Sign Up");

  return (
    <div className="py-12 sm:py-16 flex flex-col space-y-6 items-center justify-center">
      <AuthHeader
        title="Create an account"
        description="Sign up to explore exclusive job opportunities."
      />

      <SignUp />
    </div>
  );
};

export default Register;
