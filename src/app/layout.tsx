// src/app/layout.tsx
import './global.css'              // <― esto carga Tailwind
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Kaos Project',
  description: 'Transformamos el caos en diseño',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  )
}
