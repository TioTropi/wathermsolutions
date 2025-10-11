import { Droplet, Shield, Filter, Gauge } from "lucide-react"

export const problems = {
  corrosion: {
    icon: <Shield className="w-5 h-5" />,
    title: "Corrosión",
    problem:
      "La corrosión en tuberías y equipos genera fugas, paros no programados y costosas reparaciones que afectan la continuidad operativa.",
    solution:
      "Aplicamos inhibidores de corrosión de última generación que forman una capa protectora en las superficies metálicas, extendiendo significativamente la vida útil de sus activos.",
  },
  incrustacion: {
    icon: <Filter className="w-5 h-5" />,
    title: "Incrustación",
    problem:
      "Los depósitos minerales reducen la eficiencia térmica, aumentan el consumo energético y pueden causar fallas en intercambiadores de calor y calderas.",
    solution:
      "Nuestros programas anti-incrustantes previenen la formación de depósitos minerales, manteniendo la eficiencia térmica óptima y reduciendo costos operativos.",
  },
  contaminacion: {
    icon: <Droplet className="w-5 h-5" />,
    title: "Contaminación Microbiológica",
    problem:
      "Bacterias, algas y hongos forman biopelículas que reducen la transferencia de calor, causan corrosión microbiológica y representan riesgos para la salud.",
    solution:
      "Implementamos programas de control microbiológico con biocidas de amplio espectro que eliminan microorganismos y previenen su proliferación.",
  },
  calidad: {
    icon: <Gauge className="w-5 h-5" />,
    title: "Calidad del Agua",
    problem:
      "El agua de mala calidad afecta procesos productivos, genera productos defectuosos y puede incumplir normativas ambientales.",
    solution:
      "Diseñamos tratamientos integrales que garantizan la calidad del agua según los estándares de su industria, optimizando procesos y asegurando el cumplimiento normativo.",
  },
}
