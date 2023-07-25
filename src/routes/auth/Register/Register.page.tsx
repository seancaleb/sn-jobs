import AuthHeader from "@/components/Header/AuthHeader";
import SignUp from "@/components/auth/SignUp/SignUp";
import { useDocumentTitle } from "@mantine/hooks";

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
