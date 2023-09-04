/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Applications } from "@/api/employer/employer.type";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, PieLabelRenderProps } from "recharts";

const COLORS = [
  { start: "#3b82f6", end: "#6366f1" },
  { start: "#22c55e", end: "#10b981" },
  { start: "#ef4444", end: "#f97316" },
];

type ApplicationStatusChartProps = {
  data: Applications["applicationStatusDistribution"];
};

const ApplicationStatusChart = ({ data }: ApplicationStatusChartProps) => {
  return (
    <ResponsiveContainer>
      <PieChart>
        <defs>
          {data.map((_entry, index) => (
            <linearGradient key={`myGradient${index}`} id={`myGradient${index}`}>
              <stop offset="0%" stopColor={COLORS[index % COLORS.length].start} />
              <stop offset="100%" stopColor={COLORS[index % COLORS.length].end} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          stroke="none"
          data={data}
          innerRadius={75}
          outerRadius={100}
          paddingAngle={7}
          dataKey="value"
          label={({ x, y, cx, name, index }: PieLabelRenderProps) => {
            return data[index as number].value === 0 ? null : (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > (cx as number) ? "start" : "end"}
                dominantBaseline="central"
                fontSize={14}
              >
                {name}
              </text>
            );
          }}
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
          ))}
        </Pie>
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
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ApplicationStatusChart;
