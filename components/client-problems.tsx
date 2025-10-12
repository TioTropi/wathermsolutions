"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { problems } from "@/data/problems"

export default function ClientProblems() {
  const [activeTab, setActiveTab] = useState("corrosion")

  return (
    <section className="py-32 px-6 bg-muted/30" id="solutions" data-animate>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Soluciones
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Problemas Comunes y Nuestras Soluciones
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist">
          {Object.entries(problems).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              role="tab"
              aria-selected={activeTab === key}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
              }`}
            >
              {data.icon}
              {data.title}
            </button>
          ))}
        </div>

        <Card className="p-8 md:p-12 border-0 shadow-xl" data-animate>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 text-red-600 mb-6">
                {problems[activeTab as keyof typeof problems].icon}
              </div>
              <h3 className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">Problema</h3>
              <p className="text-lg text-foreground leading-relaxed">
                {problems[activeTab as keyof typeof problems].problem}
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-3 uppercase tracking-wider">Solución</h3>
              <p className="text-lg text-foreground leading-relaxed">
                {problems[activeTab as keyof typeof problems].solution}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
