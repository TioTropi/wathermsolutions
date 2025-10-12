'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroButtons() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        size="lg"
        onClick={scrollToContact}
        className="bg-white text-slate-900 hover:bg-slate-100 text-base px-8 h-12 rounded-full group"
      >
        Solicitar Consulta
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-12 rounded-full backdrop-blur-sm bg-transparent"
      >
        Conocer Más
      </Button>
    </div>
  )
}

export function CTAButton() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Button
      size="lg"
      onClick={scrollToContact}
      className="bg-white text-slate-900 hover:bg-slate-100 text-base px-8 h-12 rounded-full group"
    >
      Solicitar Consulta
      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  )
}