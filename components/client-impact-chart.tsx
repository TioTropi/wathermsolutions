"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

interface ImpactData {
  month: string
  efficiency: number
}

const defaultData: ImpactData[] = [
  { month: "Ene", efficiency: 60 },
  { month: "Feb", efficiency: 65 },
  { month: "Mar", efficiency: 70 },
  { month: "Abr", efficiency: 75 },
  { month: "May", efficiency: 80 },
  { month: "Jun", efficiency: 85 }
]

export default function ImpactChart() {
  const [data, setData] = useState<ImpactData[]>([])

  useEffect(() => {
    // Simulamos fetch de datos
    setData(defaultData)
  }, [])

  if (!data || data.length === 0) return null

  return (
    <section className="py-32 px-6 bg-slate-50 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 tracking-tight">
        Impacto de Nuestras Soluciones
      </h2>
      <div className="max-w-4xl mx-auto h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="efficiency" stroke="#0284c7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
