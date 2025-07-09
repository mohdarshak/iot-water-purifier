import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
