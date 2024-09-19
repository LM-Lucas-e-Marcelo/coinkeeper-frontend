import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/sidebar'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'CoinKeeper',
}

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-[200px_calc(100%-200px)] text-darkgray">
      <Sidebar />
      <div className="grid grid-rows-[7rem_calc(100vh-7rem)]">
        <Header />
        <section className="overflow-auto py-3 px-6">{children}</section>
      </div>
    </div>
  )
}
