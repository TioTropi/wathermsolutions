"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface Problem {
  title: string
  description: string
}

const defaultProblems: Problem[] = [
  { title: "Contaminación química", description: "Procesos industriales generan químicos que afectan equipos y productividad." },
  { title: "Ineficiencia en tratamiento", description: "Sin monitoreo adecuado, los procesos de tratamiento son costosos y poco efectivos." },
  { title: "Impacto ambiental", description: "Descargas sin control afectan el medio ambiente y la reputación de su empresa." }
]

export default function ClientProblems() {
  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    // Simulamos fetch o carga de datos
    setProblems(defaultProblems)
  }, [])

  if (!problems || problems.length === 0) return null

  return (
    <section className="py-32 px-6 bg-background text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 tracking-tight">
        Principales Problemas que Ayudamos a Resolver
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {problems.map((problem, idx) => (
          <Card key={idx} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
            <p className="text-slate-600 leading-relaxed">{problem.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
