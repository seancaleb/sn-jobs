import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";

const Home = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  if (isAuthenticated) {
    return <Navigate to="/jobs" />;
  }

  return (
    <>
      <section aria-label="Home Section" role="region" className="section-padding">
        <div className="flex flex-col items-center space-y-6 mb-16">
          <h1 className="text-5xl lg:text-6xl text-center tracking-[-1px] font-bold max-w-4xl">
            <Balancer>
              Find the right <span className="text-teal-600">Job</span> for you.
            </Balancer>
          </h1>
          <p className="text-lg text-center max-w-lg">
            <Balancer>
              Connecting talented professionals with remote opportunities in the Philippines and
              beyond.
            </Balancer>
          </p>
          <Button size="lg">Explore Job Listings</Button>
        </div>
      </section>
    </>
  );
};

export default Home;
