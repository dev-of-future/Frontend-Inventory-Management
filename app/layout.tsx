import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserContextProvider } from './context/user'
import { Header } from '@/app/components';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inventory Master 🏆',
  description: 'Inventory Management made easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="winter">
      <UserContextProvider>
        <body className={`${inter.className}`}>
          <Header />
          <div className='mt-5 md:container md:mx-auto'>
            {children}
          </div>
        </body>
      </UserContextProvider>
    </html>
  )
}
