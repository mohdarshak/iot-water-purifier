import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from "@/lib/authContext"

export const metadata: Metadata = {
  title: 'Purity Grid',
  description: 'Created by IoTerators',
  generator: 'Purity.Grid',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
