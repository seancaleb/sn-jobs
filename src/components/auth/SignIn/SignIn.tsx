/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useLoginUser } from "@/api/auth/auth";
import { SignInValues, signInSchema } from "./SignIn.schema";
import LoaderSpinner from "@/components/LoaderSpinner";
import FormInputField from "@/components/FormInputField/FormInputField";
import PasswordVisibilityToggle from "@/components/PasswordVisibilityToggle/PasswordVisibilityToggle";
import { useState } from "react";
import { useNavigation } from "react-router-dom";

const SignIn = () => {
  const form = useForm<SignInValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const { control, handleSubmit, formState, trigger } = form;
  const { isDirty, isValid } = formState;
  const loginUserMutation = useLoginUser();
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const isLoading = loginUserMutation.isLoading || navigation.state === "loading";

  const onSubmit = (values: SignInValues) => {
    if (isValid) {
      loginUserMutation.mutate(values);
    }
  };

  return (
    <div className="p-8 border border-slate-200 rounded-md max-w-md w-full">
      <Form {...form}>
        <form
          id="login-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormInputField
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            InputProps={{
              onBlur: () => trigger("email"),
            }}
          />

          <FormInputField
            control={control}
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            label="Password"
          >
            <PasswordVisibilityToggle
              isVisible={isVisible}
              onToggle={() => setIsVisible(!isVisible)}
            />
          </FormInputField>

          <Button type="submit" disabled={!isDirty || !isValid || isLoading}>
            {isLoading && <LoaderSpinner />}
            Sign In
          </Button>

          <p className="text-light text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-teal-600 underline">
              Sign up here.
            </Link>
          </p>
        </form>
      </Form>

      <DevTool control={control} />
    </div>
  );
};

export default SignIn;
