import { Button } from "@/components/ui/button";
import Balancer from "react-wrap-balancer";

const Home = () => {
  return (
    <section role="region" className="py-32">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-6xl text-center tracking-[-1px] font-bold">
          <Balancer>
            The Premier Virtual <span className="text-teal-500">Job Board</span> for Workers in the
            Philippines
          </Balancer>
        </h1>
        <div className="text text-2xl text-center max-w-lg">
          <Balancer>
            Connecting talented professionals with remote opportunities in the Philippines and
            beyond.
          </Balancer>
        </div>
        <Button size="lg" className="text-base">
          Explore Job Listings
        </Button>
      </div>
    </section>
  );
};

export default Home;
