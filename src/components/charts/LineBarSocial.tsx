import React from "react";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, Line } from "recharts";

export const LineBarSocial: React.FC<{ data: any }> = ({ data }) => {
  // accept a shape like { date: [...], likes: [...], shares: [...], impressions: [...] } or { date: [{date, likes, shares, impressions}]}
  let series: any[] = [];

  if (Array.isArray(data)) {
    series = data;
  } else if (data && data.date && Array.isArray(data.date)) {
    // build series from arrays
    const dates = data.date;
    series = dates.map((d: any, i: number) => ({
      date: d,
      likes: data.likes?.[i] ?? 0,
      shares: data.shares?.[i] ?? 0,
      impressions: data.impressions?.[i] ?? 0
    }));
  }

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <ComposedChart data={series}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="impressions" barSize={20} />
          <Line type="monotone" dataKey="likes" stroke="#ff7300" />
          <Line type="monotone" dataKey="shares" stroke="#387908" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
