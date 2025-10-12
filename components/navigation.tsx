"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, Wrench, TrendingUp, GitBranch, Heart, Package, Mail, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

const navItems = [
  { label: "Inicio", href: "#hero", icon: Home },
  { label: "Soluciones", href: "#solutions", icon: Wrench },
  { label: "Impacto", href: "#impact", icon: TrendingUp },
  { label: "Proceso", href: "#process", icon: GitBranch },
  { label: "Valores", href: "#values", icon: Heart },
  { label: "Productos", href: "#products-services", icon: Package },
  { label: "Contacto", href: "#contact", icon: Mail },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href)
      const scrollPosition = window.scrollY + 100

      setIsScrolled(window.scrollY > 50)

      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const offsetTop = (element as HTMLElement).offsetTop
          const offsetHeight = (element as HTMLElement).offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3">
        {/* Navigation Items - appear when menu is open */}
        <div
          className={`flex flex-col gap-2 transition-all duration-500 ease-out ${
            isOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-8 pointer-events-none"
          }`}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.href
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`group flex items-center gap-3 transition-all duration-300 ${
                  isOpen ? `delay-${index * 50}` : ""
                }`}
                style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
              >
                {/* Label tooltip */}
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    bg-background/90 backdrop-blur-xl border border-border/50 shadow-lg
                    transition-all duration-300 ${
                      isActive
                        ? "text-primary border-primary/50"
                        : "text-foreground/70 group-hover:text-primary group-hover:border-primary/30"
                    }`}
                >
                  {item.label}
                </span>

                {/* Icon bubble */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center
                    bg-background/90 backdrop-blur-xl border shadow-lg
                    transition-all duration-300 ${
                      isActive
                        ? "border-primary/50 bg-primary/10 scale-110"
                        : "border-border/50 group-hover:border-primary/30 group-hover:scale-105"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-foreground/70 group-hover:text-primary"
                    }`}
                  />
                </div>
              </button>
            )
          })}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group flex items-center gap-3 transition-all duration-300"
            style={{ transitionDelay: isOpen ? `${navItems.length * 50}ms` : "0ms" }}
          >
            <span
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                bg-background/90 backdrop-blur-xl border border-border/50 shadow-lg
                text-foreground/70 group-hover:text-primary group-hover:border-primary/30
                transition-all duration-300"
            >
              {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
            </span>

            <div
              className="w-12 h-12 rounded-full flex items-center justify-center
                bg-background/90 backdrop-blur-xl border border-border/50 shadow-lg
                group-hover:border-primary/30 group-hover:scale-105
                transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Main Menu Toggle Button - always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center
            bg-primary/90 backdrop-blur-xl border border-primary/50 shadow-xl
            hover:scale-110 hover:shadow-2xl hover:bg-primary
            transition-all duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-primary-foreground" />
          )}
        </button>
      </div>

      {/* Logo in top left - minimal and elegant */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-background/90 backdrop-blur-xl border border-border/50 shadow-lg
            hover:border-primary/30 hover:scale-105
            transition-all duration-300 group"
        >
          <Image
            src="/watherm-logo.svg"
            alt="Watherm Solutions Logo"
            width={32}
            height={32}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span
            className={`text-sm font-semibold tracking-tight text-foreground/90 group-hover:text-primary 
              transition-all duration-300 overflow-hidden ${
                isScrolled ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
              }`}
          >
            Watherm
          </span>
        </button>
      </div>
    </>
  )
}
