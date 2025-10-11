import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // ======== CONFIGURAR TRANSPORTADOR SMTP ==========
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Cambia si usas otro proveedor
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // definido en .env.local
        pass: process.env.EMAIL_PASS, // definido en .env.local
      },
    })

    // ======== OPCIONES DEL CORREO ==========
    const mailOptions = {
      from: `"Formulario Watherm Solutions" <${process.env.EMAIL_USER}>`,
      to: "ventas@wathermsolutions.com", // destinatario final
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Correo: ${email}
        Mensaje: ${message}
      `,
      html: `
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `,
    }

    // ======== ENVÍO DEL CORREO ==========

    await transporter.sendMail(mailOptions)

    console.log("📨 Correo enviado correctamente:", { name, email })

    return NextResponse.json({ success: true, message: "Mensaje enviado con éxito" }, { status: 200 })
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error)
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 })
  }
}
