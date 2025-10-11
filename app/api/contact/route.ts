import { NextResponse } from "next/server"
import * as z from "zod"

const ContactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo inv\u00e1lido"),
  message: z.string().min(1, "El mensaje es requerido"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = ContactSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.format()
      return NextResponse.json({ error: "Invalid payload", details: errors }, { status: 400 })
    }

    const { name, email, message } = result.data

    // Integration point:
    // - Send email via provider (SendGrid, Resend, etc.)
    // - Persist to DB
    // - Post to CRM
    // Use environment variables for secrets and do NOT commit them.

    console.log("[contact] submission:", { name, email, message })

    // Keep response minimal for client UX
    return NextResponse.json({ success: true, message: "Mensaje enviado con éxito" }, { status: 200 })
  } catch (error) {
    console.error("[contact] Error:", error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
