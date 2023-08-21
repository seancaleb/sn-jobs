/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useLoginUser, useRegisterUser } from "@/api/auth/auth";
import { SignUpValues, signUpSchema } from "./SignUp.schema";
import LoaderSpinner from "@/components/LoaderSpinner";
import { useCounter } from "@mantine/hooks";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import PasswordVisibilityToggle from "@/components/PasswordVisibilityToggle/PasswordVisibilityToggle";
import FormInputField from "@/components/FormInputField/FormInputField";
import FormSelectField from "@/components/FormSelectField/FormSelectField";
import { useNavigation } from "react-router-dom";

const SignIn = () => {
  const form = useForm<SignUpValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const { control, handleSubmit, formState, trigger, setFocus } = form;
  const { isDirty, isValid, dirtyFields, errors } = formState;
  const [count, handlers] = useCounter(0, { min: 0, max: 2 });
  const registerUserMutation = useRegisterUser();
  const loginUserMutation = useLoginUser();
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const isLoading =
    loginUserMutation.isLoading || registerUserMutation.isLoading || navigation.state === "loading";

  const onSubmit = async (values: SignUpValues) => {
    if (isValid) {
      const { email, password } = values;
      await registerUserMutation.mutateAsync(values);
      await loginUserMutation.mutateAsync({ email, password });
    }
  };

  useEffect(() => {
    if (count === 1) setFocus("firstName");
    else if (count === 2) setFocus("email");
  }, [count, setFocus]);

  return (
    <div className="p-8 border border-border rounded-md max-w-md w-full">
      <div className="mb-8 grid space-y-1.5">
        <div className="flex items-center justify-between">
          <Badge>Step {count + 1} / 3</Badge>
        </div>
      </div>

      <Form {...form}>
        <form
          id="register-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          {count === 0 && (
            <FormSelectField
              control={control}
              label="Role"
              name="role"
              placeholder="Select a role"
              description=" Select your role to indicate whether you are a jobseeker or an employer."
              options={[
                { value: "user", label: "Jobseeker" },
                { value: "employer", label: "Employer" },
              ]}
            />
          )}

          {count === 1 && (
            <>
              <FormInputField
                control={control}
                name="firstName"
                placeholder="Enter your first name"
                InputProps={{ onBlur: () => trigger("firstName") }}
                label="First name"
              />

              <FormInputField
                control={control}
                name="lastName"
                placeholder="Enter your last name"
                InputProps={{ onBlur: () => trigger("lastName") }}
                label="Last name"
              />
            </>
          )}

          {count === 2 && (
            <>
              <FormInputField
                control={control}
                name="email"
                placeholder="Enter your email"
                InputProps={{ onBlur: () => trigger("email"), disabled: isLoading }}
                label="Email"
              />

              <FormInputField
                control={control}
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                InputProps={{ onBlur: () => trigger("password"), disabled: isLoading }}
                label="Password"
              >
                <PasswordVisibilityToggle
                  isVisible={isVisible}
                  onToggle={() => setIsVisible(!isVisible)}
                />
              </FormInputField>
            </>
          )}

          <div className="flex justify-between">
            {count !== 0 ? (
              <Button type="button" onClick={handlers.decrement} variant="ghost">
                Back
              </Button>
            ) : (
              <div />
            )}

            {count === 0 && (
              <Button type="button" onClick={handlers.increment} disabled={!dirtyFields.role}>
                Continue
              </Button>
            )}

            {count === 1 && (
              <Button
                type="button"
                onClick={handlers.increment}
                disabled={
                  !!errors.firstName ||
                  !!errors.lastName ||
                  !dirtyFields.firstName ||
                  !dirtyFields.lastName
                }
              >
                Continue
              </Button>
            )}

            {count === 2 && (
              <Button type="submit" disabled={!isDirty || !isValid || isLoading}>
                {isLoading && <LoaderSpinner />}
                Sign Up
              </Button>
            )}
          </div>

          <p className="text-light text-sm">
            Have an account?{" "}
            <Link to="/sign-in" className="text-teal-600 underline">
              Sign in.
            </Link>
          </p>
        </form>
      </Form>

      <DevTool control={control} />
    </div>
  );
};

export default SignIn;
