"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ImpactChartProps {
  data: { name: string; years: number }[];
  color: string;
  cursorColor: string;
}

export default function ImpactChart({ data, color, cursorColor }: ImpactChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
        <YAxis
          domain={[0, 20]}
          ticks={[0, 5, 10, 15, 20]}
          label={{ value: "Años", angle: -90, position: "insideLeft" }}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <Tooltip
          content={({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-sm text-slate-700">{`${payload[0].value} años`}</p>
                </div>
              );
            }
            return null;
          }}
          cursor={{ fill: cursorColor }}
        />
        <Bar dataKey="years" radius={[8, 8, 0, 0]} maxBarSize={120}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
