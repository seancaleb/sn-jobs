import { Applications } from "@/api/employer/employer.type";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type ApplicationTrendsChartProps = {
  data: Applications["applicationTrends"];
};

const ApplicationTrendsChart = ({ data }: ApplicationTrendsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} maxBarSize={40}>
        <YAxis
          dataKey="applications"
          padding={{ top: 10, bottom: 10 }}
          tick={{ fontSize: 12 }}
          domain={[0, (dataMax: number) => dataMax * 2]}
        />
        <XAxis
          dataKey="date"
          padding={{ left: 10, right: 10 }}
          tick={{ fontSize: 12 }}
          interval={2}
        />
        <Tooltip
          wrapperClassName="rounded-sm p-4 text-sm text-white"
          contentStyle={{
            background: "hsl(var(--background))",
            border: "1px solid",
            borderColor: "hsl(var(--border))",
          }}
          itemStyle={{
            color: "hsl(var(--foreground))",
          }}
          cursor={{ fill: "rgba(13, 148, 136, .15)" }}
          formatter={(value) => [value, "Applications"]}
        />
        <Bar dataKey="applications" fill="#0d9488" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ApplicationTrendsChart;
