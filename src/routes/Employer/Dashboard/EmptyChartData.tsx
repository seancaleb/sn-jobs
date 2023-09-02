import { Balancer } from "react-wrap-balancer";

type EmptyChartDataProps = {
  message: string;
};

const EmptyChartData = ({ message }: EmptyChartDataProps) => {
  return (
    <div className="space-y-1 text-center max-w-sm">
      <p className="text-primary font-medium">No available data yet</p>
      <p className="text-sm">
        <Balancer>{message}</Balancer>
      </p>
    </div>
  );
};

export default EmptyChartData;
