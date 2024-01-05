import Navbar from '@/components/navbar/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Skaarf's D&D Home",
  description: "Skaarf's Repository for D&D Resources",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div 
          style={{ "marginTop": "48px"}}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
