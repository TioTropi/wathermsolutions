"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Droplet,
  Gauge,
  Filter,
  Beaker,
  Thermometer,
  Wrench,
  Settings,
  Recycle,
  PenTool as Tool,
  Activity,
  Zap,
  GraduationCap,
  ArrowRight,
  Package,
  FlaskConical,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"

const products = [
  {
    category: "Equipos de Control y Dosificación",
    icon: <Settings className="w-6 h-6" />,
    items: [
      {
        title: "Bombas Dosificadoras",
        description: "Peristálticas, de diafragma o lóbulos con control preciso de inyección química",
        icon: <Droplet className="w-5 h-5" />,
      },
      {
        title: "Controladores Automáticos",
        description: "Control de pH, ORP, conductividad y flujo con integración de sensores digitales",
        icon: <Gauge className="w-5 h-5" />,
      },
      {
        title: "Válvulas Inteligentes",
        description: "Automatización total de sistemas de purga y flujo de agua",
        icon: <Zap className="w-5 h-5" />,
      },
    ],
  },
  {
    category: "Equipos de Medición y Monitoreo",
    icon: <Activity className="w-6 h-6" />,
    items: [
      {
        title: "Sensores en Línea",
        description: "pH, ORP, cloro, turbidez con salida 4-20 mA o digital",
        icon: <Gauge className="w-5 h-5" />,
      },
      {
        title: "Equipos Portátiles",
        description: "Kits de análisis y reactivos calibrados para laboratorio",
        icon: <FlaskConical className="w-5 h-5" />,
      },
      {
        title: "Data Loggers Industriales",
        description: "Registro continuo de variables críticas del proceso",
        icon: <Activity className="w-5 h-5" />,
      },
    ],
  },
  {
    category: "Filtración y Desinfección",
    icon: <Filter className="w-6 h-6" />,
    items: [
      {
        title: "Trenes de Filtración",
        description: "Arena, zeolita, carbón activado y suavizadores completos",
        icon: <Filter className="w-5 h-5" />,
      },
      {
        title: "Sistemas de Membranas",
        description: "Osmosis inversa, ultrafiltración y nanofiltración para alta remoción",
        icon: <Droplet className="w-5 h-5" />,
      },
      {
        title: "Desinfección Avanzada",
        description: "UV, ozono y cloraminas para eliminación total de microorganismos",
        icon: <Zap className="w-5 h-5" />,
      },
    ],
  },
  {
    category: "Productos Químicos Especializados",
    icon: <Beaker className="w-6 h-6" />,
    items: [
      {
        title: "Inhibidores",
        description: "Corrosión e incrustación (WS-CS30, WS-CT60, WS-SG90)",
        icon: <Beaker className="w-5 h-5" />,
      },
      {
        title: "Biocidas y Neutralizadores",
        description: "WS-B36, WS-CT66, WS-CS63 PLUS para control microbiológico",
        icon: <FlaskConical className="w-5 h-5" />,
      },
      {
        title: "Aditivos de Eficiencia",
        description: "Secuestrantes de oxígeno y limpiadores químicos especializados",
        icon: <Droplet className="w-5 h-5" />,
      },
    ],
  },
  {
    category: "Equipos Térmicos e Intercambio",
    icon: <Thermometer className="w-6 h-6" />,
    items: [
      {
        title: "Torres y Chillers",
        description: "Torres de enfriamiento y chillers de alta eficiencia térmica",
        icon: <Thermometer className="w-5 h-5" />,
      },
      {
        title: "Calderas Industriales",
        description: "Equipos con monitoreo en tiempo real del rendimiento",
        icon: <Settings className="w-5 h-5" />,
      },
      {
        title: "Refacciones Técnicas",
        description: "Intercambiadores de calor, válvulas y bombas especializadas",
        icon: <Wrench className="w-5 h-5" />,
      },
    ],
  },
  {
    category: "Accesorios y Refacciones",
    icon: <Package className="w-6 h-6" />,
    items: [
      {
        title: "Elementos Filtrantes",
        description: "Cartuchos, membranas, empaques y mallas de reemplazo",
        icon: <Filter className="w-5 h-5" />,
      },
      {
        title: "Conexiones y Tubería",
        description: "Tubos, conexiones y adaptadores PVC/acero inoxidable",
        icon: <Wrench className="w-5 h-5" />,
      },
      {
        title: "Control Eléctrico",
        description: "Paneles eléctricos, controladores y PLCs industriales",
        icon: <Zap className="w-5 h-5" />,
      },
    ],
  },
]

const services = [
  {
    title: "Tratamiento de Aguas Industriales",
    description:
      "Programas completos de tratamiento químico y fisicoquímico con reducción de consumo de agua y energía",
    icon: <Droplet className="w-6 h-6" />,
    benefits: "Cumplimiento normativo y optimización de procesos",
  },
  {
    title: "Tratamiento de Aguas Residuales",
    description: "Diseño e implementación de plantas de tratamiento (PTAR) con procesos biológicos avanzados",
    icon: <Recycle className="w-6 h-6" />,
    benefits: "Reutilización del agua y protección ambiental",
  },
  {
    title: "Mantenimiento Preventivo y Correctivo",
    description: "Limpieza química y mecánica de intercambiadores, torres y filtros con diagnóstico de eficiencia",
    icon: <Tool className="w-6 h-6" />,
    benefits: "Máxima disponibilidad y vida útil extendida",
  },
  {
    title: "Calibración y Puesta en Marcha",
    description: "Calibración certificada de sensores e instalación de sistemas completos de tratamiento",
    icon: <Settings className="w-6 h-6" />,
    benefits: "Operación óptima desde el primer día",
  },
  {
    title: "Ingeniería y Proyectos Especiales",
    description: "Soluciones llave en mano con integración de sistemas automatizados y monitoreo remoto",
    icon: <Zap className="w-6 h-6" />,
    benefits: "Innovación y eficiencia personalizada",
  },
  {
    title: "Capacitación y Asesoría Técnica",
    description: "Entrenamientos especializados en tratamiento químico, monitoreo y control de procesos",
    icon: <GraduationCap className="w-6 h-6" />,
    benefits: "Personal capacitado y soporte continuo",
  },
]

