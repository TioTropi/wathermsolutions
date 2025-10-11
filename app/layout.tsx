import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Watherm Solutions - Tratamiento de Aguas Industriales",
  description:
    "Innovación y Confianza en Tratamiento de Aguas para la Industria. Soluciones personalizadas para proteger su operación y su inversión.",
  keywords: "tratamiento de aguas, aguas industriales, corrosión, calidad del agua, sostenibilidad",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Watherm Solutions - Tratamiento de Aguas Industriales",
    description:
      "Soluciones personalizadas para el tratamiento de aguas industriales, optimizando procesos y reduciendo costos.",
    url: "https://www.wathermsolutions.com",
    siteName: "Watherm Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Watherm Solutions - Tratamiento de Aguas",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watherm Solutions - Tratamiento de Aguas Industriales",
    description:
      "Soluciones personalizadas para el tratamiento de aguas industriales, optimizando procesos y reduciendo costos.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-primary focus:text-primary-foreground focus:p-2"
            >
              Saltar al contenido principal
            </a>
            <main id="main-content">{children}</main>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
