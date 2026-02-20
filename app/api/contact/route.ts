import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const dynamic = "force-dynamic"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function getTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error("Faltan variables SMTP")
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload
    const { name = "Contacto web", email, subject, message } = body

    if (!email || !message) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 })
    }

    const transport = getTransport()
    const toAddress = process.env.CONTACT_TO || "agustinpiraywa@gmail.com"
    const subjectLine = subject ? `Contacto: ${subject}` : "Nuevo mensaje desde el portfolio"
    const senderName = name.trim() || "Contacto web"

    await transport.sendMail({
      from: `"${senderName}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: toAddress,
      subject: subjectLine,
      text: `Nombre: ${senderName}\nEmail: ${email}\n\n${message}`,
    })

    await transport.sendMail({
      from: `"Agustín Torres" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Recibí tu mensaje",
      text: `Hola ${senderName}, gracias por tu mensaje. Te responderé a la brevedad.`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 })
  }
}
