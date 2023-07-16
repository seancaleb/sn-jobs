import AuthHeader from "@/components/Header/AuthHeader";
import SignIn from "@/components/auth/SignIn/SignIn";

const Login = () => {
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
