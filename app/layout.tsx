import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AudioProvider } from "@/components/audio-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agustín Torres - Senior Fullstack Developer",
  description:
    "Portfolio of Agustín Torres, Senior Fullstack Developer with 7+ years of experience in web development and 4 years in AI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <AudioProvider>
          <Navigation />
          <main className="relative">{children}</main>
        </AudioProvider>
      </body>
    </html>
  )
}
