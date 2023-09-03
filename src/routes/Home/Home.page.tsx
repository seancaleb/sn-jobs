/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from "@/app/hooks";
import store from "@/app/store";
import { Button } from "@/components/ui/button";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { useDocumentTitle } from "@mantine/hooks";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";

export const loader = () => {
  const auth = store.getState().auth;

  if (auth.isAuthenticated) {
    return auth.role === "user" ? redirect("/jobs") : redirect("/employer/dashboard");
  }

  return null;
};

const Home = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);
  const navigate = useNavigate();

  useDocumentTitle("SNJOBS - Virtual Job Board in the Philippines");

  const handleNavigate = () => {
    navigate("/sign-in");
  };

  if (isAuthenticated) {
    return <Navigate to="/jobs" />;
  }

  return (
    <>
      <section aria-label="Home Section" role="region" className="section-padding">
        <div className="flex flex-col items-center space-y-6 mb-16">
          <h1 className="text-5xl lg:text-6xl text-center tracking-[-1px] font-bold max-w-4xl">
            <Balancer>
              Explore{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                career
              </span>{" "}
              opportunities.
            </Balancer>
          </h1>
          <p className="text-lg text-center max-w-lg">
            <Balancer>
              Connecting talented professionals with remote opportunities in the Philippines.
            </Balancer>
          </p>
          <Button onClick={handleNavigate} size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
