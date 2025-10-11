# Watherm Solutions — Desarrollo

Pequeñas notas para desarrolladores y agentes que editen este repositorio.

Stack principal
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives en `components/ui/`

Comandos locales

```powershell
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm lint
```

Puntos importantes
- Root layout en `app/layout.tsx` usa `next-themes` y `@vercel/analytics/react`. No eliminar sin revisar el impacto.
- La UI es client-heavy: muchos componentes y `app/page.tsx` usan `"use client"`.
- Endpoint de contacto: `app/api/contact/route.ts`. Actualmente valida con `zod` y hace `console.log`. Para envíos reales integra un proveedor y usa `.env.local`.
- Usa `@/*` para imports de la raíz (configurado en `tsconfig.json`).

Recomendaciones
- Normalizar toasts: decide entre `sonner` (ya usado) o el toaster custom en `hooks/use-toast.ts`.
- Añadir tests básicos para el endpoint `/api/contact` y un test de integración del formulario.

Contacto
- Si necesitas acceso a claves o integraciones, pide las variables de entorno al mantenedor.
