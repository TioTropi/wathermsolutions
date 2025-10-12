"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-slate-200">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-sm text-slate-700">{`${payload[0].value} años`}</p>
      </div>
    )
  }
  return null
}

export default function ImpactChart() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-8 border-0 shadow-lg">
        <div className="mb-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Sin Tratamiento</div>
          <div className="text-4xl font-bold text-red-600 mb-1">3-5 años</div>
          <div className="text-sm text-muted-foreground">Vida útil promedio del equipo</div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={[{ name: "Sin Tratamiento", years: 4 }]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} label={{ value: "Años", angle: -90, position: "insideLeft" }} tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(239, 68, 68, 0.1)" }} />
            <Bar dataKey="years" radius={[8, 8, 0, 0]} maxBarSize={120}>
              <Cell fill="#ef4444" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-8 border-0 shadow-lg ring-2 ring-emerald-500/20 bg-gradient-to-br from-emerald-50/50 to-transparent">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-muted-foreground">Con Tratamiento Watherm</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
              4x más vida útil
            </div>
          </div>
          <div className="text-4xl font-bold text-emerald-600 mb-1">15-20 años</div>
          <div className="text-sm text-muted-foreground">Vida útil extendida del equipo</div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={[{ name: "Con Watherm Solutions", years: 17.5 }]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} label={{ value: "Años", angle: -90, position: "insideLeft" }} tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(34, 197, 94, 0.1)" }} />
            <Bar dataKey="years" radius={[8, 8, 0, 0]} maxBarSize={120}>
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
