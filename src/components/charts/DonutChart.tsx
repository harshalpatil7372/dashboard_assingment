import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#fbbf24", // Markets & Economy
  "#f97316", // China, Explained
  "#3b82f6", // ETF
  "#10b981", // Sustainable Investing
  "#6366f1", // Systematic Investing
  "#0ea5e9", // Research
];

type DonutChartProps = {
  data: { topic?: string; value?: number; label?: string }[];
  centerLabel?: string; // optional for total value
};

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  centerLabel,
}) => {
  const formatted = (data || []).map((d: any) => ({
    name: d.topic ?? d.label ?? "item",
    value: d.value ?? 0,
  }));

  const total = formatted.reduce((sum, d) => sum + d.value, 0);

  // Custom tooltip showing percentage
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percent = ((value / total) * 100).toFixed(1);
      return (
        <div className="bg-white shadow-md rounded px-2 py-1 text-xs text-gray-700">
          <strong>{name}</strong>: {value} ({percent}%)
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={2}
            stroke="white"
          >
            {formatted.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: "12px" }}
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-semibold text-gray-800">
          {centerLabel ?? total}
        </span>
      </div>
    </div>
  );
};