export default function ProductsServicesSection() {
  const [activeTab, setActiveTab] = useState<"products" | "services">("products")
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const toggleCategory = (index: number) => {
    setExpandedCategory((prev) => (prev === index ? null : index))
  }

  const toggleFlip = (cardId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const categoryBackgrounds = [
    "/industrial-dosing-pumps-and-chemical-control-equip.jpg",
    "/industrial-sensors-and-monitoring-equipment.jpg",
    "/water-filtration-and-disinfection-systems.jpg",
    "/industrial-chemical-products-and-containers.jpg",
    "/industrial-cooling-towers-and-thermal-equipment.jpg",
    "/industrial-spare-parts-and-accessories.jpg",
  ]

  const serviceBackgrounds = [
    "/industrial-water-treatment-facility.jpg",
    "/wastewater-treatment-plant.jpg",
    "/industrial-maintenance-technician.jpg",
    "/calibration-and-commissioning-equipment.jpg",
    "/engineering-and-automation-systems.jpg",
    "/technical-training-and-advisory.jpg",
  ]

  return (
    <section className="py-32 px-6 bg-blue-50 dark:bg-slate-900/50" id="products-services" data-animate>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Portafolio Completo
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            Nuestras Soluciones
            <br />
            <span className="text-primary">Fluyen Como el Agua</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Tecnología, química e ingeniería para el tratamiento responsable del agua
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button
            onClick={() => setActiveTab("products")}
            variant={activeTab === "products" ? "default" : "outline"}
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold transition-all"
          >
            <Package className="w-5 h-5 mr-2" />
            Productos
          </Button>
          <Button
            onClick={() => setActiveTab("services")}
            variant={activeTab === "services" ? "default" : "outline"}
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold transition-all"
          >
            <Settings className="w-5 h-5 mr-2" />
            Servicios
          </Button>
        </div>

        {activeTab === "products" && (
          <div className="space-y-6">
            {products.map((category, idx) => (
              <Card key={idx} className="border-0 shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src={categoryBackgrounds[idx] || "/placeholder.svg"}
                    alt={category.category}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => toggleCategory(idx)}
                  className="relative w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary backdrop-blur-sm">
                      {category.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground text-left">{category.category}</h3>
                  </div>
                  {expandedCategory === idx ? (
                    <ChevronUp className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>

                {expandedCategory === idx && (
                  <div className="relative px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                      {category.items.map((item, itemIdx) => {
                        const cardId = `${idx}-${itemIdx}`
                        const isFlipped = flippedCards.has(cardId)

                        return (
                          <div
                            key={itemIdx}
                            className="flip-card h-64 cursor-pointer"
                            onClick={() => toggleFlip(cardId)}
                            onMouseEnter={() => toggleFlip(cardId)}
                            onMouseLeave={() => toggleFlip(cardId)}
                          >
                            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                              <div className="flip-card-front">
                                <Card className="h-full border-0 shadow-md bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center p-6">
                                  <h4 className="text-2xl font-bold text-foreground text-center leading-tight">
                                    {item.title}
                                  </h4>
                                </Card>
                              </div>

                              <div className="flip-card-back">
                                <Card className="h-full border-0 shadow-md bg-gradient-to-br from-primary/10 to-transparent p-6 flex flex-col justify-center">
                                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 text-primary mx-auto mb-3">
                                    {item.icon}
                                  </div>
                                  <h4 className="text-lg font-bold text-foreground text-center mb-3 leading-tight">
                                    {item.title}
                                  </h4>
                                  <p className="text-muted-foreground leading-relaxed text-sm text-center">
                                    {item.description}
                                  </p>
                                </Card>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const cardId = `service-${idx}`
              const isFlipped = flippedCards.has(cardId)

              return (
                <div
                  key={idx}
                  className="flip-card h-80 cursor-pointer"
                  onClick={() => toggleFlip(cardId)}
                  onMouseEnter={() => toggleFlip(cardId)}
                  onMouseLeave={() => toggleFlip(cardId)}
                >
                  <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                    <div className="flip-card-front">
                      <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center p-6 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <Image
                            src={serviceBackgrounds[idx] || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 backdrop-blur-sm">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-bold text-foreground text-center">{service.title}</h3>
                        </div>
                      </Card>
                    </div>

                    <div className="flip-card-back">
                      <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-primary/10 to-transparent p-6 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                          <Image
                            src={serviceBackgrounds[idx] || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mx-auto mb-3 backdrop-blur-sm">
                            {service.icon}
                          </div>
                          <h3 className="text-lg font-bold text-foreground text-center mb-3">{service.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm text-center mb-3">
                            {service.description}
                          </p>
                          <div className="pt-3 border-t border-border">
                            <p className="text-xs font-semibold text-primary text-center">{service.benefits}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-20 text-center">
          <Card className="p-12 border-0 shadow-xl bg-gradient-to-br from-primary/5 to-transparent">
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-balance">
              Cuidar el agua es proteger tu inversión.
              <br />
              <span className="text-primary">Optimiza tus procesos con Watherm Solutions.</span>
            </p>
            <Button size="lg" className="rounded-full px-8 h-12 text-base group" asChild>
              <a href="#contact">
                Solicita una Cotización Personalizada
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
