import { Button } from "@/components/ui/button";
import Balancer from "react-wrap-balancer";

const Home = () => {
  return (
    <section role="region" className="section-padding">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl sm:text-5xl text-center tracking-[-1px] font-bold max-w-4xl">
          <Balancer>
            The Premier Virtual <span className="text-teal-600">Job Board</span> for Workers in the
            Philippines
          </Balancer>
        </h1>
        <p className="text-lg sm:text-xl text-center max-w-lg">
          <Balancer>
            Connecting talented professionals with remote opportunities in the Philippines and
            beyond.
          </Balancer>
        </p>
        <Button size="lg">Explore Job Listings</Button>
      </div>
    </section>
  );
};

export default Home;
