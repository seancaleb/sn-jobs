/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useLoginUser } from "@/api/auth/auth";
import { SignInValues, signInSchema } from "./SignIn.schema";
import LoaderSpinner from "@/components/LoaderSpinner";

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
  const { mutate, isLoading } = useLoginUser();

  const onSubmit = (values: SignInValues) => {
    if (isValid) {
      mutate(values);
    }
  };

  return (
    <div className="p-8 border border-slate-200 rounded-md max-w-md w-full">
      <div className="mb-8 grid space-y-1.5">
        <div className="text-2xl font-bold">Sign In</div>
        <p>Sign in to access exclusive job features.</p>
      </div>

      <Form {...form}>
        <form
          id="login-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    onBlur={() => trigger("email")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
