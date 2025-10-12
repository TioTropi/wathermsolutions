import { Toaster } from "sonner"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import ProductsServicesSection from "@/components/products-services-section"

// Componentes client-only
const ClientProblems = dynamic(() => import("@/components/client-problems"), { ssr: false })
const ImpactChart = dynamic(() => import("@/components/client-impact-chart"), { ssr: false })

export default function WathermSolutionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Notificaciones */}
      <Toaster richColors position="top-right" />

      {/* Navegación */}
      <Navigation />

      {/* Hero / Header */}
      <header className="relative bg-primary/5 py-32 px-6 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Watherm Solutions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Extendemos la vida útil de tus equipos y reducimos problemas comunes de corrosión, desgaste y eficiencia.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition"
            >
              Contáctanos
            </a>
          </div>
          <div className="flex-1">
            <img
              src="/hero-image.png"
              alt="Watherm Solutions"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </header>

      {/* Problemas y soluciones (Client Only) */}
      <ClientProblems />

      {/* Impacto de Watherm (Client Only) */}
      <section className="py-32 px-6 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Impacto de Nuestras Soluciones
          </h2>
          <ImpactChart />
        </div>
      </section>

      {/* Productos y Servicios */}
      <ProductsServicesSection />

      {/* Footer */}
      <footer className="bg-background/80 border-t border-border py-12 mt-32">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Watherm Solutions. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-4 text-muted-foreground">
            <a href="mailto:contacto@wathermsolutions.com">Email</a>
            <a href="tel:+5215555555555">Teléfono</a>
            <a href="/aviso-privacidad">Aviso de Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
