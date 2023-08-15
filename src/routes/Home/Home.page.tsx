import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { useDocumentTitle } from "@mantine/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";

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
              Find the right{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                Job
              </span>{" "}
              for you.
            </Balancer>
          </h1>
          <p className="text-lg text-center max-w-lg">
            <Balancer>
              Connecting talented professionals with remote opportunities in the Philippines and
              beyond.
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
