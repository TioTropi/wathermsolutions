# Instrucciones rápidas para agentes de código (AI)

Este proyecto es una aplicación Next.js (App Router) con TypeScript, Tailwind CSS y componentes Radix/Tailwind ubicados en `components/ui/`. Usa Next 15 y React 19.

Objetivo principal
- Sitio corporativo para "Watherm Solutions" (tratamiento de aguas). Single-page con secciones estáticas y una API serverless mínima en `app/api/contact/route.ts`.

Arquitectura y puntos clave
- App Router: `app/layout.tsx` define el root layout, envuelve con `next-themes` en `ThemeProvider` y coloca `Analytics` de Vercel.
- Rutas: páginas y componentes siguen el patrón `app/*`. La API está en `app/api/*` y usa handlers con `export async function POST(request: Request)`.
- UI: primitives y componentes compartidos están en `components/ui/` (Button, Input, Card, Toast, etc.). Mantén las API públicas de estos componentes.
- Datos estáticos: `data/problems.tsx` contiene el objeto usado por la UI para listar problemas/soluciones.
- Utilitarios: `lib/utils.ts` expone `cn(...)` (clsx + tailwind-merge) — úsalo para componer clases Tailwind.
- Hooks: `hooks/use-toast.ts` implementa un toaster en memoria (TOAST_LIMIT = 1). Además la app usa `sonner` en `app/page.tsx`.
- CSS: global en `app/globals.css` y `styles/globals.css` (Tailwind configurado).

Convenciones específicas del repositorio
- Client vs Server: Muchas páginas usan "use client" (ej. `app/page.tsx`). Si necesitas DOM APIs o hooks, marca el archivo como cliente.
- Aliases: TypeScript mapea `@/*` → `./*` (ver `tsconfig.json`), úsalos para imports desde la raíz.
- Componentización: los componentes UI son pequeños y composables. Evita alterar estilos globales desde componentes; usar utilitario `cn()` para combinar clases.
- Toaster: el proyecto tiene dos aproximaciones: `sonner` (usado en la página) y el custom `use-toast`. Revisa cuál se usa en la parte que editarás antes de introducir otra dependencia.
- API contact: `app/api/contact/route.ts` valida y responde JSON pero no llama a servicios externos (actúa como stub). Para integraciones (email/CRM) sigue el patrón allí: validar campos, console.log para dev, y devolver NextResponse.

Flujo de desarrollo y comandos útiles
- Instalar dependencias: el repo incluye `pnpm-lock.yaml` — se recomienda usar pnpm:

  pnpm install

- Ejecutar en desarrollo:

  pnpm dev

- Build / producción:

  pnpm build
  pnpm start

- Linter:

  pnpm lint

Notas de configuración de Next
- `next.config.mjs` desactiva fallos de ESLint y TypeScript en build (ignoreDuringBuilds / ignoreBuildErrors). Tenlo en cuenta al introducir cambios de tipado o lint: la build puede ignorar errores.
- `images.unoptimized = true`: la app evita optimizaciones de imágenes del loader de Next.

Qué buscar antes de editar
- Si vas a cambiar estilos: revisa `components/ui/*` y `app/globals.css` para seguir la jerarquía de clases Tailwind.
- Si introduces llamadas externas en `app/api/*`, añade variables de entorno en `.env.local` y no comites secretos.
- Si creas componentes con estado, decide si deben ser 'use client' y colócalos en `components/` o `components/ui/` según su naturaleza.

Ejemplos concretos
- Llamada a la API de contacto (cliente):

  await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) })

- Uso de utilitario de clases:

  import { cn } from '@/lib/utils'
  <div className={cn('p-4', condition && 'bg-primary')}>...</div>

Errores y limitaciones observadas
- No hay tests automatizados en el repo; no existe configuración de CI visible.
- `next.config.mjs` permite builds con errores, así que verifica localmente `pnpm dev` para reproducir fallos reales.
- API de contacto es un stub; no hay integraciones configuradas (email/CRM).

Reglas rápidas para el agente
- No cambiar la API pública de los componentes en `components/ui/*` sin actualizar usos.
- Preservar el uso de `next-themes` (ThemeProvider) y la clase de fuente variable en `app/layout.tsx` al tocar el layout.
- Mantener la compatibilidad con Tailwind (usa `cn()` al componer clases dinámicas).
- Cuando añadas nuevas dependencias, prefiere versiones ya presentes en el proyecto (ej. `sonner`, `next-themes`) y actualiza `package.json` y `pnpm-lock.yaml`.

Dónde mirar primero (rutas ejemplo)
- Root layout: `app/layout.tsx`
- Página principal: `app/page.tsx`
- API contacto: `app/api/contact/route.ts`
- Componentes UI: `components/ui/*`
- Util helpers: `lib/utils.ts`
- Hooks compartidos: `hooks/use-toast.ts`

Si algo no está claro, pregunta al mantenedor dónde desea integrar toasts/servicios externos y si prefiere `sonner` o el toaster custom.
