import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { SessionProvider } from "next-auth/react"
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | ListaRegalos',
    default: "ListaRegalos"
  },
  description: 'Crea listas de regalos y compártelas con tus familiares y amigos',
  icons: [
    {
      url: "/favicon.ico"
    }
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
