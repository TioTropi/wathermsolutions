// app/page.tsx
import Image from "next/image"
import { ArrowRight, Droplet, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import ProductsServicesSection from "@/components/products-services-section"

// Client-only wrapper para charts y problemas
import dynamic from "next/dynamic"
const ClientOnlyWrapper = dynamic(() => import("./components/ClientOnlyWrapper"), { ssr: false })

export default function WathermSolutionsPage() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <header id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image src="/solo-logo.png" alt="Watherm Solutions Logo" width={600} height={600} className="object-contain" priority />
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
      </header>

      {/* Secciones de contenido */}
      <section className="py-32 px-6 bg-background text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight text-balance leading-tight">
          El Agua es Vital,
          <br />
          su Tratamiento es Clave
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          Los procesos industriales generan contaminantes que dañan equipos, afectan la producción y perjudican el medio ambiente. 
          El tratamiento químico es la defensa más eficaz para proteger su operación y su inversión.
        </p>
      </section>

      {/* Client-only sections */}
      <ClientOnlyWrapper />

      {/* Products & Services */}
      <ProductsServicesSection />

      {/* CTA */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
            Watherm Solutions es su Mejor Opción
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed text-pretty max-w-3xl mx-auto">
            Contáctenos hoy para una consulta personalizada y descubra cómo podemos optimizar sus procesos, reducir sus costos y proteger su inversión.
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

      {/* Contact */}
      <section className="py-32 px-6 bg-background" id="contact">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">Contáctenos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Estamos listos para ayudarle a optimizar sus procesos de tratamiento de aguas
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                  <a href="mailto:ventas@wathermsolutions.com" className="text-primary hover:underline transition-colors">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-medium text-slate-300">Watherm Solutions</span>
          </div>
          <p className="text-sm">© 2025 Watherm Solutions. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
