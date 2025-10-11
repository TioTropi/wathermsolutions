"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Droplet, Filter, Gauge, CheckCircle, Leaf, Award, Users, ArrowRight, Mail, Phone } from "lucide-react"
import { problems } from "@/data/problems"
import { Toaster, toast } from "sonner"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const schema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo inválido").min(1, "El correo es requerido"),
  message: z.string().min(1, "El mensaje es requerido"),
})

type FormData = z.infer<typeof schema>

export default function WathermSolutions() {
  const [activeTab, setActiveTab] = useState("corrosion")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast.success("¡Mensaje enviado con éxito!")
        reset()
      } else {
        toast.error("Error al enviar el mensaje")
      }
    } catch (error) {
      toast.error("Error al enviar el mensaje")
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-right" />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold tracking-tight">Watherm Solutions</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={scrollToContact}
                variant="ghost"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contacto
              </Button>
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {theme === "dark" ? "Claro" : "Oscuro"}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image
            src="/solo-logo.png"
            alt="Watherm Solutions Logo"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]" />
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium">Innovación en Tratamiento de Aguas</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-balance leading-[1.1]">
            Nuestras Soluciones
            <br />
            <span className="text-slate-300">Fluyen Como el Agua</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed text-pretty">
            Protegemos su inversión industrial con tecnología de punta en tratamiento químico de aguas
          </p>
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
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </div>
      </header>

      <section className="py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Por qué es importante
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight text-balance leading-tight">
            El Agua es Vital,
            <br />
            su Tratamiento es Clave
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            Los procesos industriales generan contaminantes que dañan equipos, afectan la producción y perjudican el
            medio ambiente. El tratamiento químico es la defensa más eficaz para proteger su operación y su inversión.
          </p>
        </div>
      </section>

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

      <section className="py-32 px-6 bg-background" id="impact" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Resultados Comprobados
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Impacto en la Vida Útil del Equipo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Compare la diferencia: nuestro tratamiento extiende la vida útil de su equipo hasta 4 veces más
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <div className="mb-6">
                <div className="text-sm font-medium text-muted-foreground mb-2">Sin Tratamiento</div>
                <div className="text-4xl font-bold text-red-600 mb-1">3-5 años</div>
                <div className="text-sm text-muted-foreground">Vida útil promedio del equipo</div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={[{ name: "Sin Tratamiento", years: 4 }]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    domain={[0, 20]}
                    ticks={[0, 5, 10, 15, 20]}
                    label={{ value: "Años", angle: -90, position: "insideLeft" }}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(239, 68, 68, 0.1)" }} />
                  <Bar dataKey="years" radius={[8, 8, 0, 0]} maxBarSize={120}>
                    <Cell fill="#ef4444" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                  ⚠️ Corrosión, incrustación y fallas frecuentes reducen drásticamente la vida útil
                </p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg ring-2 ring-emerald-500/20 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-muted-foreground">Con Tratamiento Watherm</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
                    <ArrowRight className="w-3 h-3" />
                    4x más vida útil
                  </div>
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-1">15-20 años</div>
                <div className="text-sm text-muted-foreground">Vida útil extendida del equipo</div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={[{ name: "Con Watherm Solutions", years: 17.5 }]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    domain={[0, 20]}
                    ticks={[0, 5, 10, 15, 20]}
                    label={{ value: "Años", angle: -90, position: "insideLeft" }}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(34, 197, 94, 0.1)" }} />
                  <Bar dataKey="years" radius={[8, 8, 0, 0]} maxBarSize={120}>
                    <Cell fill="#22c55e" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  ✓ Protección continua que maximiza su inversión y reduce costos operativos
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
            Precisión y Expertise a su Servicio
          </h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-pretty max-w-3xl mx-auto">
            En Watherm Solutions, no ofrecemos soluciones genéricas. Diseñamos programas de tratamiento a la medida,
            utilizando tecnología de punta y un equipo de expertos dedicados a su éxito.
          </p>
        </div>
      </section>

      <section className="py-32 px-6 bg-background" id="process" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Nuestro Proceso
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">3 Etapas Clave</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Análisis y Diagnóstico",
                description:
                  "Diagnóstico completo del sistema para identificar desafíos específicos y definir la estrategia más eficaz.",
                icon: <Gauge className="w-6 h-6" />,
              },
              {
                number: "02",
                title: "Diseño Personalizado",
                description: "Programa químico a medida, seleccionando productos y dosis óptimas.",
                icon: <Filter className="w-6 h-6" />,
              },
              {
                number: "03",
                title: "Monitoreo y Optimización",
                description:
                  "Supervisión continua del programa, ajustándolo para garantizar resultados sostenibles y eficientes.",
                icon: <CheckCircle className="w-6 h-6" />,
              },
            ].map((step, index) => (
              <div key={index} className="relative" data-animate>
                <div className="absolute -top-6 -left-6 text-8xl font-bold text-muted/20 select-none">
                  {step.number}
                </div>
                <Card className="relative p-8 border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-muted/30" id="values" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Nuestros Valores
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Lo que nos Define</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Compromiso con la Calidad",
                description: "Productos de la más alta calidad bajo estándares rigurosos.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Enfoque en Sostenibilidad",
                description: "Soluciones que promueven el uso eficiente del agua y reducen el impacto ambiental.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Éxito del Cliente",
                description: "Nos consideramos socios estratégicos enfocados en alcanzar resultados concretos.",
              },
            ].map((value, index) => (
              <div key={index} data-animate>
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all h-full group hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{value.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
            Watherm Solutions es su Mejor Opción
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed text-pretty max-w-3xl mx-auto">
            Contáctenos hoy para una consulta personalizada y descubra cómo podemos optimizar sus procesos, reducir sus
            costos y proteger su inversión.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-white text-slate-900 hover:bg-slate-100 text-base px-8 h-12 rounded-full group"
          >
            Solicitar Consulta
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <section className="py-32 px-6 bg-background" id="contact" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Hablemos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">Contáctenos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos listos para ayudarle a optimizar sus procesos de tratamiento de aguas
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">Información de Contacto</h3>
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <a
                      href="mailto:ventas@wathermsolutions.com"
                      className="text-primary hover:underline transition-colors"
                    >
                      ventas@wathermsolutions.com
                    </a>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Teléfono</p>
                    <a href="tel:+524427171776" className="text-primary hover:underline transition-colors">
                      (+52) 442 717 1776
                    </a>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-8 border-0 shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-labelledby="contact-form-title">
                <h3 id="contact-form-title" className="sr-only">
                  Formulario de Contacto
                </h3>
                <div>
                  <Input
                    placeholder="Nombre completo"
                    {...register("name")}
                    className="h-12 bg-background border-border"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-2" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("email")}
                    className="h-12 bg-background border-border"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-2" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Cuéntenos sobre su proyecto..."
                    {...register("message")}
                    className="min-h-32 bg-background border-border resize-none"
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-2" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full h-12 rounded-full text-base group">
                  Enviar Mensaje
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-300">Watherm Solutions</span>
            </div>
            <p className="text-sm">© 2025 Watherm Solutions. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
