import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

// Sample data structure
type Data = {
  channel: string;
  organic?: number;
  direct?: number;
  email?: number;
  referral?: number;
  social?: number;
  other?: number;
}[];

export const StackedBarConversion: React.FC<{ data: Data }> = ({ data }) => {
  const colors: Record<string, string> = {
    organic: "#1E40AF", 
    direct: "#60A5FA",
    email: "#A78BFA", 
    referral: "#F59E0B", 
    social: "#F472B6",
    other: "#FCD34D",
  };

  return (
    <div className="w-full h-[350px] bg-white rounded-2xl shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="30%"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="channel" tick={{ fontSize: 12, fill: "#374151" }} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />
          {Object.keys(colors).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[key]}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
